module.exports = function(proxy) {
  return function() {
    proxy.stream = proxy.stream.on.apply(proxy.stream, arguments);
  };
};
