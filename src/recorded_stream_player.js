var _ = require('lodash');

module.exports = function() {
  this.play = function(proxy, recorder) {
    _.each(recorder.commands, function(command) {
      if (command.property) {
        proxy = proxy[command.name][command.property].apply(proxy, command.arguments);
      } else {
        proxy = proxy[command.name].apply(proxy, command.arguments);
      }
    });
    return proxy;
  }
};

