var gulp = require('gulp');
var guzzle = require('../../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');
guzzle.register('sourcemaps');

gulp.task('basic', function() {
  guzzle.src('./assets/src/**/*.js')
    .jshint()
    .concat('actual.js')
    .uglify()
    .dest('./dist');
});

gulp.task('multiple_functions', function() {
  guzzle.src('./assets/src/**/*.js')
    .jshint()
    .sourcemaps.init()
    .concat('actual.js')
    .uglify()
    .sourcemaps.write()
    .dest('./dist');
});


