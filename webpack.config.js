const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const environment = env.environment;
  const isProduction = environment === 'production';
  const isDevelopment = environment === 'development';

  return {
    mode: environment,

    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, '/dist'),
      filename: 'bundle.js',
      clean: true,
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },

    devServer: {
      static: {
        directory: path.resolve(__dirname, '/src'),
      },
      host: 'localhost',
      port: 3000,
      hot: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './src/index.html',
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  };
};
