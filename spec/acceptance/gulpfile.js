var gulp = require('../../index.js');
var concat = require('gulp-concat');

gulp.register('concat', 'uglify', 'jshint', 'order');
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
    .sourcemaps_init()
    .concat('actual.js')
    .uglify()
    .sourcemaps_write()
    .dest('./dist');
});

gulp.task('test-task-functions')
  .src('./assets/src/**/*.js')
  .jshint()
  .sourcemaps_init()
  .concat('actual.js')
  .uglify()
  .sourcemaps_write()
  .dest('./dist');

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

gulp.task('test-merge')
  .src('./assets/src/main.js')
  .jshint()
  .merge(
    gulp.src('./assets/src/main2.js').jshint()
  )
  .order(['assets/src/main.js', 'assets/src/main2.js'])
  .concat('actual.js')
  .uglify()
  .dest('./dist');

