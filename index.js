var gulp = require('gulp');
var TaskFactory = require('./src/task_factory');
var ProxyFactory = require('./src/proxy_factory');

var Guzzle = function() {
  var proxyFactory = new ProxyFactory();
  var taskFactory = new TaskFactory(proxyFactory);

  return {
    task: taskFactory.build,
    src: proxyFactory.build,
    register: proxyFactory.register
  };
};

module.exports = Guzzle;
