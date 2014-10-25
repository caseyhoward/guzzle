var gulp = require('../../index.js');
var concat = require('gulp-concat');

gulp.register('concat', 'uglify', 'jshint');
gulp.register('sourcemaps');

gulp.task('test-basic', function() {
  return gulp.src('./assets/src/**/*.js')
    .jshint()
    .concat('actual.js')
    .uglify()
    .dest('./dist');
});

gulp.task('test-multiple_functions', function() {
  return gulp.src('./assets/src/**/*.js')
    .jshint()
    .sourcemaps.init()
    .concat('actual.js')
    .uglify()
    .sourcemaps.write()
    .dest('./dist');
});

gulp.task('test-task')
  .src('./assets/src/**/*.js')
  .jshint()
  .concat('actual.js')
  .uglify()
  .dest('./dist');

gulp.task('test-pipe')
  .src('./assets/src/**/*.js')
  .jshint()
  .pipe(concat('actual.js'))
  .uglify()
  .dest('./dist');

