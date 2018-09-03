const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const webpack = require('webpack')
const config = require('./config').default
const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSourceMaps = require('@zeit/next-source-maps')
const withTM = require('next-plugin-transpile-modules');
const { join } = require('path')
global.process.env = Object.assign(process.env, config)

const processedConfig = Object.keys(config).reduce((current, next, i) => {
  current[`process.env.${next}`] = JSON.stringify(config[next])
  return current
}, {})

console.log(processedConfig)

const nextPlugins = [[withTM, { transpileModules: ['@kauri/components'] }], withSourceMaps, withLess, withCss]
if (process.env.BUNDLE_ANALYZE) {
  nextPlugins.push([
    withBundleAnalyzer,
    {
      analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: 'static',
          reportFilename: './bundles/server.html',
        },
        browser: {
          analyzerMode: 'static',
          reportFilename: './bundles/client.html',
        },
      },
    },
  ])
}

const nextConfig = {
  webpack: (config, { isServer, defaultLoaders }) => {
    config.plugins.push(
      new webpack.IgnorePlugin(/^\/lib\/languages\/*$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/lib\/languages$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin(processedConfig)
    )

    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin(/jsdom$/), new webpack.IgnorePlugin(/.js.map$/))
    }
    if (process.env.NODE_ENV === 'production') {
      // Do production stuff
    } else {
      // Do development stuff
    }

    return config
  },
}

module.exports = withPlugins(nextPlugins, nextConfig)
