var del = require('del');
var exec = require('child_process').exec;
var expect = require('chai').expect;
var fileSystem = require('fs');

describe('guzzle.src', function() {
  function deleteDistDirectory(done) {
    del('./spec/acceptance/dist', done);
  }

  function readFileAndChompNewline(filename) {
    return fileSystem.readFileSync(filename).toString().replace(/\n$/, "");
  }

  function runTest(name, done) {
    exec('gulp ' + name + ' -v', {cwd: './spec/acceptance/'}, function() {
      var expectedFileContents = readFileAndChompNewline('./spec/acceptance/expected_result.js');
      var actualFileContents = readFileAndChompNewline('./spec/acceptance/dist/actual.js');
      expect(expectedFileContents).to.equal(actualFileContents);
      done();
    });
  }

  beforeEach(deleteDistDirectory);
  afterEach(deleteDistDirectory);

  it('works', function(done) {
    runTest('basic', done);
  });
});
