var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var zip = require('gulp-zip');
// var notifier = require('node-notifier');

// CSS concat to style.css and minify to style.min.css
gulp.task('css', function() {
  return gulp.src(['src/css/reset.css', 'src/css/*.css', 'src/css/main.css', '!src/css/style.css', '!src/css/style.min.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({noAdvanced: true}))
    .pipe(gulp.dest('src/css'));
});

// Fonts

// JS minify to default.min.js
gulp.task('js', function() {
  return gulp.src('src/js/default.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

// Copy CSS
gulp.task('copy:css', function() {
  return gulp.src(['src/css/style.css', 'src/css/style.min.css'])
    .pipe(gulp.dest('dist/css'));
});

// Copy JS
gulp.task('copy:js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
});

// Copy HTML
gulp.task('copy:html', function(){
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Copy Images
gulp.task('copy:images', function() {
  return gulp.src('src/img/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

// Clean
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// Build
gulp.task('build', ['clean'], function(){
  gulp.start(['copy:html', 'copy:css', 'copy:images', 'copy:js']);
  // notifier.notify({title: 'Buid...', message: '...done!'}, function (err, response) {
  //   console.log('Buid done!');
  // });
});

// Zip dist folder
gulp.task('zip', function () {
    return gulp.src('dist/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('.'));
});

// Watch
gulp.task('watch', function() {

  gulp.watch('src/css/*.css', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['src/*.html', 'src/js/**/*.js', 'src/css/*.css']).on('change', livereload.changed);

});