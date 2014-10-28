var del = require('del');
var exec = require('child_process').exec;
var expect = require('chai').expect;
var fileSystem = require('fs');
var RSVP = require('rsvp');

describe('guzzle', function() {
  function deleteDistDirectory(done) {
    del('./spec/acceptance/dist', done);
  }

  function readFileAndChompNewline(filename) {
    return new RSVP.Promise(function(resolve, reject) {
      fileSystem.readFile(filename, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data.toString().replace(/[\s\n]$/, ""));
        }
      })
    });
  }

  function runTest(name, assertions) {
    it(name, function(done) {
      exec('gulp test-' + name + ' -v', {cwd: './spec/acceptance/'}, function(error, stdout, stderr) {
        if (error) {
          console.log(stdout);
          console.log(stderr);
          throw error;
        }
        var expectedFileContents = readFileAndChompNewline('./spec/acceptance/assets/expected_results/' + name + '.js');
        var actualFileContents = readFileAndChompNewline('./spec/acceptance/dist/actual.js');
        RSVP.all([actualFileContents, expectedFileContents]).then(function(fileContents) {
          assertions.apply(this, fileContents);
          done();
        });
      });
    });
  }

  beforeEach(deleteDistDirectory);
  afterEach(deleteDistDirectory);

  runTest('basic', function(actualFileContents, expectedFileContents) {
    expect(actualFileContents.toString()).to.not.equal('');
    expect(actualFileContents).to.equal(expectedFileContents);
  });

  runTest('multiple_functions', function(actualFileContents, expectedFileContents) {
    expect(actualFileContents).to.not.equal('');
    expect(actualFileContents).to.have.string(expectedFileContents);
  });

  runTest('task', function(actualFileContents, expectedFileContents) {
    expect(actualFileContents.toString()).to.not.equal('');
    expect(actualFileContents).to.equal(expectedFileContents);
  });

  runTest('pipe', function(actualFileContents, expectedFileContents) {
    expect(actualFileContents.toString()).to.not.equal('');
    expect(actualFileContents).to.equal(expectedFileContents);
  });
});
