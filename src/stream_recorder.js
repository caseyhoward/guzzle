var gulp = require('gulp');
var _ = require('lodash');
var ProxyFactory = require('./proxy_factory');

module.exports = function(gulpPlugins, pluginRegistry) {
  this.build = function() {
    var commands = [];

    function record(name) {
      return function() {
        commands.push({name: name, arguments: arguments});
        return recorder;
      };
    }

    function recordFunction(name, property) {
      return function() {
        commands.push({name: name, property: property, arguments: arguments});
        return recorder;
      }
    }

    function buildRecorder(name) {
      var recorder = record(name);
      _.each(_.functions(gulpPlugins.get(name)), function(property) {
        recorder[property] = recordFunction(name, property);
      });
      return recorder;
    }

    var recorder = {};
    for (pluginName in gulpPlugins.all()) {
      recorder[pluginName] = buildRecorder(pluginName);
    }
    _.each(_.keys(pluginRegistry.all()), function(name) {
      recorder[name] = function() {
        commands.push({name: name, arguments: arguments});
        return recorder;
      };
    });

    recorder.play = function() {
      var proxy = new ProxyFactory(gulpPlugins, pluginRegistry).build();
      _.each(commands, function(command) {
        proxy = proxy[command.name].apply(proxy, command.arguments);
      });
      return proxy;
    };
    return recorder;
  };
};

