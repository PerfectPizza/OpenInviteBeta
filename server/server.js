/* eslint no-unused-vars: "warn" */

require('dotenv').config({ path: '/config/' });
require('./config/db');

const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware'); // TAKE OUT IN PRODUCTION
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');

const compiler = webpack(webpackConfig); // TAKE OUT IN PRODUCTION
const app = express();

app.use(bodyParser.json());
app.use('/api/', router);
app.use(express.static(path.join(__dirname, '../client/public')));

// >>>>>>>TAKE OUT DURING PRODUCTION>>>>>>>>>
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
});