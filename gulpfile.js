/* File: gulpfile.js */

/* ========== Paths ========== */

var srcSCSS = './_source/scss/**/*.{scss,sass}',
    srcJS = './_source/js/scripts/**/*.js',

    destHTML = './',
    destJS = './js',
    destCSS = './css',


/* ========== Modules ========== */

    // Gulp
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gutil = require('gulp-util'),

    // SCSS
    sass = require('gulp-sass'),
    uglifycss = require('gulp-uglifycss'),

    // Javascript


    // Post CSS
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    // Utilities
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    plugins = gulpLoadPlugins();

/* ========== Pipelines ========== */

// Javascript Libs Pipeline
gulp.task('jsLibs', function(done){

  gulp.src(
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/js/*.js'
  )
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(destJS))
    .pipe(rename('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destJS));
  done();

});

// Javascript Functions Pipeline
gulp.task('js', function(done){

  gulp.src(srcJS)
    // .pipe(concat('scripts.js'))
    .pipe(gulp.dest(destJS))
    // .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destJS))
    .pipe(plugins.livereload());
  done();

});

// SCSS Pipeline
gulp.task('sass', function(done){

  var pluginsPostCSS = [
    autoprefixer({browsers: ['last 1 version']})
  ];

  gulp.src(srcSCSS)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(postcss(pluginsPostCSS))
    .pipe(uglifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destCSS))
    .pipe(plugins.livereload());
  done();

});

/* ========== Watch ========== */

gulp.task('default', function(done){

  plugins.livereload.listen();

  gulp.watch(srcSCSS, gulp.series('sass'));
  gulp.watch(srcJS, gulp.series('js'));

  gulp.watch('./_source/js/libs/**/*.{js}', gulp.series('jsLibs'));

  done();

});
