var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    del = require('del'),
    livereload = require('gulp-livereload');

// CSS concat to style.css and minify to style.min.css
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({noAdvanced: true}))
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Fonts

// JS
gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// HTML
gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'HTML task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
  del(['dist/js', 'dist/css', 'dist/img', 'dist/*.html'], cb)
});

// Watch
gulp.task('watch', function() {

  gulp.watch('src/css/*.css', ['css']);

  gulp.watch('src/js/**/*.js', ['js']);

  gulp.watch('src/*.html', ['html']);

  gulp.watch('src/img/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

// Default
gulp.task('default', ['clean'], function() {
  gulp.start('css', 'js', 'html', 'images');
});