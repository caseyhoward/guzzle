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
      }
    };
    for (moduleName in modules) {
      proxy[moduleName] = function() {
        stream = stream.pipe(modules[moduleName]());
        return proxy;
      };
    }
    return proxy;
  };
};

module.exports = Guzzle;
