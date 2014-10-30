var gulp = require('gulp');
var _ = require('lodash');

module.exports = function(gulpPlugins, pluginRegistry) {
  this.register = gulpPlugins.register;

  this.build = function() {
    function buildPluginProxy(pluginName) {
      return function() {
        proxy.stream = proxy.stream.pipe(gulpPlugins.get(pluginName).apply(null, arguments));
        return proxy;
      };
    }

    function buildProxyFunction(pluginName, property) {
      return function() {
        proxy.stream = proxy.stream.pipe(gulpPlugins.get(pluginName)[property].apply(null, arguments));
        return proxy;
      }
    }

    function buildProxy(pluginName) {
      var proxy = buildPluginProxy(pluginName);
      _.each(_.functions(gulpPlugins.get(pluginName)), function(property) {
        proxy[property] = buildProxyFunction(pluginName, property);
      });
      return proxy;
    }

    var proxy = {};
    _.forIn(pluginRegistry.all(), function(plugin, name) {
      proxy[name] = function() {
        plugin(proxy).apply(proxy, arguments);
        return proxy;
      };
    });

    for (pluginName in gulpPlugins.all()) {
      proxy[pluginName] = buildProxy(pluginName);
    }
    return proxy;
  };
};
