var gulp = require('gulp');
var StreamRecorder = new require('./stream_recorder');
var ProxyFactory = new require('./proxy_factory');
var RecordedStreamPlayer = require('./recorded_stream_player');

module.exports = function(gulpPlugins, pluginRegistry) {
  this.build = function(name, dependencies, callback) {
    var streamRecorder;
    if (typeof dependencies === 'function' || typeof callback === 'function') {
      return gulp.task.apply(gulp, arguments);
    } else {
      streamRecorder = new StreamRecorder(gulpPlugins, pluginRegistry).build();
      gulp.task(name, dependencies, function() {
        var proxy = new ProxyFactory(gulpPlugins, pluginRegistry).build();
        var recordedStreamPlayer = new RecordedStreamPlayer();
        recordedStreamPlayer.play(proxy, streamRecorder);
      });
      return streamRecorder;
    }
  };
};
