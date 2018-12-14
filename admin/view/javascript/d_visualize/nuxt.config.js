const pkg = require('./package');
require('dotenv').config({systemvars:true});
const polyfills = [
	'Promise',
	'Object.assign',
	'Object.values',
	'Array.from',
	'Array.prototype.find',
	'Array.prototype.findIndex',
	'Array.prototype.includes',
	'String.prototype.includes',
	'String.prototype.startsWith',
	'String.prototype.endsWith'
];
let dev_server = process.env.DEV_SERVER;
let isDev = process.env.DEV === 'true';
let modules = [
	'@nuxtjs/axios',
	'@nuxtjs/proxy',
	'@nuxtjs/moment',
];
let proxy = {
	'/api/': dev_server + 'index.php',
	'/v1/': process.env.SHOPUNITY_SERVER,
};
let public_path = '/_nuxt/';
let links = [
	{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
	},
	{
		rel: 'stylesheet',
		href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
	},
	{
		rel: 'stylesheet',
		href: 'https://use.fontawesome.com/releases/v5.5.0/css/v4-shims.css'
	}
];
if (isDev) {
	public_path = dev_server + 'view/javascript/d_visualze/nuxt_vurify/dist/_nuxt/';
	links.push(
		{
			rel: 'stylesheet',
			href: dev_server + 'view/javascript/bootstrap/css/bootstrap.css'
		},
		{
			rel: 'stylesheet',
			href: dev_server + 'view/stylesheet/stylesheet.css'
		},
	);
}
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
	mode: 'spa',
	srcDir: __dirname,
	dev: isDev,
	env: {
		appUrl: process.env.APP_URL || '/302/d_visualize/admin/index.php?',
		appLocale: process.env.APP_LOCALE || 'en',
		user_token: process.env.USER_TOKEN,
		isDev: isDev,
		DevServer: dev_server,
		githubAuth: !!process.env.GITHUB_CLIENT_ID
	},
	head: {
		title: process.env.APP_NAME,
		titleTemplate: '%s', // title is now "My Example App - Yay!"
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: 'Visualize'}
		],
		link: links,
		script: [
			{src: `https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfills.join(',')}`},
		]
	},
	loading: {color: '#6db3ff'},
	router: {
		mode: 'hash',
	},
	css: [
		'~/assets/style/app.styl',
		'~/assets/sass/app.scss',
	],
	plugins: [
		'@/plugins/vuetify',
		'~plugins/axios',
		'~plugins/i18n',
		'~plugins/nuxt-client-init',
		'~plugins/opencart_helpers',
		'~components/global',
	],
	modules: modules,
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},
	proxy: proxy,
	build: {
		plugins: [ new VuetifyLoaderPlugin()],
		publicPath: public_path,
		optimization:{
			minimize: true,
		},
		analyze: isDev,
		splitChunks: {
			layouts: false,
			pages: false,
			commons: false
		},
		filenames: {
			app: ({ isDev }) => isDev ? '[name].js' : '[name].js',
			chunk: ({ isDev }) => isDev ? '[name].js' : '[name].js',
			css: ({ isDev }) => isDev ? '[name].css' : '[name].css',
			img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[hash:7].[ext]',
			font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[hash:7].[ext]',
			video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[hash:7].[ext]'},
	}
};
