var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var fs = require('fs');
var baseDir = path.resolve(__dirname, "../../../../");
var themeDir = path.join(baseDir, 'view/theme/d_visualize');
var sassDir = path.join(themeDir, 'stylesheet');
var scriptDir = path.join(themeDir, 'javascript');
var skinDir = path.join(sassDir, 'skin');

if (typeof process.env.HOST === "undefined") {
	process.env.HOST = 'localhost';
}
var prod = process.env.PROD;

function getFolders(dir) {
	return fs.readdirSync(dir)
		.filter(function (file) {
			return fs.statSync(path.join(dir, file)).isDirectory();
		});
}

//tascs
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
gulp.task('sass_core', function () {
	return gulp.src([
		path.join(sassDir, 'core') + '/core.scss',
		path.join(sassDir, 'core') + '/lib/bootstrap3/stylesheets/bootstrap.scss',
		path.join(sassDir, 'core') + '/lib/bootstrap4/scss/bootstrap-grid.scss',
	])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(sourcemaps.write(path.join(sassDir, 'dist')))
		.pipe(gulp.dest(path.join(sassDir, 'dist')))
		.pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task('sass_multi', function () {
	var folders = getFolders(skinDir);
	var tasks = folders.map(function (folder) {
		return gulp.src(path.join(skinDir, folder, folder + '.s*ss'))
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(path.join(sassDir, 'dist', folder)))
			.pipe(browserSync.stream({match: '**/*.css'}));
	});
	return tasks;
});
gulp.task('sass-ajax_filter', function () {
	return gulp.src('stylesheet/extension/skin/**/d_ajax_filter/d_ajax_filter.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 15 versions"]
		}))
		.pipe(gulp.dest('stylesheet/extension/skin'))
		.pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task("core-scripts", function () {
	return gulp.src([
		"javascript/core/checkout/checkout.js",
		"javascript/core/common/cart.js",
		"javascript/core/common/compare.js",
		"javascript/core/common/voucher.js",
		"javascript/core/common/wishlist.js",
		"javascript/core/partial/d_address_field.js",
		"javascript/core/partial/d_custom_field.js",
		"javascript/core/partial/d_product_sort.js",
		"javascript/core/product/product.js",
		"javascript/core/product/search.js",
		"javascript/core/total/coupon.js",
		"javascript/core/total/reward.js",
		"javascript/core/total/shipping.js",
		"javascript/core/total/voucher.js",
		"javascript/core/common/common.js",
	])
		.pipe(concat("d_visualize.js"))
		.pipe(gulp.dest('javascript/core'));
});
gulp.task("skin-jag-scripts", function () {
	return gulp.src([
		"javascript/skin/jag/visualize_controls.js",
	])
		.pipe(concat("jag.js"))
		.pipe(gulp.dest('javascript/skin/jag'));
});
gulp.task('sass:watch', function () {

	gulp.watch([skinDir + '/*.s*ss', skinDir + '/**/*.*'], ['sass_multi']);
	gulp.watch([sassDir + '/core/core.s*ss', sassDir + '/core/**/*.*'], ['sass_core']);
});
gulp.task('scripts:watch', function () {
	// gulp.watch(
	// 	scripts_src, ['scripts']
	// );
	gulp.watch(scriptDir + '/dist/**/*.js', browserSync.reload);
});
gulp.task("browser_sync_init", function () {
	browserSync({
		proxy: process.env.HOST
	});
});


gulp.task('default', ["browser_sync_init"], function () {
	gulp.watch([
		baseDir + "/controller/extension/**/**/*.php",
		baseDir + "/view/template/extension/**/**/*.vue",
		baseDir + "/view/template/extension/**/**/*.twig"
	], browserSync.reload);
	gulp.start(["sass_core", "sass_multi", "sass:watch"]);
});
