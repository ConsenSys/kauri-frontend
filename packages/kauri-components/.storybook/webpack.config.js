const path = require("path");
const webpack = require("webpack");

// Export a function. Accept the base config as the only param.
module.exports = (config, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.resolve.alias = {
    recompose: path.resolve(__dirname, "../node_modules", "recompose"),
  };
  config.resolve.alias["styled-components"] = path.resolve(
    __dirname,
    "../node_modules",
    "styled-components"
  );
  config.module.rules[0].include.push(path.join(__dirname, "../../kauri-web"));
  config.resolve.extensions.push(".ts", ".tsx");
  config.plugins.push(new webpack.EnvironmentPlugin(["STORYBOOK"]));
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.(ts|tsx)$/,
    use: "babel-loader",
  });
  // Return the altered config
  return config;
};
