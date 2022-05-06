let insp = require("util").inspect;
let ins = (x) => insp(x, {depth:null});
let fs = require("fs");

require("./monkey-patch.js");

const {specialForms, topEnv, cache, checkNegativeIndex} = require("./registry.js");
const {Value, Word, Apply, Property} = require("./ast.js");

require("./egg-require.js");

let parser = require('@ull-esit-pl-.../parse.js');
let parse = parser.parse;


function evaluate(expr, env) {
  expr.evaluate(env);
}

specialForms['if'] = function(args, env) {
  if (args.length != 3) {
    throw new SyntaxError('Bad number of args to if');
  }

  if (args[0].evaluate(env) !== false) {
    return args[1].evaluate(env);
  } else {
    return args[2].evaluate(env);
  }
};

specialForms['while'] = function(args, env) {
  /* fill in the rest of the code here */
};

specialForms['do'] = function(args, env) {
  let value;

  args.forEach(function(arg) {
    value = arg.evaluate(env);
  });

  return value;
};

specialForms[':='] = specialForms['def'] = specialForms['define'] = function(args, env) {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError('Bad use of define');
  }

  let value = args[1].evaluate(env);
  env[args[0].name] = value;
  return value;
};

specialForms['->'] =specialForms['fun'] = function(args, env) {
  if (!args.length) {
    throw new SyntaxError('Functions need a body.')
  }

  function name(expr) {
    if (expr.type != 'word') {
      throw new SyntaxError('Arg names must be words');
    }

    return expr.name;
  }

  let paramNames = args.slice(0, args.length - 1).map(name);
  let body = args[args.length - 1];

  let jsFun = function(...args) {
    // debugger;
    if (args.length > paramNames.length) {
      throw new TypeError(`Wrong number of arguments. Called with ${args.length} arguments and declared ${paramNames.length} parameters`);
    }

    let localEnv = Object.create(env);
    for (let i = 0; i < args.length; i++) {
      localEnv[paramNames[i]] = args[i];
    }

    return body.evaluate(localEnv);
  };
  jsFun.numParams = paramNames.length; // set other JS attributes as toString, etc.
  return jsFun;
};

specialForms['='] = specialForms['set'] = function(args, env) {
 /* fill in the rest of the code here */ 
}

specialForms["object"] = (args, env) => {
  /* fill in the rest of the code here */
};

specialForms['eval'] = function(args, env) {
  /* fill in the rest of the code here */
};

topEnv["debug"] = false;
//debugger;
topEnv['null'] = null;
topEnv['true'] = true;
topEnv['false'] = false;
topEnv['undefined'] = undefined;

topEnv['RegExp'] = require('xregexp');
topEnv['fetch'] = require('node-fetch');
topEnv['fs'] = require('fs');
topEnv['Math'] = Math;
topEnv['Object'] = Object;
topEnv['path'] = require('path');
topEnv["process"] = process;
topEnv['parse'] = parse;

// For the scope analysis
topEnv.parent = function() { return Object.getPrototypeOf(this)};
topEnv.hasBinding = Object.hasOwnProperty;
// Warning!! with the current implementation Egg objects don't inherit from Object 
// and don't benefit monkey patching. See registry.js
topEnv["hasOwnProperty"] = Object.prototype.hasOwnProperty;

// monkey patching sub. 2022 deprecated
topEnv["sub"] = Object.prototype.sub; 

// arithmetics
[
  '+', 
  '-', 
  '*', 
  '/', 
  '**',
].forEach(op => {
  /* fill in the rest of the code here */
});

// comparison and logical
[
  '==', 
  '<', 
  '>',
  '&&',
  '||'
].forEach(op => {
  topEnv[op] = new Function('a, b', `return a ${op} b;`);
});

topEnv['print'] = function(...value) {
  let processed = value.map(v => {
    if (typeof v === "string") return v;
    else if (typeof v == "function") {
      let firstLines = v.toString().match(/.*/);
      return firstLines[0];
    }
    else if (topEnv["debug"]) return ins(v); // 
    else return JSON.stringify(v, null, 0); 
    
  })
  console.log(...processed);
  return value.length === 1? value[0] : value;
};

topEnv["arr"] = topEnv["array"] = function(...args) {
  //debugger;
  return args;
};

topEnv["length"] = function(array) {
  return array.length;
};

topEnv["map"] = function(...args) {
  /* fill in the rest of the code here */
};

topEnv["<-"] = topEnv["element"] = function(array, ...index) {
  /* fill in the rest of the code here */
};

function run(program) {
  let env = Object.create(topEnv);
  let tree = parse(program);
  return tree.evaluate(env);
}

function runFromFile(fileName) {
  /* fill in the rest of the code here */
}

const { j2a, json2AST } = require('./j2a');

function runFromEVM(fileName) {
  try {
    let json = fs.readFileSync(fileName, 'utf8');
    let treeFlat = JSON.parse(json);
    let tree = json2AST(treeFlat);
    let env = Object.create(topEnv);
    return tree.evaluate(env);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {json2AST, run, runFromFile,runFromEVM, topEnv, specialForms, parser, evaluate};
