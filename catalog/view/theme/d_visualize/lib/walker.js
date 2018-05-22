let mix = require('laravel-mix');
let appRoot = require('app-root-path');
let pathConfig = require('../path-config/');
let _ = require('lodash');
const fs = require('fs');
let glob = require('glob');

class Walker {
    constructor(dir) {
        this.dir = dir;
        this.skinRootCss = pathConfig.src.skinCss;
        this.skinRootJs = pathConfig.src.skinJs;
        this.outputFolderNameJs = null;
        this.outputFolderNameCss = null;
    }

    walkSync () {
        if (this.dir === this.skinRootJs) {
            this.outputFolderNameJs = [];
            this.generateFolderName();
            this.createFile(this.skinRootJs, this.outputFolderNameJs);
        }
        if (this.dir === this.skinRootCss) {
            this.outputFolderNameCss = [];
            this.generateFolderName();
            this.createFile(this.skinRootCss, this.outputFolderNameCss);
        }
    }

    generateFolderName () {
        let files = fs.readdirSync(this.dir);

        let filelist = [];
        files.forEach(function (file) {
            filelist.push(file);
        });

        filelist.forEach((dir) => {
            if (this.outputFolderNameJs) this.outputFolderNameJs.push(dir);
            if (this.outputFolderNameCss) this.outputFolderNameCss.push(dir);
        });
    }
    
    createFile (src, output) {
        let ext = '',
            pattern = '',
            method = '';

        _.map(output, (value, index) => {
            let files = [];

            if (this.outputFolderNameJs) {
                ext = '.js';
                pattern = `\\**\\*${ext}`;
                files = glob.sync(src + output[index] + pattern);
                console.log('*** COMPILING ***');

                let filteredFiles = _.filter(files, (value) => {
                    return path.parse(value).base !== output[index] + '.js';

                });
                mix.babel(filteredFiles, `${src}${output[index]}\\${output[index]}${ext}`);
            }
            if (this.outputFolderNameCss) {
                pattern = '\\**\\[a-zA-Z]*.sass';

                files = glob.sync(src + output[index] + pattern);
                mix.sass(files[0], src + output[index]);
            }
        });
    }
}

module.exports = Walker;