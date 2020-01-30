const fs = require('fs')
const webpack = require('webpack')
const CracoLinariaPlugin = require('craco-linaria')
const pjson = require('./package.json')
const interpolateHtml = require('craco-interpolate-html-plugin')

const { DEV_USERNAME, APP_CONFIG } = process.env
let config = { }
if (APP_CONFIG) {
  config = JSON.parse(fs.readFileSync(`./config/${APP_CONFIG}.json`, 'utf8'))
  console.log(`config loaded from ./config/${APP_CONFIG}.json`)
}

module.exports = {
  reactScriptsVersion: "react-scripts",
  plugins: [
    {
      plugin: CracoLinariaPlugin,
      options: {
        displayName: true
        // Linaria options
      },
    },
    {
      plugin: interpolateHtml,
      options: {
        licenseKey: config.newrelic.licenseKey,
        applicationID: config.newrelic.applicationID,
      },
    }
  ],
  style: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['last 4 version'],
        }),
        require('postcss-import'),
        require('postcss-url')
      ]
    }
  },
  webpack: {
    alias: {},
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV_USERNAME: DEV_USERNAME ? JSON.stringify(DEV_USERNAME) : JSON.stringify('application'),
          APP_CONFIG: JSON.stringify(config),
        }
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.filename = env === 'production'
        ? `static/js/[name].${pjson.version}.js`
        : 'static/js/bundle.js'

      webpackConfig.output.chunkFilename = env === 'production'
        ? `static/js/[name].${pjson.version}.chunk.js`
        : 'static/js/[name].chunk.js'

      return webpackConfig
    }
  },
}
