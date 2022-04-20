const baseConfig = require('./webpack.config.base.js');
const { merge } = require('webpack-merge')

const devConfig = {
	mode: 'production',
}

module.exports = merge(baseConfig, devConfig);