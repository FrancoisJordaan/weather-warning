const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	devServer: {
		proxy: { 
			"/api": {
				target: 'https://api.darksky.net/forecast/29e4a4ce0ec0068b03fe203fa81d457f/-33.9249,18.4241?exclude=flags,alerts,daily',
				secure: false,
				pathRewrite: {
					"^/api": ""
				},
				changeOrigin: true
			}
		},
		inline: true,
		host: '0.0.0.0',
		port: '8000'
	}
}