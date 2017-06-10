const path = require('path');

module.exports = {
  context: `${__dirname}/../../client/src`,

  entry: './index.jsx',

  output: {
    path: `${__dirname}/../../client/public`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'latest',
              'react',
              'stage-0',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, '../../node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
};
