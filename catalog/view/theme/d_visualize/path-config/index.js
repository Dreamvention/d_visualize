let appRoot = require('app-root-path');
let appRootBase = appRoot.path;
let appPath = '';
appRoot.path = appPath;
appPath = {
    src: {
        twig: ['./template/**/*.twig'],
        sass: './stylesheet/d_visualize_core/d_visualize_core.sass',
        script: ['./javascript/d_visualize/**/*.js'],
        skinJs: appRootBase + "\\javascript\\d_visualize_skin\\",
        skinCss: appRootBase + "\\stylesheet\\d_visualize_skin\\"
        // font: ['./font/**/*.*'],
        // image: ['./image/']
    },
    dist: {
        // css: './stylesheet/',
        // cssCore:'./stylesheet/d_visualize_core',
        // cssSkin:'./stylesheet/d_visualize_skin/d_dreamvention',
        css: './stylesheet/d_visualize_core',
        script: './javascript/d_visualize/d_visualize.js',
        // font: './dist/public/fonts/',
        // image: './dist/public/image/'
    }
}

// let getBaseRoot = () => {
//     appRoot.path = {
//         src: {
//             twig: ['./template/**/*.twig'],
//             sass: './stylesheet/d_visualize_core/d_visualize_core.sass',
//             script: ['./javascript/d_visualize/**/*.js'],
//             // font: ['./font/**/*.*'],
//             // image: ['./image/']
//         },
//         dist: {
//             // css: './stylesheet/',
//             // cssCore:'./stylesheet/d_visualize_core',
//             // cssSkin:'./stylesheet/d_visualize_skin/d_dreamvention',
//             css: './stylesheet/d_visualize_core',
//             script: './javascript/d_visualize/d_visualize.js',
//             // font: './dist/public/fonts/',
//             // image: './dist/public/image/'
//         }
//     };
// };

// let getSkinRoot = () => ({
//     js: appRoot.path + "\\javascript\\d_visualize_skin\\",
//     css: appRoot.path + "\\stylesheet\\d_visualize_skin\\"
// });

// module.export = {
//     basePath: getBaseRoot(),
//     skinPath: getSkinRoot
// };

module.exports = appPath;