var fs = require('fs');
var readFile = (x) => fs.readFileSync(x, 'utf-8');
let insp = require("util").inspect;
let ins = (x) => insp(x, {depth:null});
const {specialForms, topEnv} = require("./registry.js");
const path = require("path");

let parser = require('./parse.js');
let parse = parser.parse;


function REQUIRE(args, env) {
  /* fill in the rest of the code here */
}
REQUIRE.cache = Object.create(null);

specialForms['require'] = REQUIRE;

module.exports = REQUIRE;



