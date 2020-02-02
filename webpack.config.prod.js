const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
image-webpack-loader

module.exports = {
  mode: 'production',
  entry: ['./src/js/index.js'],
  optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin()
      ]
    },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-starter-kit',
      template: path.resolve('./src/index.html')
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images',
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: false,
                quality: 45
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: true,
                optimizationLevel: 3
              },
              webp: {
                quality: 20
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':src', ':href']
          }
        }
      }
    ]
  }
}
