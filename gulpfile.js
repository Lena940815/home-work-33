const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer").default;
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

const paths = {
  scss: "src/scss/styles_v2.scss",
  css: "docs/css",
  html: "src/*.html",
  images: "src/images/**/*",
  staticCss: "src/reset.css",
  dist: "docs",
};

function styles() {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css));
}

function html() {
  return gulp.src(paths.html).pipe(gulp.dest(paths.dist));
}

function images() {
  return gulp.src(paths.images).pipe(gulp.dest("docs/images"));
}

function staticCss() {
  return gulp.src(paths.staticCss).pipe(gulp.dest(paths.dist));
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./docs",
    },
  });
}

function watchFiles() {
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.html, html);
  gulp.watch(paths.images, images);
  gulp.watch(paths.staticCss, staticCss);
  gulp.watch("docs/**/*").on("change", browserSync.reload);
}

exports.styles = styles;
exports.html = html;
exports.images = images;
exports.staticCss = staticCss;
exports.server = server;
exports.watchFiles = watchFiles;
exports.default = gulp.series(
  html,
  styles,
  images,
  staticCss,
  gulp.parallel(server, watchFiles),
);
