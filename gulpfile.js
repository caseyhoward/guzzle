var guzzle = require('./index');

guzzle.register('mocha');

guzzle.task('default').src('spec/acceptance/specs.js', {read: false}).mocha();
