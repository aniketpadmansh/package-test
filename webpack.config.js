// const path = require("path");
// const glob = require("glob");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const entries = glob
//   .sync("./src/components/**/index.ts")
//   .reduce((acc, filePath) => {
//     const entry = filePath.replace("./src/", "").replace("/index.ts", "");
//     acc[entry] = filePath;
//     return acc;
//   }, {});

// module.exports = {
//   entry: {
//     ...entries,
//     index: "./src/components/index.ts",
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name]/index.js",
//     library: {
//       type: "module",
//     },
//     clean: true,
//   },
//   mode: "production",
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".jsx"],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: "babel-loader",
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.module\.s[ac]ss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: "css-loader",
//             options: {
//               modules: true,
//             },
//           },
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.s[ac]ss$/,
//         exclude: /\.module\.s[ac]ss$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: "[name]/style.css",
//     }),
//   ],
//   experiments: {
//     outputModule: true,
//   },
//   externals: {
//     react: "react",
//     "react-dom": "react-dom",
//   },
// };
