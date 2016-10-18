import webpack from "webpack";
import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin';
import path from "path";

import getGithubData from './src/js/utils/getGithubData';
import {renderToString} from 'react-dom/server';

const outDir = path.join(__dirname, "dist");
const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry  : path.join(__dirname, "src/js/app.jsx"),
  output : {
    path         : outDir,
    filename     : "app.js",
    libraryTarget: 'umd'
  },
  module : {
    loaders: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : "babel",
      },
      {
        test  : /\.json$/,
        loader: "json"
      },
      {
        test  : /\.(png|jpg|ico)$/,
        loader: "file?name=images/[name].[ext]"
      },
      {
        test  : /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ],
  },
  devtool: "source-map",
  plugins: [
    new ExtractTextPlugin('main.css', {allChunks: true}),
    new CopyWebpackPlugin([
      {
        from: "src/images/favicon.ico"
      }
    ]),
    new StaticSiteGeneratorPlugin('main', ['/'], {getGithubData, renderToString})
  ],
  postcss: webpack => [
    require("postcss-import")({addDependencyTo: webpack}),
    require('postcss-cssnext')(),
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  }
};

if (isProd) {
  config.plugins = [
    new CleanWebpackPlugin(["dist"], {
      verbose: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
    .concat(config.plugins)
    .concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        output  : {
          comments: require("uglify-save-license")
        }
      })
    ]);
}
export default config;
