var guzzle = require('./index');
var gulp = require('gulp');

guzzle.register('mocha');

guzzle.task('default').src('spec/acceptance/specs.js', {read: false}).mocha();

guzzle.task('watch', ['default'], function() {
  gulp.watch(['spec/**/*.js'], ['default']);
  gulp.watch(['src/**/*.js'], ['default']);
});
