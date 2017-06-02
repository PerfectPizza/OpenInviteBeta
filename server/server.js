/* eslint no-unused-vars: "warn" */

require('dotenv').config({ path: 'server/config/.env' });
require('./config/db');

const express = require('express');
const session = require('./config/session');
const bodyParser = require('body-parser');
const addPassportMiddleware = require('./config/passport');
const { apiRouter, authRouter, baseRouter } = require('./routers');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

const compiler = webpack(webpackConfig);

const app = express();

app.use(session);
app.use(bodyParser.json());
addPassportMiddleware(app);

app.use('/', baseRouter);
app.use('/api/', apiRouter);
app.use('/login', authRouter);

app.use(express.static(path.join(__dirname, '../client/public')));

if (process.env.NODE_ENV === 'dev') {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));
}

app.listen(process.env.port || 3000, () => {
  console.log(`app listening on ${process.env.port || '3000'}`);
});
