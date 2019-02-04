require("@babel/register")({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require("webpack");
const config = require("./config").default;
const withPlugins = require("next-compose-plugins");
const withCss = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withSourceMaps = require("@zeit/next-source-maps");
const withTM = require("next-plugin-transpile-modules");
const withTypescript = require("./lib/with-typescript");
const { join, resolve } = require("path");
global.process.env = Object.assign(process.env, config);

const processedConfig = Object.keys(config).reduce((current, next, i) => {
  current[`process.env.${next}`] = JSON.stringify(config[next]);
  return current;
}, {});

console.log(processedConfig);

const nextPlugins = [
  [withTypescript, { transpileModules: ["../kauri-components"] }],
  [withTM, { transpileModules: ["../kauri-components"] }],
  withSourceMaps,
  withLess,
  withCss,
];
if (process.env.BUNDLE_ANALYZE) {
  nextPlugins.push([
    withBundleAnalyzer,
    {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "./bundles/server.html",
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "./bundles/client.html",
        },
      },
    },
  ]);
}
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production" ? "https://cdn.kauri.io" : "",
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.alias["styled-components"] = resolve(
      __dirname,
      "./node_modules",
      "styled-components"
    );

    config.resolve.alias["react"] = resolve(
      __dirname,
      "./node_modules",
      "react"
    );

    config.resolve.alias["react-dom"] = resolve(
      __dirname,
      "./node_modules",
      "react-dom"
    );

    const { highlightjsLanguages } = require("./lib/hljs");
    if (!RegExp.escape) {
      RegExp.escape = function (value) {
        return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      };
    }
    config.plugins.push(
      // new webpack.IgnorePlugin(/^\/lib\/languages\/*$/, /highlight\.js$/),
      // new webpack.IgnorePlugin(/^\.\/lib\/languages$/, /highlight\.js$/),
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(
          `^./(${highlightjsLanguages
            .map(function (val) {
              return RegExp.escape(val);
            })
            .join("|")})$`
        )
      ),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin(processedConfig)
    );
    // config.module.rules[0].include.push(join(__dirname, '../kauri-components'))
    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin(/jsdom$/));
      const languages = [
        "dutch",
        "english",
        "german",
        "italian",
        "portugese",
        "spanish",
        "swedish",
      ];
      languages.map(lang =>
        config.plugins.push(
          new webpack.IgnorePlugin(new RegExp(`${lang}.js.map`))
        )
      );
    }
    if (process.env.NODE_ENV === "production") {
      // Do production stuff
    } else {
      // Do development stuff
    }

    return config;
  },
  // webpackDevMiddleware: config => {
  //   console.log(config)
  //   config.module.rules[0].include.push(join(__dirname, '../kauri-components'))
  //   return config
  // },
};

module.exports = withPlugins(nextPlugins, nextConfig);
