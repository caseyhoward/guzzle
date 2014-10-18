var gulp = require('gulp');

var camelCase = function(dashedString) {
  return dashedString.replace(/-([a-z])/g, function (match) {
    return match[1].toUpperCase();
  });
}

var Guzzle = function() {
  var proxyFactory = new ProxyFactory();

  return {
    src: function(sources) {
      return proxyFactory.build(sources);
    },
    register: function(name) {
      proxyFactory.register(name);
    }
  };
};

var ProxyFactory = function() {
  var modules = {};

  this.register = function(name) {
    modules[camelCase(name)] = require('gulp-' + name);
  };

  this.build = function(sources) {
    var stream = gulp.src(sources);
    var proxy = {
      dest: function(destination) {
        stream.pipe(gulp.dest(destination));
      },
      on: stream.on
    };
    for (moduleName in modules) {
      proxy[moduleName] = (function(moduleName) {
        return function() {
          stream = stream.pipe(modules[moduleName].apply(null, arguments));
          return proxy;
        }
      })(moduleName);
    }
    return proxy;
  };
};

module.exports = Guzzle;
