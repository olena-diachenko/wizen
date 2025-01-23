'use strict';
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const { src, dest, watch, series, parallel } = require('gulp');

const build = () => {
  return src(['./dist/**/**', '!./dist/scss/**']).pipe(dest('./build/'));
};

const compilingStyles = () => {
  return src('./dist/scss/index.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['node_modules'],
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer('last 3 versions'))
    .pipe(dest('./build/styles'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write(`./`))
    .pipe(dest('./build/styles'));
};

const copyVendorScripts = () => {
  return src([
    './node_modules/swiper/swiper-bundle.min.js',
  ])
    .pipe(dest('./build/js/vendor'));
};

const copyVendorStyles = () => {
  return src([
    './node_modules/swiper/swiper-bundle.css',
  ])
    .pipe(dest('./build/styles/vendor'));
};

const browserSyncJob = () => {
  browserSync.init({
    server: './build/',
  });

  watch(['./dist/**/**', '!./dist/scss/**'], build);
  watch('./dist/scss/**', compilingStyles);
  watch('./dist/index.html').on('change', browserSync.reload);
};

const buildForProduction = series(
  parallel(compilingStyles, build, copyVendorScripts, copyVendorStyles)
);

exports.develop = series(parallel(compilingStyles, build, copyVendorScripts, copyVendorStyles), browserSyncJob);

exports.build = buildForProduction;