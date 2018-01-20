const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = function(env) {
	const output = path.join(__dirname, '/dist');
	return {
		entry: {
			js: ['babel-polyfill', './index.js']
		},
		output: {
			path: output,
			filename: './bundle.js'
		},
		module: {
			rules: [
				{ //https://webpack.js.org/guides/code-splitting-css/
					test: /\.(css|s[ac]ss$)/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader!sass-loader"
					})
				},
				{
					test: /\.less&/,
					loader: "less-loader"
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							query: {
								presets: ['react', 'es2015', 'stage-1'],
								"plugins": [
									[
										"transform-regenerator", {
										"polyfill": false,
										"regenerator": true
									}
									],
									[
										"transform-object-rest-spread",
										{ "useBuiltIns": true }
									]
								]
							}
						}
					],
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader?name=[name].[ext]'
				},
				{
					test: /\.gif$/,
					loader: 'url-loader?mimetype=image/png'
				}
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.css', '.less'],
		},
		devServer: {
			historyApiFallback: true,
			contentBase: './'
		},
		plugins: [
			new ExtractTextPlugin('style/pda.css'),
		],
		devtool: "nosources-source-map"
	}
};
