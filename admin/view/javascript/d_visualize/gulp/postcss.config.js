module.exports = function () {
	return {
		syntax:'postcss-scss',
		plugins: [
			require('precss')({}),
			require('autoprefixer')({}),
			require('postcss-pxtorem')({
				rootValue: 16,
				unitPrecision: 5,
				propList: ['*'],
				selectorBlackList: [],
				replace: true,
				mediaQuery: true,
				minPixelValue: 0
			}),
			require('postcss-import')({}),
			require('postcss-font-magician')({
				protocol: 'https:',
				foundries: 'bootstrap google'
			}),
		],
		options: {
		}
	}
};