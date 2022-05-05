var should = require("should");
let e2t = require('@ull-esit-pl/example2test');

describe("Testing curry", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };

  it("testing curry-method.egg", function(done) {
    runTest('curry-method', done);
  });

  it(`testing curry-no-method.egg`, function(done) {
    runTest(`curry-no-method`, done);
  });

  it(`testing curry-no-method-cylinder-volume.egg`, function(done) {
    runTest(`curry-no-method-cylinder-volume`, done);
  });


});
