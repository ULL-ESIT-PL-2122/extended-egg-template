var should = require("should");
let e2t = require('@ull-esit-pl/example2test');

describe("Testing eval and state meta properties from Egg", function() {
  let runTest = (programName, done) => {
    debugger;
    e2t({
      exampleInput: programName+'.egg', 
      executable: 'bin/egg.js', 
      assertion: (result, expected) => result.trim().should.eql(expected.trim()),
      done: done, 
    });
  };

  it("testing specialform-property.egg", function(done) {
    runTest('specialform-property', done);
  });

  for(let i=2; i<=4; i++) {
    it(`testing specialform-property-${i}.egg`, function(done) {
      runTest(`specialform-property-${i}`, done);
    });
  }

});
