var should = require("should");
let e2t = require('@ull-esit-pl/example2test');

describe("Separated Compilation in Egg", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: 'require/'+programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };

  it("testing client.egg", function(done) {
    runTest('client', done);
  });

});
