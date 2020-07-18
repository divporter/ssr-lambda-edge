const {join} = require('path')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  const mode = (env && env.NODE_ENV === 'production') ? 'production' : 'development'
  return {
    entry: join(__dirname, 'src/entry-client.js'),
    output: {
      filename: `static/js/[name]${mode === 'production' ? '.[contenthash:8]' : ''}.js`,
      chunkCallbackName: '[id].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: "/"
    },
    mode,
    devServer: {
      port: 3030,
      hot: true,
      historyApiFallback: true,
      contentBase: join(__dirname, 'src'),
      publicPath: "/",
    },
    module: {
      rules: [
        // ... other rules
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /src.*\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-transform-modules-commonjs", "@babel/transform-runtime","@babel/plugin-syntax-dynamic-import"]
          },
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
    },
    plugins: [
      mode === 'production' ? new CleanWebpackPlugin() : () => {return},
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: join(__dirname, './src/index.html'),
        inject: 'body',
        filename: 'index.html'
      }),
      new VueSSRClientPlugin(),
      new Dotenv({
        path: "./.env"
      })
    ]
  }
};