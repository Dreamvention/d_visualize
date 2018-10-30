module.exports = function () {
	return {
		plugins: [
			require('autoprefixer')(),
			require('postcss-custom-properties')({
				preserve: false,
				importFrom: './constants/colors.js'
			}),
		],
		options: {}
	};
};