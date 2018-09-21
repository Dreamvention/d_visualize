module.exports = function () {
	return {
		syntax:'postcss-scss',
		plugins: [
			require('precss')({}),
			// require('autoprefixer')({ browsers : ['last 15 versions'] }),
			require('postcss-pxtorem')({
				rootValue: 14,
				unitPrecision: 5,
				propList: ['*'],
				selectorBlackList: ['body'],
				replace: true,
				mediaQuery: true,
				minPixelValue: 0
			}),
			require('postcss-import')({}),
			require('postcss-font-magician')({
				protocol: 'https:',
				foundries: 'bootstrap google'
			}),
			// require('lost')({}),
		],
		options: {
		}
	}
};