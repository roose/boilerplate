
const fs = require('fs');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const easyImport = require('postcss-easy-import');
const precss = require('precss');
const csswring = require('csswring');
const del = require('del');

const $ = require('gulp-load-plugins')();

// Getting project settings from config.json
let config = require('./config.json');
let dirs = config.dirs;
let lists = getFilesList(config);

// Generate and write style.pcss, which is compiled into style.min.css
// let styleImports = styleFileMsg;
let styleImports = '';
lists.css.forEach(function(blockPath) {
  styleImports += '@import \''+blockPath+'\';\n';
});
styleImports = styleImports;
// styleImports = styleImports += styleFileMsg;
fs.writeFileSync(dirs.srcPath + 'pcss/style.pcss', styleImports);

// Generate and write mixins (mixins.pug) with all blocks pug-files includes
// let pugMixins = '//- ВНИМАНИЕ! Этот файл генерируется автоматически. Не пишите сюда ничего вручную!\n//- Читайте ./README.md для понимания.\n\n';
let pugMixins = '';
lists.pug.forEach(function(blockPath) {
  pugMixins += 'include '+blockPath+'\n';
});
fs.writeFileSync(dirs.srcPath + 'pug/mixins.pug', pugMixins);

// Dev or not dev
// Run `NODE_ENV=production npm start [task]` will assembly without sourcemaps
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

// List of postCSS plugins
let postCssPlugins = [
  easyImport({ prefix: '_', extensions: ['.css', '.pcss'] }),
  precss,
  autoprefixer({ browsers: ['> 1%', 'last 2 versions'] }),
  !isDev ? csswring : false
].filter(Boolean);

// Errors handling and notify
const shitHappens = function(err) {
  $.notify.onError('Error: <%= error.message %>')(err);
  this.emit('end');
};

// autoprefix, precss css files and sourcemap
gulp.task('style', () => {
  return gulp.src(dirs.srcPath + 'pcss/style.pcss')
    .pipe($.plumber({ errorHandler:shitHappens }))
    .pipe($.if(isDev, $.sourcemaps.init()))
    .pipe($.postcss(postCssPlugins))
    .pipe($.rename('style.min.css'))
    .pipe($.if(isDev, $.sourcemaps.write('/')))
    .pipe(gulp.dest(dirs.buildPath + '/css'));
});

gulp.task('copy:js', (callback) => {
  return gulp.src(config.copiedJs)
    .pipe(gulp.dest(dirs.buildPath + '/js'));
});

// minify main.js
gulp.task('js', () => {
  return gulp.src(lists.js)
    .pipe($.plumber({errorHandler:shitHappens}))
    .pipe($.concat('script.min.js'))
    .pipe($.if(!isDev, $.uglify().on('error', function(e){console.log(e);})))
    .pipe(gulp.dest(dirs.buildPath + '/js'));
});

// Copy and optimize images
gulp.task('img', () => {
  return gulp.src(lists.img)
    .pipe($.changed(dirs.buildPath + '/img'))
    .pipe($.if(!isDev, $.imagemin([
      $.imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { removeHiddenElems: false },
          { removeUselessDefs: false },
          { cleanupIDs: false }
        ]
      }),
      $.imagemin.gifsicle({ interlaced: true }),
      $.imagemin.jpegtran({ progressive: true }),
      $.imagemin.optipng({ optimizationLevel: 3 })
    ])))
    .pipe(gulp.dest(dirs.buildPath + '/img'));
});

// SVG sprite
let spriteSvgPath = dirs.srcPath + dirs.blocksDirName + '/svg-sprite/svg/';
gulp.task('icons', () => {
  return gulp.src(spriteSvgPath + '*.svg')
    .pipe($.plumber({ errorHandler:shitHappens }))
    .pipe($.svgSymbols({
      title: false,
      id: 'icon_%f',
      class: '.%f',
      templates: [
        'default-svg'
      ]
    }))
    .pipe($.imagemin([
      $.imagemin.svgo({
        plugins: [
          { removeHiddenElems: false },
          { removeUselessDefs: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe($.rename('icons.svg'))
    .pipe(gulp.dest(dirs.srcPath + dirs.blocksDirName + '/svg-sprite/img/'));
});

// Copy fonts
gulp.task('copy:fonts', () => {
  return gulp.src(dirs.srcPath + '/fonts/*.{ttf,woff,woff2,eot,svg}')
    .pipe($.changed(dirs.buildPath + '/fonts'))
    .pipe(gulp.dest(dirs.buildPath + '/fonts'));
});

// Build Pug
gulp.task('pug', () => {
  return gulp.src(dirs.srcPath + '*.pug')
    .pipe($.plumber({ errorHandler:shitHappens }))
    // .pipe($.changed('./dist/'))
    .pipe($.pug())
    .pipe($.htmlBeautify())
    .pipe($.replace(/^(\s*)(<header.+?>)(.*)(<\/header>)/gm, '$1$2\n$1  $3\n$1$4'))
    .pipe($.replace(/^(\s*)(<footer.+?>)(.*)(<\/footer>)/gm, '$1$2\n$1  $3\n$1$4'))
    .pipe($.replace(/^\s*<section.+>/gm, '\n$&'))
    .pipe($.replace(/^\s*<\/section>/gm, '$&\n'))
    .pipe($.replace(/^\s*<article.+>/gm, '\n$&'))
    .pipe($.replace(/^\s*<\/article>/gm, '$&\n'))
    .pipe($.replace(/\n\n\n/gm, '\n\n'))
    .pipe(gulp.dest(dirs.buildPath));
});

// Clean, delete dist folder
gulp.task('clean', () => {
  return del(dirs.buildPath);
});

// Build
gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel('style', 'img', 'icons', 'copy:js', 'js', 'copy:fonts', 'pug')
  )
);

const correctNumber = number => number < 10 ? '0' + number : number;

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = correctNumber(now.getMonth() + 1);
  const day = correctNumber(now.getDate());
  const hours = correctNumber(now.getHours());
  const minutes = correctNumber(now.getMinutes());

  return `${year}-${month}-${day}-${hours}${minutes}`;
};

// Pack dist folder to `pkg.name`.zip
gulp.task('zip', () => {
  const datetime = getDateTime();
  const zipName = pkg.name + '-' + datetime + '.zip';

  return gulp.src(dirs.buildPath)
    .pipe($.zip(zipName))
    .pipe(gulp.dest('.'));
});

// Watch task
gulp.task('watch', () => {

  let stylePaths = [
    dirs.srcPath + 'pcss/style.pcss',
    dirs.srcPath + 'pcss/vars.pcss',
    dirs.srcPath + 'pcss/mixins/*.pcss',
  ];

  for (let i = 0, len = lists.blocksDirs.length; i < len; ++i) {
    stylePaths.push(dirs.srcPath + lists.blocksDirs[i] + '*.pcss');
  }
  stylePaths.concat(config.addCssBefore, config.addCssAfter);

  $.watch(stylePaths, gulp.series('style'));

  if(config.copiedJs.length) {
    $.watch(config.copiedJs, gulp.series('copy:js'));
  }
  if(lists.js.length) {
    $.watch(lists.js, gulp.series('js'));
  }

  let pugPaths = [
    dirs.srcPath + '*.pug',
    dirs.srcPath + 'pug/*.pug',
  ];
  for (let i = 0, len = lists.blocksDirs.length; i < len; ++i) {
    pugPaths.push(dirs.srcPath + lists.blocksDirs[i] + '*.pug');
  }
  if(lists.pug.length) {
    gulp.watch(pugPaths, gulp.series('pug'));
  }

  $.watch(dirs.srcPath + 'fonts/*.{ttf,woff,woff2,eot,svg}', gulp.series('copy:fonts'));

  if(lists.img.length) {
    $.watch(lists.img, gulp.series('img'));
  }

  $.watch('*.svg', {cwd: spriteSvgPath}, gulp.series('icons'));

  browserSync.init({
    files:   ['./build/**/*', '!dist/**/*.map'],
    server: dirs.buildPath,
    open:    'external',
    notify:  false,
    ui:      false,
    startPath: 'index.html',
  });

});

gulp.task('default',
  gulp.series('watch')
);

/**
 * Вернет объект с обрабатываемыми файлами и папками
 * @param  {object}
 * @return {object}
 */
function getFilesList(cfg){

  let res = {
    'css': [],
    'js': [],
    'img': [],
    'pug': [],
    'blocksDirs': [],
  };

  // Обходим массив с блоками проекта
  for (let blockName in cfg.blocks) {
    var blockPath = cfg.dirs.srcPath + cfg.dirs.blocksDirName + '/' + blockName + '/';

    if(fs.existsSync(blockPath)) {

      // Разметка (Pug)
      if(fs.existsSync(blockPath + blockName + '.pug')){
        res.pug.push('../' + cfg.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.pug');
        // TODO переделать так, чтобы можно было использовать в вотчере
      }
      else {
        console.log('---------- Блок ' + blockName + ' указан как используемый, но не имеет pug-файла.');
      }

      // Стили
      if(fs.existsSync(blockPath + blockName + '.pcss')){
        // res.css.push(blockPath + blockName + '.pcss');
        res.css.push('../' + cfg.dirs.blocksDirName + '/' + blockName + '/' + blockName + '.pcss');
        if(cfg.blocks[blockName].length) {
          cfg.blocks[blockName].forEach(function(elementName) {
            if(fs.existsSync(blockPath + blockName + elementName + '.pcss')){
              // res.css.push('../' + blocksDirName + blockName + elementName + '.pcss');
              res.css.push(blockPath + blockName + elementName + '.pcss');
            }
          });
        }
      }
      else {
        console.log('---------- Блок ' + blockName + ' указан как используемый, но не имеет pcss-файла.');
      }

      // Скрипты
      if(fs.existsSync(blockPath + blockName + '.js')){
        res.js.push(blockPath + blockName + '.js');
        if(cfg.blocks[blockName].length) {
          cfg.blocks[blockName].forEach(function(elementName) {
            if(fs.existsSync(blockPath + blockName + elementName + '.js')){
              res.js.push(blockPath + blockName + elementName + '.js');
            }
          });
        }
      }
      else {
        // console.log('---------- Блок ' + blockName + ' указан как используемый, но не имеет JS-файла.');
      }

      // Картинки (тупо от всех блоков, без проверки)
      res.img.push(cfg.dirs.srcPath + cfg.dirs.blocksDirName + '/' + blockName + '/img/*.{jpg,jpeg,gif,png,svg}');

      // Список директорий
      res.blocksDirs.push(cfg.dirs.blocksDirName + '/' + blockName + '/');

    }
    else {
      console.log('ERR ------ Блок ' + blockPath + ' указан как используемый, но такой папки нет!');
    }

  }

  // Добавления
  res.css = res.css.concat(cfg.addCssAfter);
  res.css = cfg.addCssBefore.concat(res.css);
  res.js = res.js.concat(cfg.addJsAfter);
  res.js = cfg.addJsBefore.concat(res.js);
  res.img = cfg.addImages.concat(res.img);

  return res;
}
