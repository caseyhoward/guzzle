var gulp = require('gulp');
var _ = require('lodash');

var camelCase = function(dashedString) {
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

var gulpPlugins = new GulpPluginRegistery();

module.exports = function() {
  this.register = gulpPlugins.register;

  this.build = function(sources) {
    function buildPluginProxy(pluginName) {
      return function() {
        stream = stream.pipe(gulpPlugins.get(pluginName).apply(null, arguments));
        return proxy;
      };
    }

    function buildProxyFunction(pluginName, property) {
      return function() {
        stream = stream.pipe(gulpPlugins.get(pluginName)[property].apply(null, arguments));
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

    var stream = gulp.src(sources);

    var proxy = {
      dest: function(destination) {
        return stream.pipe(gulp.dest(destination));
      },
      pipe: function() {
        stream = stream.pipe.apply(stream, arguments);
        return proxy;
      },
      on: function() {
        stream = stream.on.apply(stream, arguments);
        return proxy;
      }
    };
    for (pluginName in gulpPlugins.all()) {
      proxy[pluginName] = buildProxy(pluginName);
    }
    return proxy;
  };
};
