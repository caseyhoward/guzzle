var gulp = require('gulp');
var _ = require('lodash');
var ProxyFactory = require('./proxy_factory');

module.exports = function(gulpPlugins, pluginRegistry) {
  this.build = function() {
    var commands = [];

    function record(name, extras) {
      extras = extras || {};
      return function() {
        commands.push(_.merge(extras, {name: name, arguments: arguments}));
        return recorder;
      };
    }

    function recordFunction(name, property) {
      record(name, {property: property});
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
      recorder[name] = record(name);
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

