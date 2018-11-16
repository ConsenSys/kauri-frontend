const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./babel.config');

// Export a function. Accept the base config as the only param.
module.exports = (config, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.resolve.alias = {
    recompose: path.resolve(__dirname, '../node_modules', 'recompose'),
  };
  config.module.rules[0].include.push(path.join(__dirname, '../../kauri-web'));
  config.resolve.extensions.push('.ts', '.tsx');
  // config.module.rules[0].use[0].loader = require.resolve('babel-loader');
  // config.module.rules[0].use[0].options.presets = babelConfig.presets;
  // config.module.rules[0].use[0].options.plugins = babelConfig.plugins;
  config.plugins.push(new webpack.EnvironmentPlugin(['STORYBOOK']));
  config.plugins.push(new webpack.IgnorePlugin(/jsdom$/));
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.(ts|tsx)$/,
    use: 'babel-loader',
  });
  config.node = {
    child_process: 'empty',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  };
  // Return the altered config
  return config;
};
