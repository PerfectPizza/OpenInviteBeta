/* eslint no-unused-vars: "warn" */

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const path = require('path');
const router = require('./router.js');
const connection = require('./db');
const bodyParser = require('body-parser');

const compiler = webpack(webpackConfig);
const app = express();

app.use(bodyParser.json());
app.use('/api/', router);
app.use(express.static(path.join(__dirname, '../www')));
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
});
