var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var path = require("path");
var fs = require('fs');
var concat = require("gulp-concat");
// var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
// var pump = require('pump');
var rename = require("gulp-rename");
var baseDir = path.resolve(__dirname, "../../../../");
var themeDir = path.join(baseDir, 'view/theme/d_visualize');
var stylesheetDir = path.join(themeDir, 'stylesheet');
var scriptDir = path.join(themeDir, 'javascript');
var scriptDest = '../';
var templatesDir = path.join(stylesheetDir, 'template');
var compoenentDir = path.join(stylesheetDir, 'vz-component');

if (typeof process.env.HOST === "undefined") {
    process.env.HOST = 'localhost';
}

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

var scripts_src = [
    scriptDest + 'main.js',
    scriptDest + 'actions/*.js',
    scriptDest + 'components/*.js',
    scriptDest + 'components/**/*.js',
    scriptDest + 'elements/*.js',
    scriptDest + 'elements/**/*.js',
    scriptDest + 'getters/*.js',
    scriptDest + 'mutations/*.js',
    scriptDest + 'mutations/**/*.js',
    scriptDest + 'routes/*.js',
    scriptDest + 'routes/**/*.js',
    scriptDest + 'page/*.js',
    scriptDest + 'page/**/*.js'
];
gulp.task('scripts', function (cb) {
    pump([
        gulp.src(scripts_src),
        concat('d_visualize.js'),
        babel({
            presets: ['@babel/env']
        }),
        // uglify(),
        gulp.dest(scriptDest + 'dist')
    ], cb);
});
gulp.task('postCSS:components', function () {
    var folders = getFolders(compoenentDir);
    var tasks = folders.map(function (folder) {
        return gulp.src(path.join(compoenentDir, folder, '*' + '.css'))
            .pipe(sourcemaps.init())
            .pipe(postcss()).on('error', (e) => console.log(e.message))
            .pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
            .pipe(sourcemaps.write(path.join(stylesheetDir, 'dist/component', folder)))
            .pipe(gulp.dest(path.join(stylesheetDir, 'dist/component', folder)))
            .pipe(browserSync.stream({match: '**/*.css'}));
    });
    return tasks;
});
gulp.task('postCSS', function () {
    var folders = getFolders(templatesDir);
    var tasks = folders.map(function (folder) {
        return gulp.src(path.join(templatesDir, folder, folder + '.css'))
            .pipe(sourcemaps.init())
            .pipe(postcss()).on('error', (e) => console.log(e.message))
            .pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
            .pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', folder)))
            .pipe(gulp.dest(path.join(stylesheetDir, 'dist', folder)))
            .pipe(browserSync.stream({match: '**/*.css'}));
    });

    return tasks;
});

gulp.task('CSS:watch', function () {
    var cssFiles = [];
    cssFiles.push(path.join(templatesDir, '**', '**', '*.css'))
    cssFiles.push(path.join(templatesDir, '**', '**', '**', '*.css'))

    cssFiles.push(path.join(compoenentDir, '**', '**', '*.css'))
    cssFiles.push(path.join(compoenentDir, '**', '*.css'))

    gulp.watch([cssFiles], ['postCSS']);
});
gulp.task('scripts:watch', function () {
    gulp.watch(
        scripts_src, ['scripts']
    );
    gulp.watch(scriptDest + 'dist/**/*.js', browserSync.reload);
});
gulp.task("browser_sync_init", function () {
    if (typeof process.env.HOST !== "undefined") {
        browserSync({
            proxy: process.env.HOST
        });
    }
});

gulp.task('default', ["browser_sync_init"], function () {
    if (typeof process.env.HOST !== "undefined") {
        gulp.watch([
            baseDir + "/controller/extension/**/**/*.php",
            baseDir + "/view/template/extension/**/**/*.vue",
            baseDir + "/view/template/extension/**/**/*.twig"
        ], browserSync.reload);
    }
    gulp.start(["postCSS", "CSS:watch"]);
});