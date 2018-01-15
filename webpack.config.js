const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
// const api = require("./src/path.config.js");
const prod = process.env.NODE_ENV === "production";

const imgLoaderDev = [
  {
    test: /\.(png|jpe?g|gif)/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  }
];

const imgLoaderProd = [
  {
    test: /\.(png|jpe?g|gif)/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
      // {
      //   loader: "image-webpack-loader",
      //   options: {
      //     query: {
      //       optimizationLevel: 7,
      //       interlaced: false
      //     }
      //   }
      // }
    ]
  }
];
const imgLoader = prod ? imgLoaderProd : imgLoaderDev;

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index.js"
    // common: ["echarts"]
  },
  output: {
    path: path.join(__dirname, prod ? "dist" : "build"),
    filename: prod ? "js/[name].[hash:8].min.js" : "js/[name].js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      scenes: path.resolve(__dirname, "src/scenes"),
      components: path.resolve(__dirname, "src/components"),
      myRedux: path.resolve(__dirname, "src/redux")
    },
    extensions: [".js", ".scss", ".png", ".jpg"],
    modules: ["node_modules", path.resolve(__dirname, "src/assets")]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "react-hot-loader!babel-loader?cacheDirectory"
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          publicPath: "../",
          use: [
            {
              loader: "css-loader",
              options: { minimize: true }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ].concat(imgLoader)
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new copyWebpackPlugin([
      { from: "lib", to: "lib" },
      { from: "assets", to: "assets" },
      { from: "data", to: "data" }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: prod,
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: prod ? "style/index.[hash:8].min.css" : "style/index.css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      favicon: "./favicon.ico",
      excludeChunks: ["login"]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["loader"]
    }),
    new CleanWebpackPlugin(["dist", "build", "*.log"])
  ]
};

if (prod) {
  // module.exports.devtool = "source-map";
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  );
  module.exports.plugins.push(
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./manifest.json")
    })
  );
  module.exports.plugins.push(
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ["lib/vendor.min.js"],
      append: false
    })
  );
} else {
  module.exports.devtool = "eval-source-map";
  module.exports.devServer = {
    contentBase: "src",
    // host: "0.0.0.0",
    port: 6606,
    disableHostCheck: true,
    hot: true,
    publicPath: "/",
    historyApiFallback: true,
    stats: {
      colors: true
    },
    proxy: {
      "/api": {
        // target: api.apiHost
      },
      "/data": {
        // target: api.apiHost
        // target: api.dataHost
      },
      changeOrigin: true,
      secure: false
    },
    watchOptions: {
      ignored: /node_modules|bower_components|dist|build/
    }
  };
}
