const baseConfig = require('./webpack.config.base.js');
const path = require('path');
const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devConfig = {
	mode: 'development',
	// devtool:"eval-source-map",
	// devServer: {
	// 	static: {
  //     directory: path.resolve(__dirname, "../dist")
  //   },
	// 	compress: true,
	// 	port: 9598,
	// 	open: true,
	// 	hot: true
	// },
	// plugins: [
	// 	new BundleAnalyzerPlugin(),
	// ]
}

module.exports = merge(baseConfig, devConfig);