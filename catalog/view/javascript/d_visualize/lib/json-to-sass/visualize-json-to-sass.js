'use strict';
var gutil = require('../../gulp/node_modules/gulp-util');
var through = require('../../gulp/node_modules/through2');
var fileStream = require('fs');
var jsonToSass = require('./json-to-sass');
var _ = require('../../gulp/node_modules/lodash');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-json-to-sass', 'Streaming not supported'));
			return;
		}



		try {
			var jsonData = fileStream.readFileSync(options.jsonPath);
			var scss = jsonToSass(jsonData);

			fileStream.writeFileSync(options.scssPath, scss);

			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-temp', err));
		}

		cb();
	});
};
