const path = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-assets': {},
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}
