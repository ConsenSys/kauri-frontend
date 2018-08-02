const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  // console.log(storybookBaseConfig)
  const webpack = require('webpack')
  storybookBaseConfig.plugins.push(new webpack.EnvironmentPlugin(['STORYBOOK']))

  // Return the altered config
  return storybookBaseConfig
}
