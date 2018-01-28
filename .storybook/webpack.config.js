const path = require("path");
module.exports = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, "..", "src"),
      assets: path.resolve(__dirname, "..", "src/assets"),
      components: path.resolve(__dirname, "..", "src/components"),
      ultis: path.resolve(__dirname, "..", "src/ultis"),
      HOC: path.resolve(__dirname, "..", "src/HOC"),
      data: path.resolve(__dirname, "..", "src/data"),
      constant: path.resolve(__dirname, "..", "src/constant")
    },
    extensions: [".js", ".scss", ".png", ".jpg"],
    modules: ["node_modules", path.resolve(__dirname, "src/assets")]
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader"
          }
        ]
      }
    ]
  }
};
