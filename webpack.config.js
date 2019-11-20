const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv && argv.mode || 'development',
  devtool: (argv && argv.mode || 'development') === 'production' ? 'source-map' : 'eval',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  node: false,

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader'
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.png',
      '.json'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'dist'),
      toType: 'dir'
    }])
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    mangleWasmImports: true,
    removeAvailableModules: true,
  },

  devServer: {
    compress: true,
    host: 'pwa.www.1800flowers.com',
    headers: {
      "Cache-Control": "public, max-age=31536000"
    },
    https: {
      key: fs.readFileSync('./pwa.www.1800flowers.com-key.pem'),
      cert: fs.readFileSync('./pwa.www.1800flowers.com.pem'),
      ca: fs.readFileSync('/Users/gaurav/Library/Application Support/mkcert/rootCA.pem')
    },
    overlay: true,
  }
});