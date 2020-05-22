const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCSS = require('mini-css-extract-plugin')
const UglifyJS = require('uglifyjs-webpack-plugin')
const OptimizeCSS = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: modoDev ? 'development' : 'production',
  entry: './src/main.js',
  output: {
    filename: 'principal.js',
    path: __dirname + '/public'
  },

  devServer: {
    contentBase: './public',
    port: 9000
  },

  optimization: {
    minimizer: [
      new UglifyJS({ cache: true, parallel: true }),
      new OptimizeCSS({})
    ]
  },

  plugins: [
    new MiniCSS({
      filename: 'estilo.css'
    })
  ],

  module: {
    rules: [
      { test: /\.s?[ac]ss$/,
        use: [
          MiniCSS.loader,
          // 'style-loader',  //Adiciona CSS na DOM.
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use:['file-loader']
      }
  ]
  }
}