module.exports = function () {
	return {
		syntax:'postcss-scss',
		plugins: [
			require('precss')({}),
			require('autoprefixer')({ browsers : ['last 15 versions'] }),
			require('postcss-pxtorem')({
				rootValue: 10,
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
			require('lost')({}),
		],
		options: {
		}
	}
};