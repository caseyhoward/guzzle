var gulp = require('gulp');
var guzzle = require('../../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');

gulp.task('basic', function() {
  guzzle.src('./assets/src/**/*.js')
    .jshint()
    .uglify()
    .concat('actual.js')
    .dest('./dist');
});
