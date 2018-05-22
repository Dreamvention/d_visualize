let mix = require('laravel-mix');
let glob = require("glob");
const fs = require('fs');
let _ = require('lodash');
let appRoot = require('app-root-path');
let Walker = require('./lib/walker');
let pathConfig = require('./path-config/');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var exec = require('child_process').exec;

function WebpackShellPlugin(options) {
    var defaultOptions = {
        onBuildStart: [],
        onBuildEnd: []
    };

    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler) {
    const options = this.options;

    compiler.plugin("compilation", function (compilation) {
        if (options.onBuildStart.length) {
            walkAndRemoveSync(pathConfig.src.skinJs);
            walkAndRemoveSync(pathConfig.src.skinCss);
            preCleaning(pathConfig.dist.script);
        }
    });
};

mix.webpackConfig({
    plugins: [
        new WebpackShellPlugin({
            onBuildStart: ['echo "hello world"']
        })
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: mix.config.babel()
            }]
        }]
    }
});

mix.browserSync({proxy:'http://visualize.com/', files: [
        'stylesheet/**/*',
        'template/**/*'
    ]})
    .options({
        processCssUrls: false
    });

/*
 * @file path to the file
 */
let preCleaning = function (file) {
    if (fs.existsSync(file)) {
        fs.unlink(file);
    }
};

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

/*
 * Search for a child of skin folder
 * and concat .js
 * @dir = skinRoot = appRoot.path + "\\javascript\\d_visualize_skin\\"
 */


let walkAndRemoveSync = function (dir, filelist) {
    if (dir === this.skinRootJs) {
        var isJsDir = true;
    }
    if (dir === this.skinRootCss) {
        var isCssDir = true;
    }

    let files = fs.readdirSync(dir);

    filelist = filelist || [];
    files.forEach(function (file) {
        filelist.push(file);
    });

    filelist.forEach(function (dir) {
        let outputFileNameJs = dir + ".js";
        let outputFileNameCss = dir + ".css";

        if (isJsDir !== undefined) {
            var files = glob.sync(skinRootJs + dir + "\\**\\*.js");
            preCleaning(skinRootJs + dir + "\\" + outputFileNameJs);
        }
        if (isCssDir !== undefined) {

            var files = glob.sync(skinRootCss + dir + "\\**\\[a-zA-Z]*.sass");

            preCleaning(skinRootCss + dir + "\\" + outputFileNameCss);
            // mix.sass(files[0], skinRootCss + dir);
        }
    });

};

let newWalkJs = new Walker(pathConfig.src.skinJs);
newWalkJs.walkSync();
// walker.walkSync(pathConfig.src.skinJs);

/*
 * Search for the d_visualize core
 *  and concat .js
 */
preCleaning(pathConfig.dist.script);
//
// walkSync(skinRootCss);
let newWalkCss = new Walker(pathConfig.src.skinCss);
newWalkCss.walkSync();
//
// if (process.env.NODE_ENV !== 'development') {
mix.babel(pathConfig.src.script, pathConfig.dist.script);
// }
preCleaning("./styles/d_visualize/d_visualize_core.css");
mix.sass(pathConfig.src.sass, pathConfig.dist.css);
//     mix.sass('D:\\OpenServer\\OpenServer\\domains\\opencart\\302\\d_dreamvention_ee_webpack\\catalog\\view\\theme\\d_visualize\\stylesheet\\d_visualize_skin\\d_default\\d_default_skin.sass', 'D:\\OpenServer\\OpenServer\\domains\\opencart\\302\\d_dreamvention_ee_webpack\\catalog\\view\\theme\\d_visualize\\stylesheet\\d_visualize_skin\\d_default\\');

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
