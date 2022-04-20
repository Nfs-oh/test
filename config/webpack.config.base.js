const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '../src/index'),
	output: {
		filename: '[name].js',
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
			cacheGroups: {
				echarts: {
					test: /[echarts]/,
					filename: 'echarts.js',
					priority: 11,
					enforce: true,
				},
				'react-dom': {
					test: /react-dom/,
					filename: 'react-dom.js',
					priority: 10,
				},
				moment: {
					test: /moment/,
					filename: 'moment.js',
					priority: 10,
				},
				vendors: {
					test: /[\/]node_modules[\/]/,
					filename: 'vendors.js',
					priority: -10,
				},
				default: {
					filename: 'common.js',
					reuseExistingChunk: true,
					priority: -20,
				}
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