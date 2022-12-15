/** @type {import('tailwindcss').Config} */
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx,html,mdx}')
  ],
  theme: {
    extend: {
      colors: {
        red: '#FF261A',
        green: '#26FF8A',
        yellow: '#',
        orange: '#',
        blue: '#',
        pink: '#',
        black: '#101010',
        white: '#fff',
        grey: {

        },


        primary: '#',
        secondary: '#',

        text: {

        },


        success: '#',
        warning: '#',
        danger: '#',
      }
    },
  },
  plugins: [],
}


/* Brand colors */
red: 255,38,26;
green: 38,255,138;
yellow: 218,255,13;
orange: 217,130,43;
blue: 72,175,240;
pink: 255,7,127;

none: 110,110,110;
none-bg: none / 40%;
primary: blue
primary-bg: primary / 40%;
success: 24,181,103;
success-bg: success / 40%;
warning: orange;
warning-bg: warning / 40%;
danger: 237,21,21;
danger-bg: danger / 40%;

/* Grayscale */
--black: #101010;
--white: #fff;
--dark-gray1: #1f1f1f;
--dark-gray2: #2a2a2a;
--dark-gray3: #363636;
--dark-gray4: #3f3f3f;
--dark-gray5: #494949;
--gray1: #6e6e6e;
--gray2: #848484;
--gray3: #999;
--gray4: #b5b5b5;
--gray5: #cbcbcb;
--light-gray1: #d7d7d7;
--light-gray2: #e0e0e0;
--light-gray3: #e7e7e7;
--light-gray4: #f0f0f0;
--light-gray5: #f8f8f8;
--text-color: #f8f8f8;
--text-color-deemphasise: #8a9ba8;
--text-color-emphasise: #f5f8fa;





VEGA_RED = 'var(--vega-red)',
VEGA_GREEN = 'var(--vega-green)',
VEGA_YELLOW = 'var(--vega-yellow)',
VEGA_ORANGE = 'var(--vega-orange)',
VEGA_BLUE = 'var(--vega-blue)',
VEGA_PINK = 'var(--vega-pink)',
INTENT_SUCCESS = 'var(--intent-success)',
INTENT_WARNING = 'var(--intent-warning)',
INTENT_DANGER = 'var(--intent-danger)',
BLACK = 'var(--black)',
WHITE = 'var(--white)',
DARK_GRAY_1 = 'var(--dark-gray1)',
DARK_GRAY_2 = 'var(--dark-gray2)',
DARK_GRAY_3 = 'var(--dark-gray3)',
DARK_GRAY_4 = 'var(--dark-gray4)',
DARK_GRAY_5 = 'var(--dark-gray5)',
GRAY_1 = 'var(--gray1)',
GRAY_2 = 'var(--gray2)',
GRAY_3 = 'var(--gray3)',
GRAY_4 = 'var(--gray4)',
GRAY_5 = 'var(--gray5)',
LIGHT_GRAY_1 = 'var(--light-gray1)',
LIGHT_GRAY_2 = 'var(--light-gray2)',
LIGHT_GRAY_3 = 'var(--light-gray3)',
LIGHT_GRAY_4 = 'var(--light-gray4)',
LIGHT_GRAY_5 = 'var(--light-gray5)',
TEXT_COLOR = 'var(--text-color)',
TEXT_COLOR_DEEMPHASISE = 'var(--text-color-deemphasise)',
TEXT_COLOR_EMPHASISE = 'var(--text-color-emphasise)',
