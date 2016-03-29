import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './webpack.config.dev';
import config from './config';

const app = express();
const compiler = webpack(webpackConfig);
const port = config.port;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));

app.listen(port, '0.0.0.0', err => {
  if (err) return logError('dev_server start', err);

  console.log(`Webpack server listening on port ${port}`);
});
