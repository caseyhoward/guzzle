Gulp without straws.

This is a wrapper for gulp that adds syntactic sugar. It's basically gulp without the pipes.

## Usage

### gulpfile.js without guzzle

```javascript
var gulp = require('gulp');

require('gulp-concat');
require('gulp-uglify');
require('gulp-jshint');

gulp.task('default', function() {
  gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(uglify())
    .pipe(concat('test.js'))
    .pipe(dest('./dist'));
});
```

### gulpfile.js with guzzle

```javascript
var guzzle = require('../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');

guzzle.task('default')
  .src('./src/*.js')
  .jshint()
  .uglify()
  .concat('test.js')
  .dest('./dist');
```

### or if you prefer one line
```javascript
var guzzle = require('../index.js')();

guzzle.register('concat');
guzzle.register('uglify');
guzzle.register('jshint');

guzzle.task('default').src('./src/*.js').jshint().uglify().concat('test.js').dest('./dist');
```

## Disclaimer

The API for is most likely going to change. Use at your own risk.
