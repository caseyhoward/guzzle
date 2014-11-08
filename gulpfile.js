var guzzle = require('./index');
var gulp = require('gulp');

guzzle.register('mocha', 'tag-version', 'git', 'bump', 'filter');

guzzle.task('default').src('spec/**/*.spec.js', {read: false}).mocha();

guzzle.task('watch', ['default'], function() {
  gulp.watch(['spec/**/*.js'], ['default']);
  gulp.watch(['src/**/*.js'], ['default']);
});

function incrementVersion(proxy, importance) {
  return proxy.src(['./package.json'])
    .bump({type: importance})
    .dest('./')
    .git_commit('Update version')
    .filter('package.json')
    .tagVersion();
}

incrementVersion(guzzle.task('patch'), 'patch');
incrementVersion(guzzle.task('minor'), 'minor');
incrementVersion(guzzle.task('major'), 'major');
