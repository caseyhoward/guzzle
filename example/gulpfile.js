var gulp = require('gulp');
var guzzle = require('../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');

gulp.task('default', function() {
  guzzle.src('./src/*.js')
    .jshint()
    .uglify()
    .concat('test.js')
    .dest('./dist');
});
