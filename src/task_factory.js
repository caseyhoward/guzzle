var gulp = require('gulp');
var StreamRecorder = new require('./stream_recorder');

module.exports = function(gulpPlugins, proxyRegistry) {
  this.build = function(name, dependencies, callback) {
    var streamRecorder;
    if (typeof dependencies === 'function' || typeof callback === 'function') {
      return gulp.task.apply(gulp, arguments);
    } else {
      streamRecorder = new StreamRecorder(gulpPlugins, proxyRegistry).build();
      gulp.task(name, dependencies, function() {
        streamRecorder.play();
      });
      return streamRecorder;
    }
  };
};
