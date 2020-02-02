const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['./src/js/index.js'],
  devtool: 'source-maps',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-starter-kit',
      template: path.resolve('./src/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: './images',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  }
}
