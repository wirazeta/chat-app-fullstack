/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

// const CopyPlugin = require('copy-webpack-plugin');

// const path = require('path');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    //   new CopyPlugin([
    //     {
    //         // Copy static asset files so that they can be served from output directory as swagger-ui-dist does not work
    //         // with webpack.
    //         patterns: [
    //           {from: path.resolve(__dirname, 'node_modules/swagger-ui-dist/'), to: 'node_modules/swagger-ui-dist'}
    //         ],
    //         // test: /\.(js|css|html|png)$/i,
    //         // ignore: ['index.js', 'absolute-path.js', '*.map'],
    //     },
    // ]),
    ],
  };
};
