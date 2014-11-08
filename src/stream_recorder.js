var gulp = require('gulp');
var _ = require('lodash');
var ProxyFactory = require('./proxy_factory');

module.exports = function(gulpPlugins, pluginRegistry) {
  this.build = function() {
    var commands = [];

    function buildRecorder(name) {
      return function() {
        commands.push({name: name, arguments: arguments});
        return recorder;
      };
    }

    var recorder = {};
    for (pluginName in gulpPlugins.all()) {
      recorder[pluginName] = buildRecorder(pluginName);
      _.each(_.functions(gulpPlugins.get(pluginName)), function(property) {
        recorder[pluginName + '_' + property] = buildRecorder(pluginName + '_' + property);
      });
    }
    _.each(_.keys(pluginRegistry.all()), function(name) {
      recorder[name] = buildRecorder(name);
    });

    recorder.commands = commands;

    return recorder;
  };
};

