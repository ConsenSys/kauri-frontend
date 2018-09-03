const path = require('path')
const webpack = require('webpack')
const babelConfig = require('../../kauri-web/babel.config')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  // console.log(storybookBaseConfig)
  storybookBaseConfig.plugins.push(new webpack.EnvironmentPlugin(['STORYBOOK']))

  storybookBaseConfig.module.rules[0].use[0].loader = require.resolve('babel-loader')
  storybookBaseConfig.module.rules[0].use[0].options.presets = babelConfig.presets
  storybookBaseConfig.module.rules[0].use[0].options.plugins = babelConfig.plugins

  // Return the altered config
  return storybookBaseConfig
}
