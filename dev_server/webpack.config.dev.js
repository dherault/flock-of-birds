import path from 'path';
import webpack from 'webpack';
import config from './config';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'eventsource-polyfill', // necessary for hot reloading with IE
    `webpack-hot-middleware/client?path=${config.url}__webpack_hmr`,
    './src/main.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'), // this is stupid
    filename: 'bundle.js',
    publicPath: config.url
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({ // http://mts.io/2015/04/08/webpack-shims-polyfills/
    //   fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    // }),
    // new webpack.IgnorePlugin(/chalk/),
    // new webpack.IgnorePlugin(/node-fetch/)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react', 'react-hmre']
        }
      },
      // {
      //   test: /\.css$/,
      //   loaders: ['style', 'css', 'postcss'],
      //   exclude: /node_modules/
      // }
    ]
  }
};
