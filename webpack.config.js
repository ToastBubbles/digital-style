const path = require("path");

module.exports = {
  mode: "none",
  entry: "./js/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
};
