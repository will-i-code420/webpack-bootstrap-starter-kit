const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1500,
    ignored: /node_modules/
  },
  devtool: 'source-maps',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
    open: true,
    inline: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/about.html'),
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/contact.html'),
      filename: 'contact.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('precss'),
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
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
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|webp)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false
          }
        }]
      }
    ]
  }
}
