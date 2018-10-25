module.exports = function (data) {
	console.log(data.options.skin)
	console.log(data.options.path_skin)
	return {
		syntax:'postcss-scss',
		plugins: [
			require('precss')({
				variables: {
					'site-width': '960px'
				}
			}),

			require('postcss-import')({
				plugins: ['precss']
			}),
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