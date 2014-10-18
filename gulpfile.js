var gulp = require('gulp');
var guzzle = require('./index')();

guzzle.register('mocha');

gulp.task('default', function () {
  return guzzle.src('spec/**/*.spec.js', {read: false}).mocha();
});
