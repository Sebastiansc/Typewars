module.exports = {
  context: __dirname,
  entry: "./entry.js",
  output: {
    path: './',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  node: {fs: "empty"},
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js"],
  }
};
