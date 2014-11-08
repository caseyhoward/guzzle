Gulp without straws.

This is a wrapper for gulp that adds syntactic sugar. It's basically gulp without the pipes.

## Installation
```
npm install --save-dev guzzle
```

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
    .pipe(gulp.dest('./dist'));
});
```

### gulpfile.js with guzzle

```javascript
var guzzle = require('guzzle');

guzzle.register('concat', 'uglify', 'jshint', 'sourcemaps');

guzzle.task('default')
  .src('./src/*.js')
  .jshint()
  .sourcemaps_init()
  .concat('test.js')
  .uglify()
  .sourcemaps_write()
  .dest('./dist');
```

## Disclaimer

The API for is most likely going to change. Use at your own risk.
