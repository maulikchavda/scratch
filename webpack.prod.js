const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

process.env["NODE_ENV"] = "production";

module.exports = merge([
  common,
  {
    mode: "production",
    output: {
      path: path.resolve(__dirname, "build"), // change this
      publicPath: "/",
      filename: "bundle.js",
    },
    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
  },
]);
