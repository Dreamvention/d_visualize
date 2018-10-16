const pkg = require('./package');
require('dotenv').config();

const polyfills = [
	'Promise',
	'Object.assign',
	'Object.values',
	'Array.prototype.find',
	'Array.prototype.findIndex',
	'Array.prototype.includes',
	'String.prototype.includes',
	'String.prototype.startsWith',
	'String.prototype.endsWith'
];
let isDev = process.env.DEV === 'true';
let modules = [
	// Doc: https://github.com/nuxt-community/axios-module#usage
	'@nuxtjs/axios',
	'@nuxtjs/proxy' // OFF on dev

];
let dev_server = "http://localhost/302/d_visualize/admin/";
let proxy = {
	'/api/': dev_server + 'index.php',
	'/shopunity/': 'http://api.shopunity.net'
};
let public_path = '/_nuxt/';
if (isDev) {
	public_path = dev_server + 'view/javascript/d_visualze/nuxt_vurify/dist/_nuxt/';
}
console.log(public_path)
// if (!isDev) {2
//     modules = ['@nuxtjs/axios']
//     proxy = {
//         '/shopunity/': 'http://api.shopunity.net'
//     }
// }
module.exports = {
	mode: 'spa',
	srcDir: __dirname,
	dev: isDev,
	env: {
		appUrl: process.env.APP_URL || '/302/d_visualize/admin/index.php?',
		appName: process.env.APP_NAME || 'Laravel-Nuxt',
		appLocale: process.env.APP_LOCALE || 'en',
		user_token: process.env.USER_TOKEN,
		isDev: isDev,
		DevServer: dev_server,
		githubAuth: !!process.env.GITHUB_CLIENT_ID
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.APP_NAME,
		// titleTemplate: '%s - ' + process.env.APP_NAME, // title is now "My Example App - Yay!"
		titleTemplate: '%s', // title is now "My Example App - Yay!"
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: pkg.description}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			}
		],
		script: [
			{src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(',')}`},

			//opencart issue
			{src: 'https://code.jquery.com/jquery-2.2.4.min.js'},
			{src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'}
		]

	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {color: '#6db3ff'},
	router: {
		mode: 'hash',
	},
	/*
	 ** Global CSS
	 */
	css: [
		'~/assets/style/app.styl',
		'~/assets/sass/app.scss',
	],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/vuetify',
		'~plugins/axios',
		'~plugins/i18n',
		'~plugins/nuxt-client-init',
		'~plugins/opencart_helpers',
		'~components/global',
	],

	/*
	 ** Nuxt.js modules
	 */
	modules: modules,
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},
	proxy: proxy,
	/*
	 ** Build configuration
	 */
	build: {
		publicPath: public_path,
		extractCSS: true,
		splitChunks: {
			layouts: false,
			pages: false,
			commons: false
		},
		optimization: {
			minimize: true,
			minimizer: [
				// terser-webpack-plugin
				// optimize-css-assets-webpack-plugin
			],
			splitChunks: {
				chunks: 'all',
				automaticNameDelimiter: '.',
				name: undefined,
				cacheGroups: {}
			}
		}
	}
};
