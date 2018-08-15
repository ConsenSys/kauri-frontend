const webpack = require('webpack')
const config = require('./config').default
const withPlugins = require('next-compose-plugins')
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withSourceMaps = require('@zeit/next-source-maps')
const { join } = require('path')
global.process.env = Object.assign(process.env, config)

const processedConfig = Object.keys(config).reduce((current, next, i) => {
  current[`process.env.${next}`] = JSON.stringify(config[next])
  return current
}, {})

console.log(processedConfig)

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.IgnorePlugin(/^\/lib\/languages\/*$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/lib\/languages$/, /highlight\.js$/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin(processedConfig)
    )
    if (!isServer) {
      config.plugins.push(new webpack.IgnorePlugin(/jsdom$/))
    }
    if (process.env.NODE_ENV === 'production') {
      // Do production stuff
    } else {
      // Do development stuff
    }

    return config
  },
}

module.exports = withPlugins([withSourceMaps, withLess, withCss], nextConfig)
