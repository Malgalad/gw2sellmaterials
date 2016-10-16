const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader?modules'},
      {test: /\.jsx?$/, loader: 'babel-loader', query: {presets: [['es2015', {modules: false}], 'stage-2', 'react']}}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
  ],
};
