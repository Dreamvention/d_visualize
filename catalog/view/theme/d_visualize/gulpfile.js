var gulp    	     = require('gulp'),
    browserSync      = require('browser-sync'),
    reload           = browserSync.reload,
    sass    	     = require('gulp-sass'),
    changed    	     = require('gulp-changed'),
    cached    	     = require('gulp-cached'),
    autoprefixer     = require('gulp-autoprefixer'),
    rename           = require('gulp-rename'),
    uglify 	         = require('gulp-uglify'),
    notify 	         = require('gulp-notify'),
    cleanCSS 	     = require('gulp-clean-css'),
    concat   	     = require('gulp-concat');

gulp.task('browser-sync', ['styles', 'twig', 'script', 'fonts'], function() {
    browserSync({
        /*server: {
            baseDir: "/"
        },
        tunnel: true,*/
        proxy: "opencart/302/d_dreamvention_ee_live/",
        // host: 'localhost',
        port: 9000

    });
});

var path = {
    app: {
        pages:['./template/**/*.twig'],
        scss:['./stylesheet/**/*.scss'],
        // scssCore:['./stylesheet/d_visualize_core/**/*.scss'],
        // scssSkin1:['./stylesheet/d_visualize_skin/d_dreamvention/**/*.scss'],
        sass:['./stylesheet/d_visualize_core/sass/**/*.sass'],
        script:['./javascript/d_visualize/**/*.js'],
        font:['./app/fonts/**/*.*'],
        image:['./image/']
    },
    dist: {
        css:'./stylesheet/',
        // cssCore:'./stylesheet/d_visualize_core',
        // cssSkin:'./stylesheet/d_visualize_skin/d_dreamvention',
        sass:'./stylesheet/',
        script:'./javascript/',
        font:'./dist/public/fonts/',
        image:'./dist/public/image/'
    }
};

// twig live reload
gulp.task('twig', function () {
    return gulp.src(path.app.pages)
        .pipe(browserSync.stream());
});

// compile and minify scss to css
gulp.task('styles', function () {
    return gulp.src(path.app.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.dist.css))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    gulp.src(path.app.font)
        .pipe(gulp.dest(path.dist.font))
        .pipe(browserSync.stream());
});

gulp.task('script', function() {
    return gulp.src([
        './node_modules/slideout/dist/slideout.js',

        './javascript/d_visualize/checkout/checkout.js',

        './javascript/d_visualize/common/cart.js',
        './javascript/d_visualize/common/compare.js',
        './javascript/d_visualize/common/voucher.js',
        './javascript/d_visualize/common/wishlist.js',

        './javascript/d_visualize/partial/d_address_field.js',
        './javascript/d_visualize/partial/d_custom_field.js',
        './javascript/d_visualize/partial/d_product_sort.js',

        './javascript/d_visualize/product/product.js',
        './javascript/d_visualize/product/search.js',

        './javascript/d_visualize/total/coupon.js',
        './javascript/d_visualize/total/reward.js',
        './javascript/d_visualize/total/shipping.js',
        './javascript/d_visualize/total/voucher.js',

        './javascript/d_visualize/library/d_bootstrap_rating.js',

        './javascript/d_visualize/library/d_bootstrap_rating.js',
    ])
        .pipe(concat('d_visualize.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.script))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(path.app.scss, ['styles']);
    gulp.watch(path.app.pages).on('change', reload);
    gulp.watch(path.app.script, ['script']);
    gulp.watch(path.app.font).on('change', reload);
});


gulp.task('default', ['browser-sync', 'watch']);
