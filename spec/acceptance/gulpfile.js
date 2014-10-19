var gulp = require('../../index.js')();

gulp.register('concat', 'uglify', 'jshint');
gulp.register('sourcemaps');

gulp.task('basic', function() {
  return gulp.src('./assets/src/**/*.js')
    .jshint()
    .concat('actual.js')
    .uglify()
    .dest('./dist');
});

gulp.task('multiple_functions', function() {
  return gulp.src('./assets/src/**/*.js')
    .jshint()
    .sourcemaps.init()
    .concat('actual.js')
    .uglify()
    .sourcemaps.write()
    .dest('./dist');
});

gulp.task('task')
  .src('./assets/src/**/*.js')
  .jshint()
  .concat('actual.js')
  .uglify()
  .dest('./dist');
