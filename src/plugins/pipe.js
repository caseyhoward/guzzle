module.exports = function(proxy) {
  return function() {
    proxy.stream = proxy.stream.pipe.apply(proxy.stream, arguments);
  };
};
