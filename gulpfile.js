"use strict";

const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require('gulp-uglify');

gulp.task("build", function() {
  return browserify({
    debug: true,
    entries: "src/main.js",
    paths: ["/node_modules"]
  })
    .transform("babelify", {
      presets: ["es2015"],
      plugins: ["transform-html-import-to-string"],
      sourceMaps: true
    })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("build"));
