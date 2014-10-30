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

guzzle.register('concat', 'uglify', 'jshint');

guzzle.task('default')
  .src('./src/*.js')
  .jshint()
  .uglify()
  .concat('test.js')
  .dest('./dist');
```

### or if you prefer one line
```javascript
var guzzle = require('guzzle');
guzzle.register('concat', 'uglify', 'jshint');
guzzle.task('default').src('./src/*.js').jshint().uglify().concat('test.js').dest('./dist');
```

### easily merge two streams
```javascript
gulp.task('default').src('./assets/src/main.js').jshint().merge(
  gulp.src('./assets/src/main2.js').jshint())
  .concat('test.js')
  .uglify()
  .dest('./dist');
```

## Disclaimer

The API for is most likely going to change. Use at your own risk.
