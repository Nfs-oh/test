const baseConfig = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');

const devConfig = {
	mode: 'development',
	devtool:"eval-source-map",
	devServer: {
		static: {
      directory: path.resolve(__dirname, "../dist")
    },
		compress: true,
		port: 9598,
		open: true,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					}
				]
			},
		]
	}
}

module.exports = merge(baseConfig, devConfig);