const inspect = require('util').inspect;
const ins = (x) => inspect(x, {depth: 2});
let specialForms = Object.create(null); // Egg objects don't inherit from Object if create(null)
let topEnv = Object.create(null);

// From JSON to AST map
let j2a = Object.create(null);
function json2AST(node) { // Generic JSON traversing building the AST
  /* fill in the rest of the code here */
}
 
function checkNegativeIndex(obj, element) {
  /* fill in the rest of the code here or use the monkey patch solution instead */
}

module.exports = {specialForms, topEnv, j2a, json2AST, checkNegativeIndex};
