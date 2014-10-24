var gulp = require('gulp');
var _ = require('lodash');

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
    function buildPluginProxy(pluginName) {
      return function() {
        stream = stream.pipe(gulpPlugins[pluginName].apply(null, arguments));
        return proxy;
      };
    }

    function buildProxyFunction(pluginName, property) {
      return function() {
        stream = stream.pipe(gulpPlugins[pluginName][property].apply(null, arguments));
        return proxy;
      }
    }

    function buildProxy(pluginName) {
      var proxy = buildPluginProxy(pluginName);
      _.each(_.functions(gulpPlugins[pluginName]), function(property) {
        proxy[property] = buildProxyFunction(pluginName, property);
      });
      return proxy;
    }

    var stream = gulp.src(sources);

    var proxy = {
      dest: function(destination) {
        stream.pipe(gulp.dest(destination));
      }
    };
    for (pluginName in gulpPlugins) {
      proxy[pluginName] = buildProxy(pluginName);
    }
    return proxy;
  };
};
