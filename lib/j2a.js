const {j2a, json2AST, topEnv} = require("./registry.js");
const {Value, Word, Apply, Property} = require("./ast.js");

j2a['value'] = (j) => { 
  let obj = new Value(j);
  if (typeof obj.value === "object") {
    /* fill in the rest of the code here */
  }
  return obj;
};
j2a['word']  = (j) => new Word(j);
j2a['apply'] = (j) => {
  /* fill in the rest of the code here */
};

j2a['property'] = (j) => {
  /* fill in the rest of the code here */
};

module.exports = { j2a, json2AST };