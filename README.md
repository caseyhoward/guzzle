Gulp without straws.

This is a wrapper for gulp that adds syntactic sugar. It's basically gulp without the pipes.

## Usage

Example gulpfile:

```javascript
var gulp = require('gulp');
var guzzle = require('../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');

gulp.task('default', function() {
  guzzle.src('./src/*.js')
    .jshint()
    .uglify()
    .concat('test.js')
    .dest('./dist');
});
```

## Disclaimer

This is just a spike of an idea I had. There are no automated tests. Use at your own risk.
