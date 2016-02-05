# Vinyl adapter to read a fstream into a gulp pipeline

It takes a [fstream](https://github.com/npm/fstream) as input and returns a gulp stream of [vinyl](https://github.com/gulpjs/vinyl) files.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Examples

### Copy a directory
```
var fstream = require("fstream");
var vfs = require("vinyl-fstream");

gulp.task("copy", function() {
    return vfs.src(fstream.Reader("./"))
        .pipe(gulp.dest("../dist"));
}
```
Note: this example is only for instructional purpose, as it is easier to use `gulp.src("./*")`.

### Zip a npm package
```
var npmPacker = require("fstream-npm");
var vfs = require("vinyl-fstream");
var zip = require("gulp-zip");

gulp.task("zip", function() {
    return vfs.src(npmPacker("./"))
        .pipe(zip(fileName))
        .pipe(gulp.dest("dist"));
}
```
Note: _fstream-npm_ takes in consideration `.npmignore` and package.json `files` property, so the zip will contain only what would be packaged by `npm pack`.

## Api

### vfs.src(streams, options)

**streams**: It can be a fstream or an array of fstreams

**options** (optional): It accepts the "read" and "buffer" options of [vinyl-fs](https://github.com/gulpjs/vinyl-fs).

Note: Usually _fstream_ entries are consumed one at a time and _fstream_'s api doesn't state if entries can be consumed simultaneously, so use `buffer: false` under your own risk.

[npm-url]: https://npmjs.org/package/vinyl-fstream
[npm-image]: http://img.shields.io/npm/v/vinyl-fstream.svg
[downloads-image]: http://img.shields.io/npm/dm/vinyl-fstream.svg
[travis-image]: https://travis-ci.org/pmoleri/vinyl-fstream.svg?branch=master
[travis-url]: https://travis-ci.org/pmoleri/vinyl-fstream
