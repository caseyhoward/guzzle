module.exports = function(proxy, gulp) {
  return function(destination) {
    proxy.stream = proxy.stream.pipe(gulp.dest(destination));
  };
};
