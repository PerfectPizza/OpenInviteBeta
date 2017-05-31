/* eslint no-unused-vars: "warn" */

require('dotenv').config();
require('./config/db');

const express = require('express');
const session = require('./config/session');
const bodyParser = require('body-parser');
const addPassportMiddleware = require('./config/passport');
const { apiRouter, authRouter, baseRouter } = require('./routers');
const path = require('path');
const webpack = require('webpack'); // START TAKE OUT IN PRODUCTION
const webpackConfig = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig); // END TAKE OUT IN PRODUCTION

const app = express();

app.use(session);
app.use(bodyParser.json());
addPassportMiddleware(app);
app.use('/', baseRouter);
app.use('/api/', apiRouter);
app.use('/login', authRouter);
app.use(express.static(path.join(__dirname, '../client/public')));

// START TAKE OUT DURING PRODUCTION
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
// END TAKE OUT DURING PRODUCTION

app.listen(process.env.port || 3000, () => {
  console.log(`app listening on ${process.env.port || '3000'}`);
});
