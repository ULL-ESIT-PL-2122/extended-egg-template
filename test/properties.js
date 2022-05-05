var should = require("should");
let e2t = require('@ull-esit-pl/example2test');

describe("Calling JS Methods from Egg", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };

  it("testing array-properties.egg", function(done) {
    runTest('array-properties', done);
  });


  it("testing property.egg", function(done) {
    runTest('property', done);
  });

  it("testing array-set-property.egg", function(done) {
    runTest('array-set-property', done);
  });

  it("testing error-property.egg", function(done) {
    runTest('error-property', done);
  });


});
