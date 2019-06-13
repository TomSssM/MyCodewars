const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: "[name][hash].bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },

          },
        ],
      },
      {
        test: /\.(s?css)$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
      }
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/views/app-view.html",
      filename: "index.html",
      chunks: ['app'],
      hash: true,
      title: "YouTube Client App"
    }),
    new CleanWebpackPlugin(),
  ]
};
