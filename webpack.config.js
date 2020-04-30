const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './js/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/        
      },

      {
        test: /\.html?$/,
        use: 'html-loader',
      },   

      {
        test: /\.css(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'css/styles.[ext]',
          },
        }, 'extract-loader', 'css-loader'],
      },   
      
      {
        test: /\.(jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
          esModule: false
        }
      },    
      
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|fnt)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      
      {
        test: /\.glsl$/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }      
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
    stats: 'errors-only'
  },  

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      hash: true,
    }),

    new webpack.ProvidePlugin({
      THREE: 'three'
    })    
  ]  
};