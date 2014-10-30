var gulp = require('gulp');
var TaskFactory = require('./src/task_factory');
var ProxyFactory = require('./src/proxy_factory');
var GulpPluginRegistery = require('./src/gulp_plugin_registry');

var Guzzle = function() {
  var gulpPlugins = new GulpPluginRegistery();
  var proxyFactory = new ProxyFactory(gulpPlugins);
  var taskFactory = new TaskFactory(gulpPlugins, proxyFactory);

  return {
    task: taskFactory.build,
    src: function() {
      var proxy = proxyFactory.build();
      return proxy.src.apply(null, arguments);
    },
    register: proxyFactory.register
  };
};

module.exports = new Guzzle();
