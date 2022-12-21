/** @type {import('tailwindcss').Config} */
const path = require('path')
const theme = require('../wallet-theme/src/config')

module.exports = {
  content: [path.join(__dirname, 'src/**/*.{ts,tsx,html,mdx}')],
  theme: {
    extend: theme,
  },
  plugins: [],
}
