var gulp = require('gulp');
var _ = require('lodash');
var mergeStream = require('merge-stream');

module.exports = function(gulpPlugins) {
  this.register = gulpPlugins.register;

  this.build = function() {
    function buildPluginProxy(pluginName) {
      return function() {
        proxy.stream = proxy.stream.pipe(gulpPlugins.get(pluginName).apply(null, arguments));
        return proxy;
      };
    }

    function buildProxyFunction(pluginName, property) {
      return function() {
        proxy.stream = proxy.stream.pipe(gulpPlugins.get(pluginName)[property].apply(null, arguments));
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

    var proxy = {
      src: function() {
        proxy.stream = gulp.src.apply(null, arguments);
        return proxy;
      },
      dest: function(destination) {
        return proxy.stream.pipe(gulp.dest(destination));
      },
      pipe: function() {
        proxy.stream = proxy.stream.pipe.apply(proxy.stream, arguments);
        return proxy;
      },
      on: function() {
        proxy.stream = proxy.stream.on.apply(proxy.stream, arguments);
        return proxy;
      },
      merge: function() {
        var proxies = Array.prototype.slice.call(arguments, 0);
        var streams = _.pluck(proxies, 'stream');
        streams.push(proxy.stream);
        proxy.stream = mergeStream.apply(mergeStream, streams);
        return proxy;
      }
    };

    for (pluginName in gulpPlugins.all()) {
      proxy[pluginName] = buildProxy(pluginName);
    }
    return proxy;
  };
};
