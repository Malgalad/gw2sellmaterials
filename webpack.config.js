const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    publicPath: 'build/',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?modules' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: __dirname + '/src',
        query: { presets: [['es2015', { modules: false }], 'stage-2', 'react'] }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
};
