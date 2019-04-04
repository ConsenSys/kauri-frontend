const path = require("path");
const webpack = require("webpack");

// Export a function. Accept the base config as the only param.
module.exports = (config, configType) => {
  config.resolve.alias = {
    recompose: path.resolve(__dirname, "../node_modules", "recompose"),
  };
  config.resolve.alias["styled-components"] = path.resolve(
    __dirname,
    "../node_modules",
    "styled-components"
  );
  config.module.rules[0].include.push(path.join(__dirname, "../../kauri-web"));
  config.module.rules[0].exclude.push(
    path.join(__dirname, "../../kauri-web/node_modules")
  );
  // console.log(JSON.stringify(config.module.rules[0]));
  config.resolve.extensions.push(".ts", ".tsx");
  config.plugins.push(new webpack.EnvironmentPlugin(["STORYBOOK"]));
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.monolithExternalApi": JSON.stringify("api.dev.kauri.io"),
    })
  );
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.(ts|tsx)$/,
    use: "babel-loader",
  });
  // Return the altered config
  return config;
};
