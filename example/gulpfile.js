var gulp = require('gulp');
var guzzle = require('../index.js');

guzzle.register('concat');
guzzle.register('tslint');

// guzzle.src('./src/*.ts').tslint().tslint.report('verbose').concat.dest('./dist');
gulp.task('default', function() {
  guzzle.src('./src/*.ts').tslint().concat().dest('./dist');
});
