const inspect = require("util").inspect;
const ins = (x) => inspect(x, { depth: null });

const { json2AST, specialForms, checkNegativeIndex } = require("./registry.js");

class Value {
  constructor(token) {
    this.type = token.type;
    this.value = token.value;
  }
  evaluate() {
    return this.value;
  }

  leftEvaluate(env) {
     /* fill in the rest of the code here */
  }

  getIndex() {
    return this.value;
  }
}

class Word {
  constructor(token) {
    this.type = token.type || "word";
    this.name = token.name;
  }

  evaluate(env) {
    if (this.name in env) {
      return env[this.name];
    } else {
      throw new ReferenceError(`Undefined variable: ${this.name}`);
    }
  }

  getIndex() {
    return this.name;
  }

  leftEvaluate(env) {
    /* fill in the rest of the code here */
  }

}

class Apply {
  constructor(tree) {
    this.type = tree.type;
    this.operator = tree.operator;
    this.args = tree.args;
  }

  evaluate(env) {
    /* fill in the rest of the code here */
  }

  
  
  leftEvaluate(env) {
    /* fill in the rest of the code here */
  }
}

class Property {
  constructor(tree) {
    this.type = tree.type;
    this.operator = tree.operator;
    this.args = tree.args;
  }

  evaluate(env) {
    /* fill in the rest of the code here */s
  }

  leftEvaluate(env) {
    /* fill in the rest of the code here */
  }
}

module.exports = { Value, Word, Apply, Property };
