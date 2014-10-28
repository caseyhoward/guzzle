module.exports = GulpPluginRegistery;

function camelCase(dashedString) {
  return dashedString.replace(/-([a-z])/g, function (match) {
    return match[1].toUpperCase();
  });
}

function GulpPluginRegistery() {
  var gulpPlugins = {};

  this.register = function(name) {
    var name, argumentIndex;
    var argumentsLength = arguments.length;
    for (argumentIndex = 0; argumentIndex < argumentsLength; argumentIndex++) {
      name = arguments[argumentIndex];
      gulpPlugins[camelCase(name)] = require('gulp-' + name);
    }
  };

  this.get = function(name) {
    return gulpPlugins[name];
  };

  this.all = function() {
    return gulpPlugins;
  };
};

