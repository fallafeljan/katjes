const webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';
const filename = !debug ? '[name].[hash].js' : '[name].js';

const entry = {
  app: `${__dirname}/app/index.js`
};

if (debug) {
  entry.app = new Array(
    'webpack/hot/only-dev-server',
    entry.app
  );
}

const devServer = {
  contentBase: `${__dirname}/public`,
  host: '0.0.0.0',
  inline: true,
  noInfo: true,
  quiet: false,
  stats: {
    colors: true
  }
};

const bundle = {
  name: 'bundle',
  entry,

  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',

  output: {
    path: `${__dirname}/public/assets`,
    publicPath: '/assets/',
    filename
  },

  module: {
    rules: [/* {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, */{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.eot(\?(v=\d+\.\d+\.\d+)?)?$/,
      use: 'file-loader'
    }, {
      test: /\.(woff|woff2)$/,
      use: 'url-loader?prefix=font/&limit=5000'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.gif/,
      use: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg/,
      use: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png/,
      use: 'url-loader?limit=10000&mimetype=image/png'
    }]
  },

  devServer,

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
          debug ? 'development' : 'production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};

if (!debug) {
  bundle.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,

      compress: {
        hoist_vars: true,
        screw_ie8: true,
        warnings: false,
      }
    })
  );
} else {
  bundle.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = bundle;
