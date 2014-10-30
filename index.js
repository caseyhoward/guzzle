var gulp = require('gulp');
var TaskFactory = require('./src/task_factory');
var ProxyFactory = require('./src/proxy_factory');
var GulpPluginRegistery = require('./src/gulp_plugin_registry');
var PluginRegistry = require('./src/plugin_registry');

var Guzzle = function() {
  var pluginRegistry = new PluginRegistry();

  pluginRegistry.register('dest', require('./src/plugins/dest'));
  pluginRegistry.register('merge', require('./src/plugins/merge'));
  pluginRegistry.register('on', require('./src/plugins/on'));
  pluginRegistry.register('pipe', require('./src/plugins/pipe'));
  pluginRegistry.register('src', require('./src/plugins/src'));

  var gulpPlugins = new GulpPluginRegistery();
  var proxyFactory = new ProxyFactory(gulpPlugins, pluginRegistry);
  var taskFactory = new TaskFactory(gulpPlugins, pluginRegistry);

  return {
    task: taskFactory.build,
    src: function() {
      var proxy = proxyFactory.build();
      return proxy.src.apply(null, arguments);
    },
    register: proxyFactory.register
  };
};

var guzzle = new Guzzle();

module.exports = guzzle;
