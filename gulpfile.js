var gulp = require('gulp');
var browserSync = require('browser-sync');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var csswring = require('csswring');
var del = require('del');

var $ = require('gulp-load-plugins')();
var pkg = require('./package.json')

var paths = {
  css:   './src/css/main.css',
  img:   './src/img/**/*.{jpg,png,svg,gif}',
  js:    './src/js/main.js',
  fonts: './src/fonts/**/*'
};

// errors handling and notify
var shitHappens = function(err) {
  $.notify.onError("Error: <%= error.message %>")(err);
  this.emit('end');
};

// autoprefix, precss css files and sourcemap
gulp.task('css', function() {
  var processors = [
      autoprefixer({ browsers: ['> 1%', 'ie >= 9'] }),
      precss
  ];
  return gulp.src(paths.css)
    .pipe($.plumber({ errorHandler:shitHappens }))
    .pipe($.sourcemaps.init() )
    .pipe($.postcss(processors))
    .pipe($.sourcemaps.write('.', {sourceRoot: './src'}))
    .pipe(gulp.dest('./dist/css/'));
});

// autoprefix, precss css files and minify
gulp.task('build:css', function() {
  var processors = [
      autoprefixer({ browsers: ['> 1%', 'ie >= 9'] }),
      precss,
      csswring
  ];
  return gulp.src(paths.css)
    .pipe($.plumber({ errorHandler:shitHappens }))
    .pipe($.postcss(processors))
    .pipe(gulp.dest('./dist/css/'));
});

// minify main.js
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe($.plumber({errorHandler:shitHappens}))
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// Copy and optimize images
gulp.task('img', function() {
  return gulp.src(paths.img)
    .pipe($.changed('./dist/img/'))
    .pipe($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./dist/img/'));
});

// Copy fonts
gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/fonts/'));
});

// Copy html
gulp.task('html', function() {
  return gulp.src('./src/*.html')
    .pipe($.changed('./dist/'))
    .pipe(gulp.dest('./dist/'));
});

// Clean, delete dist folder
gulp.task('clean', function() {
  return del('./dist');
});

// Build
gulp.task('build', ['clean'], function(){
  gulp.start(['build:css', 'img', 'js', 'fonts', 'html']);
});

// Pack dist folder to `pkg.name`.zip
gulp.task('zip', function () {
  return gulp.src(['./dist/**/*'])
    .pipe($.zip(pkg.name + '.zip'))
    .pipe(gulp.dest('.'));
});

// Watch task
gulp.task('watch', ['css', 'img', 'js', 'fonts', 'html'], function() {

  $.watch('./src/css/**/*.css', function(){
    gulp.start('css')
  });

  $.watch('./src/js/**/*.js', function(){
    gulp.start('js')
  });

  $.watch('./src/*.html', function(){
    gulp.start('html');
  });

  $.watch(paths.fonts, function(){
    gulp.start('fonts')
  });

  $.watch(paths.img, function(){
    gulp.start('img')
  });

  browserSync.init({
    files:   ['./dist/**/*', '!dist/**/*.map'],
    open:    'external',
    notify:  false,
    ui:      false,
    server:  {
      baseDir: "./dist"
    }
  });

});