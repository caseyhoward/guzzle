var gulp = require('gulp');
var ProxyFactory = new require('./proxy_factory');
var StreamRecorder = new require('./stream_recorder');

module.exports = function(gulpPlugins, proxyFactory) {
  this.build = function(name, dependencies, callback) {
    var streamRecorder;
    if (typeof dependencies === 'function' || typeof callback === 'function') {
      return gulp.task.apply(gulp, arguments);
    } else {
      streamRecorder = new StreamRecorder(gulpPlugins).build();
      gulp.task(name, dependencies, function() {
        streamRecorder.play();
      });
      return streamRecorder;
    }
  };
}
