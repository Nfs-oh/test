const baseConfig = require('./webpack.config.base.js');
const { merge } = require('webpack-merge')
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
}

module.exports = merge(baseConfig, prodConfig);