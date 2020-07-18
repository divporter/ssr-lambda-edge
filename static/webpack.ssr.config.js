const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  env.VUE_ENV = 'server'
  env.NODE_ENV = 'production'
  const mode = 'production'
  console.log(env.VUE_ENV)
  return {
    entry: path.join(__dirname, 'ssr/entry-server.js'),
    mode,
    target: "node",
    output: {
      filename: '[name].js',
      libraryTarget: "commonjs2",
      chunkCallbackName: '[id].js',
      path: path.resolve(__dirname, 'ssr/dist'),
    },
    module: {
      rules: [
        // ... other rules
        {
          test: /\.vue$/,
          loader: 'vue-loader',
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
      new VueSSRServerPlugin(),
      new Dotenv({
        path: mode === "production" ? "./.env": "./.env.local" 
      })
    ]
  }
};