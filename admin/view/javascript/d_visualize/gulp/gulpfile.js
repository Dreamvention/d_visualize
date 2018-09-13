var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync");
var path = require("path");
var concat = require("gulp-concat");
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var sassDest = '../../../stylesheet/d_visualize/';
var scriptDest = '../';

var baseDir = path.resolve(__dirname, "../../../../");
if (typeof process.env.HOST === "undefined") {
	process.env.HOST = 'localhost';
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
gulp.task('postCSS', function () {
	const postcss = require('gulp-postcss');
	return gulp.src(sassDest + '*.pcss')
		.pipe(sourcemaps.init())
		.pipe(postcss()).on('error', (e)=>console.log(e.message))
		.pipe(require('gulp-autoprefixer')({ browsers : ['last 15 versions'] }))
		.pipe(rename((path)=>{
			path.extname = ".css";
		}))
		.pipe(sourcemaps.write(sassDest + '/dist'))
		.pipe(gulp.dest(sassDest + '/dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:watch', function () {
	gulp.watch([sassDest + '*.scss', sassDest + '**/*.*'], ['postCSS']);
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
	gulp.start(["postCSS", "sass:watch", "scripts", "scripts:watch"]);
});