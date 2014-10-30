var gulp = require('gulp');
var TaskFactory = require('./src/task_factory');
var ProxyFactory = require('./src/proxy_factory');
var GulpPluginRegistery = require('./src/gulp_plugin_registry');
var PluginRegistry = require('./src/plugin_registry');
var _ = require('lodash');
var mergeStream = require('merge-stream');

var Guzzle = function() {
  var gulpPlugins = new GulpPluginRegistery();
  var pluginRegistry = new PluginRegistry();
  var proxyFactory = new ProxyFactory(gulpPlugins, pluginRegistry);
  var taskFactory = new TaskFactory(gulpPlugins, pluginRegistry);

  return {
    task: taskFactory.build,
    src: function() {
      var proxy = proxyFactory.build();
      return proxy.src.apply(null, arguments);
    },
    register: proxyFactory.register,
    plugin: pluginRegistry.register
  };
};

var guzzle = new Guzzle();

guzzle.plugin('src', function(proxy) {
  return function() {
    proxy.stream = gulp.src.apply(gulp, arguments);
  };
});

guzzle.plugin('dest', function(proxy) {
  return function(destination) {
    proxy.stream = proxy.stream.pipe(gulp.dest(destination));
  };
});

guzzle.plugin('pipe', function(proxy) {
  return function() {
    proxy.stream = proxy.stream.pipe.apply(proxy.stream, arguments);
  };
});

guzzle.plugin('on', function(proxy) {
  return function() {
    proxy.stream = proxy.stream.on.apply(proxy.stream, arguments);
  };
});

guzzle.plugin('merge', function(proxy) {
  return function() {
    var proxies = Array.prototype.slice.call(arguments, 0);
    var streams = _.pluck(proxies, 'stream');
    streams.push(proxy.stream);
    proxy.stream = mergeStream.apply(mergeStream, streams);
  };
});

module.exports = guzzle;
