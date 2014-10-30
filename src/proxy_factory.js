var gulp = require('gulp');
var _ = require('lodash');

module.exports = function(gulpPlugins) {
  this.register = gulpPlugins.register;

  this.build = function() {
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

    var stream;

    var proxy = {
      src: function() {
        stream = gulp.src.apply(null, arguments);
        return proxy;
      },
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
