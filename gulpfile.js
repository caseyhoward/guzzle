var gulp = require('gulp');
var guzzle = require('./index')();

guzzle.register('mocha');

gulp.task('default', function () {
  return guzzle.src('spec/acceptance/specs.js', {read: false}).mocha();
});
