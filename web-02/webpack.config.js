const HtmlWebPackPlugins = require("html-webpack-plugin");
const AntdScssThemePlugin = require("antd-scss-theme-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: !isProduction
            }
          },
          {
            loader: "css-loader",
            options: {
              // importLoaders: 1,
              sourceMap: !isProduction
              // modules: true,
              // camelCase: true
              //localIdentName: "[name]-[local]-[hash:base64:5]"
            }
          },
          AntdScssThemePlugin.themify({
            loader: "sass-loader",
            options: {
              sourceMap: !isProduction
            }
          })
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: !isProduction
            }
          },
          {
            loader: "css-loader",
            options: {
              // importLoaders: 1,
              sourceMap: !isProduction
            }
          },
          AntdScssThemePlugin.themify({
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          })
        ]
      }
      // ,{
      //   test: /\.(css)$/,
      //   use: [
      //     { loader: "style-loader" },
      //     { loader: "css-loader" },
      //     {
      //       loader: "less-loader",
      //       options: {
      //         javascriptEnabled: true
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebPackPlugins({
      template: path.join(__dirname, "public", "index.html")
    }),
    new AntdScssThemePlugin(path.join(__dirname, "src", "theme.scss"))
  ]
};
