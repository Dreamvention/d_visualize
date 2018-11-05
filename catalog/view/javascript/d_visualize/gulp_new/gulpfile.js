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
//modified
var jsonToSass = require('gulp-json-to-sass');
var baseDir = path.resolve(__dirname, "../../../../");
var themeDir = path.join(baseDir, 'view/theme/d_visualize');
var stylesheetDir = path.join(themeDir, 'stylesheet');
var templatesDir = path.join(stylesheetDir, 'template');
var componenet_directory = path.join(stylesheetDir, 'vz-component');
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
	var folders = getFolders(componenet_directory);
	var tasks = folders.map(function (folder) {
		return gulp.src(path.join(componenet_directory, folder, '*' + '.css'))
			.pipe(sourcemaps.init())
			.pipe(postcss()).on('error', (e)=>console.log(e.message))
			.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
			.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist/vz-component', folder)))
			.pipe(gulp.dest(path.join(stylesheetDir, 'dist/vz-component', folder)))
			.pipe(browserSync.stream({match: '**/*.css'}));
	});
	return tasks;
});
gulp.task('watch:components', function () {
	var cssFiles = [];
	//any template and any skin
	cssFiles.push(path.join(componenet_directory, '**', '**', '*.*css'));
	cssFiles.push(path.join(componenet_directory, '**', '*.*css'));

	gulp.watch([cssFiles], ['postCSS:components']);
});
gulp.task('run:components', ["browser_sync_init"], function () {
	if (typeof process.env.HOST !== "undefined") {
		gulp.watch([
			baseDir + "/controller/extension/**/**/*.php",
			baseDir + "/view/template/extension/**/**/*.vue",
			baseDir + "/view/template/extension/**/**/*.twig"
		], browserSync.reload);
	}
	gulp.start(["watch:components"]);
})

/** For php support we use scss for skin templates. This function uses for dev only */
gulp.task('scss:templates', function () {
	var folders = getFolders(templatesDir);
	var tasks = [];
	folders.map(function (folderTemplate) {
		var folders_skin = getFolders(path.join(templatesDir, folderTemplate, 'skin'));
		tasks.push(folders_skin.map((skin_folder)=>{
			let path_skin = path.join(templatesDir, folderTemplate, 'skin', skin_folder);
			return gulp.src(path.join(path_skin, skin_folder + '.scss'))
				.pipe(sourcemaps.init())
				.pipe(jsonToSass({
					jsonPath: path.join(path_skin, 'config.json'),
					scssPath: path.join(path_skin, '_config.scss')
				}))
				.pipe(sass()).on('error', (e)=>console.log(e.message))
				.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
				.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(gulp.dest(path.join(stylesheetDir, 'dist', folderTemplate)))
				.pipe(browserSync.stream({match: '**/*.css'}));
		}));
	});
	return tasks;
});
gulp.task('scss:libraries', function () {
	return gulp.src([
		path.join(stylesheetDir, 'library') + '/bootstrap3/stylesheets/bootstrap.scss',
		path.join(stylesheetDir, 'library') + '/bootstrap4/scss/bootstrap-grid.scss',
	])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
		.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist','library')))
		.pipe(gulp.dest(path.join(stylesheetDir, 'dist','library')))
		.pipe(browserSync.stream({match: '**/*.css'}));
})
gulp.task('watch:templates', function () {
	var cssFiles = [];
	cssFiles.push(path.join(templatesDir, '**','skin', '**', '*.*css'));
	cssFiles.push(path.join(templatesDir, '**','skin', '**', '**', '*.*css'));
	gulp.watch([cssFiles], [ 'scss:templates']);
});
gulp.task('run:templates', ["browser_sync_init"], function () {
	if (typeof process.env.HOST !== "undefined") {
		gulp.watch([
			baseDir + "/controller/extension/**/**/*.php",
			baseDir + "/view/template/extension/**/**/*.vue",
			baseDir + "/view/template/extension/**/**/*.twig"
		], browserSync.reload);
	}
	gulp.start(["watch:templates"]);
})

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
gulp.task('postCSS:vz-core', function () {
	return gulp.src(path.join(stylesheetDir, 'vz-core', 'core' + '.css'))
		.pipe(sourcemaps.init())
		.pipe(postcss()).on('error', (e)=>console.log(e.message))
		.pipe(require('gulp-autoprefixer')({browsers: ['last 15 versions']}))
		.pipe(sourcemaps.write(path.join(stylesheetDir, 'dist', 'vz-core')))
		.pipe(gulp.dest(path.join(stylesheetDir, 'dist', 'vz-core')))
		.pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task('scripts:watch', function () {
	gulp.watch(
		scripts_src, ['scripts:core']
	);
});
gulp.task("browser_sync_init", function () {
	if (typeof process.env.HOST !== "undefined") {
		browserSync({
			proxy: process.env.HOST,
			port: 3333
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
	gulp.start(["watch:templates", "scripts:watch"]);
});