const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const vendors = ["react", "react-dom", "classnames", "prop-types"];

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, "src"),
    filename: "lib/[name].min.js",
    library: "[name]_[chunkhash]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: "./manifest.json",
      name: "[name]_[chunkhash]",
      context: __dirname
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/), //添加zh的支持
    new CleanWebpackPlugin(["src/lib"]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: "lib/[name].min.js.map"
    })
  ]
};
