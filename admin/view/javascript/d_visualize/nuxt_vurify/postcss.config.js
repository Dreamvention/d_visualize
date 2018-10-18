module.exports = function () {
	return {
		plugins: [
			require('postcss-custom-properties')({
				preserve: false,
				importFrom: './constants/colors.js'
			}),
		],
		options: {}
	};
};