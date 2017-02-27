
var webpackConfig = require('./scripts/webpack.config.js');
var spawn = require('child_process').spawn;
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var gulp = require('gulp');
var fs = require('fs');
var argv = require('yargs').argv;





function createWebpackTask(watch){
  var config = Object.assign({ }, webpackConfig, {
    watch: watch,
    devtool: watch? 'source-map': undefined,
  })

  return function(){

    return gulp.src("app/script/index.js")
      .pipe(webpack(config))
      .pipe(gulp.dest('./public'))
      .on("error", function(err){
        throw err
      })
  }
}

gulp.task('eslint', shell.task([ 'eslint ./app/script']));
 
gulp.task('build', ['eslint','webpack']);

gulp.task('webpack', [], createWebpackTask());
gulp.task('webpackWatch', [], createWebpackTask(true));

gulp.task('watch', ['webpackWatch']);


gulp.task('default', ['webpackWatch'])
