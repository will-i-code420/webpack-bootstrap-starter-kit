module.exports = {
  mode: 'development',
  src: ['./src/js/index.js'],
  devtool: 'source-maps',
  plugins: [

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
      }
    ]
  }
}
