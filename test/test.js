let insp = require("util").inspect;
let ins = (x) => insp(x, {depth:null});
var fs = require('fs');
var should = require("should");
let sinon = require('sinon');
let testConsole = require("test-console");
let expect = require('chai').expect;
require('mocha-sinon');

const assert = require('assert');
const {Value, Word, Apply} = require("../lib/ast.js");
var parser = require('../lib/parse.js');
var eggvm = require('../lib/eggvm.js');

describe("parse", function() {
  it("should parse numbers and leave rest", function() {
    var value = new Value({ type: 'value', value: 1 });
    parser.nextToken = parser.makeLexer('1');
    parser.nextToken();
    parser.parseExpression().should.eql(value);
  })
  it("should parse strings", function() {
    parser.nextToken = parser.makeLexer('"s"');
    parser.nextToken();
    var value = new Value({ type: 'value', value: 's' })
    parser.parseExpression('"s"').should.eql(value);
  })
  it("should parse word not followed by '('", function() {
    parser.nextToken = parser.makeLexer('word');
    parser.nextToken();
    var value = new Word({
			type: 'word',
			name: 'word',
			token: { type: 'WORD', value: 'word', lineno: 1, offset: 0 } 
    });
    parser.parseExpression('word').should.eql(value);
  })
  it("should parse apply if word followed by '('", function() {
    parser.nextToken = parser.makeLexer('word ( a )');
    parser.nextToken();
    var value = new Apply({ 
      type: 'apply',
      operator: new Word({ type: 'word', name: 'word' }),
      args: [ new Word({ type: 'word', name: 'a' }) ] 
    });
    var value = new Apply ({
						type: 'apply',
						operator: new Word ({
							 type: 'word',
							 name: 'word',
							 token: { type: 'WORD', value: 'word', lineno: 1, offset: 0 } 
            }),
						args: [ new Word({ type: 'word', name: 'a', token: { type: 'WORD', value: 'a', lineno: 1, offset: 7 } }) ] 
    });
    parser.parseExpression('word ( a )').should.eql(value);
  })
});

describe("run", function() {
  let originalLog;
  let output = [];
  beforeEach(function() {
    originalLog = console.log;
    console.log = function (...args) { 
      originalLog(...args); 
      output.push(...args);
      return args; 
    };
  });
  
  // test code here
  afterEach(function() {
    console.log = originalLog;
    output = [];
  });

  it("should run a complex function", function() {
    let program = `
      do(
        def(sum,  ; function
          ->(nums, 
            do(
               :=(i, 0), # Creates a local variable i and sets to 0
               :=(s, 0), # Creates local var s and sets to 0
               while(<(i, length(nums)),
                 do(=(s, +(s, <-(nums, i))),
                    =(i, +(i, 1))
                 )
               ),
               s # the last expression is returned 
            )
         )
       ),
       sum(array(1, 2, 3, 4))
      )
    `;
    let r = eggvm.run(program);
    r.should.eql(10);
  });

  it("testing one.egg with mocking of console.log", function() {
    let program = fs.readFileSync('examples/one.egg', 'utf8');
    let r = eggvm.run(program);
    output[0].should.eql('50');
  });

  it("testing sum.egg with mocking of console.log", function() {
    let program = fs.readFileSync('examples/sum.egg', 'utf8');
    let r = eggvm.run(program);
    r.should.be.approximately(395.5,0.1);
  });

  it("testing array.egg with mocking of console.log", function() {
    let program = fs.readFileSync('examples/array.egg', 'utf8');
    let r = eggvm.run(program);
    r.should.eql(5);
    output.should.be.deepEqual([ "[1,4]" , "5" ]);
    //console.log(output);
  });

  it("testing if.egg with mocking of console.log", function() {
    let program = fs.readFileSync('examples/if.egg', 'utf8');
    let r = eggvm.run(program);
    r.should.eql(5);
    output.should.be.deepEqual([ '5' ]);
    //console.log(output);
  });

  it("testing reduce.egg with mocking of console.log", function() {
    let program = fs.readFileSync('examples/reduce.egg', 'utf8');
    let r = eggvm.run(program);
    r.should.eql(1);
    output.should.be.deepEqual([ '15', '720', '0', '1' ]);
    //console.log(output);
  });

});
