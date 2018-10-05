const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: [ './main.js'],
	watch: true,
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader'
					}
				]
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins: [
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'server.js',
	},
};