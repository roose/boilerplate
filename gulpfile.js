var gulp = require('gulp');
var autoprefixer = require('autoprefixer-core');
var vars = require('postcss-simple-vars');
var colorFunction = require("postcss-color-function")

var $ = require('gulp-load-plugins')();

// errors handling and notify
var shitHappens = function(err) {
  $.notify.onError("Error: <%= error.message %>")(err);
  this.emit('end');
};

// concat and minify css files to style.css, style.min.css
gulp.task('css', function() {
  var processors = [
      autoprefixer({browsers: ['> 1%']}),
      vars,
      colorFunction()
  ];
  return gulp.src('css/main.css')
    .pipe($.plumber({errorHandler:shitHappens}))
    .pipe($.rigger())
    .pipe($.postcss(processors))
    .pipe($.rename('style.css'))
    .pipe(gulp.dest('css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss({noAdvanced: true}))
    .pipe(gulp.dest('css'));
});

// minify js files to default.min.js
gulp.task('js', function() {
  return gulp.src('js/default.js')
    .pipe($.plumber({errorHandler:shitHappens}))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.uglify())
    .pipe(gulp.dest('js'));
});

// concat, minify and copy CSS to dist folder
gulp.task('copy:css', ['css'], function() {
  return gulp.src(['css/style.css', 'css/style.min.css'])
    .pipe(gulp.dest('dist/css'));
});

// minify and copy JS to dist folder
gulp.task('copy:js', ['js'], function() {
  return gulp.src('js/**/*.js')
    .pipe(gulp.dest('dist/js'));
});

// Copy HTML
gulp.task('copy:html', function(){
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// Copy and optimize images
gulp.task('copy:images', function() {
  return gulp.src('img/*')
    .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

// Clean, delete dist folder
gulp.task('clean', function (done) {
  require('del')(['./dist'], done);
});

/*
Build
  1. delete dist folder
  2. copy html files to dist
  3. copy css files to dist
  4. copy images to dist
  5. copy js files to dist
*/
gulp.task('build', ['clean'], function(){
  gulp.start(['copy:html', 'copy:css', 'copy:images', 'copy:js']);
});

// pack dist folder to archive.zip
gulp.task('zip', function () {
    return gulp.src('dist/**/*')
        .pipe($.zip('archive.zip'))
        .pipe(gulp.dest('.'));
});

// Watch task
gulp.task('watch', function() {

  gulp.watch(['css/**/*.css', '!css/style.css', '!css/style.min.css'], ['css']);
  gulp.watch(['js/**/*.js', '!js/default.min.js'], ['js']);

  // Create LiveReload server
  $.livereload.listen();

  // Watch any html, js, css files, reload on change
  gulp.watch(['*.html', 'js/default.min.js', 'css/style.min.css']).on('change', $.livereload.changed);

});