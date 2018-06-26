var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

// Обновление страниц сайта на локальном сервере
gulp.task('browser-sync', function () {
	browserSync({
		proxy: 'http://localhost/302/d_visualize/'
	});
});
// will compille styles in dark and light folders
gulp.task('sass-core', function () {
	return gulp.src('stylesheet/core/stylesheet.s*ss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('stylesheet/core/'))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('sass-bots3', function () {
	return gulp.src('stylesheet/core/lib/bootstrap3/stylesheets/bootstrap.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 15 versions"]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('stylesheet/core/lib/bootstrap3/stylesheets/'))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('sass-bots4g', function () {
	return gulp.src('stylesheet/core/lib/bootstrap4/scss/bootstrap-grid.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 15 versions"]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('stylesheet/core/lib/bootstrap4/'))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('sass', function () {
	return gulp.src('stylesheet/skin/**/stylesheet.s*ss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 15 versions"]
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('stylesheet/skin/'))
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('sass_dev_jag', function () {
	return gulp.src('stylesheet/skin/jag/zhenia_latest/d_visualize_skin/d_default_skin.sass')
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('stylesheet/skin/'))
		.pipe(browserSync.reload({stream: true}));
});
// Наблюдение за файлами
gulp.task('watch', [ 'browser-sync','sass'], function () {
	gulp.watch('stylesheet/core/**/**/*.s*ss', ['sass-core']);
	gulp.watch('stylesheet/skin/**/**/*.s*ss', ['sass']);
	gulp.watch('template/**/*.**', browserSync.reload);
	gulp.watch('../../controller/**/*.**', browserSync.reload);
	gulp.watch('../../../controller/**/**/*.**', browserSync.reload);
});

gulp.task('default', ['watch']);