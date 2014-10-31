var _ = require('lodash');

module.exports = function() {
  this.play = function(proxy, recorder) {
    _.each(recorder.commands, function(command) {
      proxy = proxy[command.name].apply(proxy, command.arguments);
    });
    return proxy;
  }
};

