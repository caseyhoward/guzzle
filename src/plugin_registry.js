var _ = require('lodash');

module.exports = function() {
  var plugins = {};

  this.register = function(name, plugin) {
    plugins[name] = plugin;
  };

  this.all = function() {
    return _.clone(plugins);
  };
};
