var mergeStream = require('merge-stream');
var _ = require('lodash');

module.exports = function(proxy) {
  return function() {
    var proxies = Array.prototype.slice.call(arguments, 0);
    var streams = _.pluck(proxies, 'stream');
    streams.push(proxy.stream);
    proxy.stream = mergeStream.apply(mergeStream, streams);
  };
}
