module.exports = function(proxy, gulp) {
  return function() {
    proxy.stream = gulp.src.apply(gulp, arguments);
  };
};

