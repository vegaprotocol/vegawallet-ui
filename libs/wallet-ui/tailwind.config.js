/** @type {import('tailwindcss').Config} */
const path = require('path')
const theme = require('../wallet-theme/src/config')
const uiToolkitTheme = require('@vegaprotocol/tailwindcss-config/src/theme.js')
const vegaCustomClasses = require('@vegaprotocol/tailwindcss-config/src/vega-custom-classes.js')
const _ = require('lodash')

module.exports = {
  content: [
    path.join(__dirname, 'src/**/*.{ts,tsx,html,mdx}'),
    path.join(
      __dirname,
      '../../node_modules/@vegaprotocol/ui-toolkit/index.js'
    ),
  ],
  theme: { extend: _.merge(uiToolkitTheme, theme) },
  darkMode: 'class',
  plugins: [vegaCustomClasses],
}
