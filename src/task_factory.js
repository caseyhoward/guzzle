var gulp = require('gulp');
var ProxyFactory = new require('./proxy_factory');

module.exports = function(gulpPlugins, proxyFactory) {
  this.build = function(name, dependencies, callback) {
    var proxy;
    if (typeof dependencies === 'function' || typeof callback === 'function') {
      return gulp.task.apply(gulp, arguments);
    } else {
      gulp.task(name, dependencies, function() {
        return proxy;
      });
      return {
        src: function(sources) {
          proxy = proxyFactory.build(sources);
          return proxy;
        }
      };
    }
  };
};
