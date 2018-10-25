var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require("browser-sync");
var path = require("path");
var fs = require('fs');
var concat = require("gulp-concat");
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var pump = require('pump');
var rename = require("gulp-rename");
var baseDir = path.resolve(__dirname, "../../../../");
var themeDir = path.join(baseDir, 'view/theme/d_visualize');
var stylesheetDir = path.join(themeDir, 'stylesheet');
var templatesDir = path.join(stylesheetDir, 'template');
var compoenentDir = path.join(stylesheetDir, 'vz-component');
var scriptDir = path.join(themeDir, 'javascript');

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
	scriptDir + '/vz-core/**/*.js'
];
gulp.task('scripts:template', function (cb) {
	var folders = getFolders(scriptDir + '/template');
	var tasks = folders.map(function (folder) {
		pump([
			gulp.src(scriptDir + '/template/' + folder + '/**/*.js'),
			concat(folder + '.js'),
			babel({
				presets: ['@babel/env']
			}),
			// uglify(),
			gulp.dest(path.join(themeDir, 'javascript/dist/', folder))
		], cb);
	});
	return tasks;

});
gulp.task('scripts:core', function (cb) {
	pump([
		gulp.src(scripts_src),
		concat('core.js'),
		babel({
			presets: ['@babel/env']
		}),
		// uglify(),
		gulp.dest(path.join(themeDir, 'javascript/dist/vz-core'))
	], cb);
});
gulp.task('postCSS:components', function () {
	var folders = getFolders(compoenentDir);
	var tasks = folders.map(function (folder) {
		return gulp.src(path.join(compoenentDir, folder, '*' + '.css'))
			.pipe(sourcemaps.init())
			.pipe(postcss()).on('error', (e)=>console.log(e.message))
			.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
			.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist/vz-component', folder)))
			.pipe(gulp.dest(path.join(stylesheetDir, 'dist/vz-component', folder)))
			.pipe(browserSync.stream({match: '**/*.css'}));
	});
	return tasks;
});
gulp.task('postCSS:templates', function () {
	var folders = getFolders(templatesDir);
	var tasks = [];
	folders.map(function (folderTemplate) {
		var folders_skin = getFolders(path.join(templatesDir, folderTemplate, 'skin'));
		tasks.push(folders_skin.map((skin_folder)=>{
			let path_skin = path.join(templatesDir, folderTemplate, 'skin', skin_folder);
			return gulp.src(path.join(path_skin, skin_folder + '.css'))
				.pipe(sourcemaps.init())
				.pipe(postcss({skin: skin_folder, path: path_skin})).on('error', (e)=>console.log(e.message))
				.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
				.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(gulp.dest(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(browserSync.stream({match: '**/*.css'}));
		}));
	});
	return tasks;
});
/*
* For php support we use scss for skin templates. This function uses for dev only */
gulp.task('scssCSS:templates', function () {
	var folders = getFolders(templatesDir);
	var tasks = [];
	folders.map(function (folderTemplate) {
		var folders_skin = getFolders(path.join(templatesDir, folderTemplate, 'skin'));
		tasks.push(folders_skin.map((skin_folder)=>{
			let path_skin = path.join(templatesDir, folderTemplate, 'skin', skin_folder);
			return gulp.src(path.join(path_skin, skin_folder + '.scss'))
				.pipe(sourcemaps.init())
				.pipe(sass()).on('error', (e)=>console.log(e.message))
				.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
				.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(gulp.dest(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(browserSync.stream({match: '**/*.css'}));
		}));
	});
	return tasks;
});
gulp.task('postCSS:vz-core', function () {
	return gulp.src(path.join(stylesheetDir, 'vz-core', 'core' + '.css'))
		.pipe(sourcemaps.init())
		.pipe(postcss()).on('error', (e)=>console.log(e.message))
		.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
		.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', 'vz-core')))
		.pipe(gulp.dest(path.join(stylesheetDir, 'dist', 'vz-core')))
		.pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task('CSS:watch', function () {
	var cssFiles = [];
	cssFiles.push(path.join(templatesDir, '**','skin', '**', '*.*css'));
	cssFiles.push(path.join(templatesDir, '**','skin', '**', '**', '*.*css'));

	cssFiles.push(path.join(compoenentDir, '**', '**', '*.*css'));
	cssFiles.push(path.join(compoenentDir, '**', '*.*css'));

	cssFiles.push(path.join(stylesheetDir, 'vz-core', '**', '*.*css'));
	cssFiles.push(path.join(stylesheetDir, 'vz-core', '*.*css'));

	gulp.watch([cssFiles], ['postCSS:vz-core', 'postCSS:templates', 'postCSS:components']);
});
gulp.task('scripts:watch', function () {
	gulp.watch(
		scripts_src, ['scripts:core']
	);
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
	gulp.start(["CSS:watch", "scripts:watch"]);
});