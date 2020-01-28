const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    staging_behavior1_viewer_request: path.resolve(__dirname, 'src/env/staging/behavior1/viewer-request/index.ts'),
    staging_behavior1_origin_response: path.resolve(__dirname, 'src/env/staging/behavior1/origin-response/index.ts'),

    production_behavior1_viewer_request: path.resolve(__dirname, 'src/env/production/behavior1/viewer-request/index.ts'),
    production_behavior1_origin_response: path.resolve(__dirname, 'src/env/production/behavior1/origin-response/index.ts'),
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
};
