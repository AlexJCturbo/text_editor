const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),

      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'A cool online text editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        ios: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [58, 96, 128, 256, 384, 512],
            destination: path.join('assets', 'image'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '512x512',
            destination: path.join('assets', 'image'),
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        }
      ],
    },
  };
};
