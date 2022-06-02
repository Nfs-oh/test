const baseConfig = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const prodConfig = {
	mode: 'production',
	optimization: {
    minimize: true,
    minimizer: [
			new TerserPlugin()
		],
		chunkIds: 'named',
		moduleIds: 'hashed'
  },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: false,
							reloadAll: true,
						},
					},
					{
						loader: 'css-loader',
					}
				]
			},
		]
	}
}

module.exports = merge(baseConfig, prodConfig);