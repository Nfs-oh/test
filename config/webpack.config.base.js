const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '../src/index'),
	output: {
		filename: 'app.[contenthash:8].js',
		path: path.resolve(__dirname, '../dist'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {
			'@': path.join(__dirname, '../src/')
		}
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			minChunks: 1,
			minSize: 30000,
			maxAsyncRequests: 30,
			maxInitialRequests: 30,
			cacheGroups: {
				echarts: {
					test: /echarts/,
					filename: 'echarts.[contenthash:8].js',
					priority: 10,
					enforce: true,
				},
				'react-dom': {
					test: /react-dom/,
					filename: 'react-dom.[contenthash:8].js',
					priority: 9,
				},
				lodash: {
					test: /lodash/,
					filename: 'lodash.[contenthash:8].js',
					priority: 8,
				},
				default: {
					reuseExistingChunk: true,
					filename: 'bundle.[contenthash].js',
					priority: -20,
				},
				defaultVendors: {
					test: /[\\/]node_modules[\\/]/,
					filename: 'vendors.[contenthash:8].js',
					priority: -10,
					reuseExistingChunk: true,
				},
			}
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: '/node_modules/'
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: "/node-modules/"
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../public/index.html')
		}),
	]
}