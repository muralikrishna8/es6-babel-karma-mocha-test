"use strict";

const gulp = require("gulp");
const browserify = require("gulp-browserify");
const rename = require("gulp-rename");
const mocha = require("gulp-mocha");
const Server = require('karma').Server;
require("babel-register");

gulp.task("build", () => {
  gulp.src("src/**/*.js")
    .pipe(browserify({
          "transform": ["babelify"]
      }))
    .pipe(rename("app.js"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build:watch', function() {
	gulp.watch("src/**/*.js", ["build"]).on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

gulp.task('test:watch', done => {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
})
