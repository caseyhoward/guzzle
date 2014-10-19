var gulp = require('gulp');

var camelCase = function(dashedString) {
  return dashedString.replace(/-([a-z])/g, function (match) {
    return match[1].toUpperCase();
  });
}

module.exports = function() {
  var gulpPlugins = {};

  this.register = function() {
    var name, argumentIndex;
    var argumentsLength = arguments.length;
    for (argumentIndex = 0; argumentIndex < argumentsLength; argumentIndex++) {
      name = arguments[argumentIndex];
      gulpPlugins[camelCase(name)] = require('gulp-' + name);
    }
  };

  this.build = function(sources) {
    var stream = gulp.src(sources);
    var proxy = {
      dest: function(destination) {
        stream.pipe(gulp.dest(destination));
      },
      on: stream.on
    };
    for (pluginName in gulpPlugins) {
      proxy[pluginName] = (function(pluginName) {
        return function() {
          stream = stream.pipe(gulpPlugins[pluginName].apply(null, arguments));
          return proxy;
        }
      })(pluginName);

      for (property in gulpPlugins[pluginName]) {
        if (typeof gulpPlugins[pluginName][property] === 'function') {
          proxy[pluginName][property] = (function(pluginName, property) {
            return function() {
              stream = stream.pipe(gulpPlugins[pluginName][property].apply(null, arguments));
              return proxy;
            }
          })(pluginName, property);
        }
      }
    }
    return proxy;
  };
};
