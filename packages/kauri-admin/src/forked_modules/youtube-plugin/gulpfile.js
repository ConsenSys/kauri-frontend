/*
 * Copyright (c) 2017, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.demo.js");

// The development server (the recommended option for development)
gulp.task("default", ["dev-server"]);

gulp.task("sass", function () {
  return gulp.src("./src/styles/**/*.scss")
    .pipe(sass.sync({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("demo-sass", function () {
  return gulp.src("./demo/main.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./demo"));
});

gulp.task("demo-watch", function () {
  gulp.watch("./src/sass/**/*.scss", ["demo-sass"]);
  gulp.watch("./demo/main.scss", ["demo-sass"]);
});

gulp.task("build", function (callback) {
  gulp.start("sass");
});

gulp.task("dev-server", function (callback) {
  gulp.start("demo-sass");
  gulp.start("demo-watch");

  new WebpackDevServer(webpack(webpackConfig), {
    stats: {colors: true}
  }).listen(8080, "localhost", function (err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
  });
});
