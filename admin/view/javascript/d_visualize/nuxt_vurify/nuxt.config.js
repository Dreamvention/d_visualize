const pkg = require('./package');
require('dotenv').config();
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
let dev_server = process.env.DEV_SERVER
let isDev = process.env.DEV === 'true';
let modules = [
	// Doc: https://github.com/nuxt-community/axios-module#usage
	'@nuxtjs/axios',
	'@nuxtjs/proxy', // OFF on dev
	// 'nuxt-fontawesome',

];
let proxy = {
	'/api/': dev_server + 'index.php',
	'/shopunity/': 'https://api.shopunity.net/'
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
	links = [
		{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
		},
		{
			rel: 'stylesheet',
			href: dev_server + 'view/javascript/d_visualize/font/awesome/all.min.css'
		},
		{
			rel: 'stylesheet',
			href: dev_server + 'view/javascript/d_visualize/font/awesome/v4-shims.min.css'
		}
	];
}
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
			//opencart issue
			{src: 'https://code.jquery.com/jquery-2.2.4.min.js'},
			{src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'}
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
	// fontawesome: {
	// 	imports: [
	// 		{
	// 			set: '@fortawesome/pro-regular-svg-icons',
	// 			icons: [
	// 				'faSignOut',
	// 				'faAngleRight',
	// 				'faAngleDown',
	// 				'faUsers',
	// 				'faUser',
	// 				'faCog',
	// 				'faProcedures',
	// 				'faListUl'
	// 			]
	// 		}
	// 	]
	// },
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
		publicPath: public_path,
		extractCSS: true,
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
