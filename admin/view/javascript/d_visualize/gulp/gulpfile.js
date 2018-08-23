var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var stripCssComments = require('gulp-strip-css-comments');
var browserSync = require("browser-sync");
var path = require("path");

var sassDest = '../../../stylesheet/d_visualize/';

var baseDir = path.resolve(__dirname, "../../../../");

gulp.task('sass', function () {
    return gulp.src(sassDest + '*.scss')

        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(stripCssComments({preserve: false}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(sassDest))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', function () {
    gulp.watch([sassDest + '*.scss', sassDest + '**/*.scss'], ['sass']);
});
gulp.task("browser_sync_init", function () {
    if (typeof process.env.HOST !== "undefined") {
        browserSync({
            proxy: process.env.HOST
        });
    }
})
gulp.task('default', ["browser_sync_init"], function () {
    if (typeof process.env.HOST !== "undefined") {
        gulp.watch([
            baseDir + "/controller/extension/**/**/*.php",
            baseDir + "/view/template/extension/**/**/*.vue",
            baseDir + "/view/template/extension/**/**/*.twig"
        ], browserSync.reload);
    }
    gulp.start(["sass", "sass:watch"]);
})