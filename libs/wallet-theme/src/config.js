module.exports = {
  screens: {
    xs: '500px',
    sm: '640px',
    md: '768px',
    lg: '960px',
    xl: '1280px',
    xxl: '1536px',
  },
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: '#101010',
    white: '#fff',
    danger: {
      DEFAULT: '#A90900',
      light: '#FF261A',
    },
    warning: {
      DEFAULT: '#D75200',
      light: '#FF7A1A',
    },
    success: {
      DEFAULT: '#00944d',
      light: '#00F780',
    },
    yellow: {
      DEFAULT: '#D7FB50',
      dark: '#9BE106',
    },
    orange: {
      DEFAULT: '#D9822B',
    },
    pink: {
      DEFAULT: '#FF077F',
      dark: '#CF0064',
    },
    green: {
      DEFAULT: '#00F780',
      dark: '#00D46E',
    },
    blue: {
      DEFAULT: '#0075FF',
      dark: '#0046CD',
    },
    purple: {
      DEFAULT: '#8028FF',
      dark: '#5D0CD2',
    },
    dark: {
      100: '#161616',
      200: '#404040',
      300: '#626262',
      400: '#8B8B8B',
      500: '#C0C0C0',
    },
    light: {
      100: '#F0F0F0',
      200: '#D2D2D2',
      300: '#A7A7A7',
      400: '#626262',
    },
    neutral: {
      DEFAULT: '#6E6E6E',
      light: '#A7A7A7',
    },
    emphasise: '#F5F8fA',
    deemphasise: '#8A9BA8',
    primary: {
      DEFAULT: '#48aff8',
    },
    overlay: 'rgba(54, 54, 54, 0.8)',
    vega: {
      // YELLOW
      yellow: {
        700: '#23290E',
        650: '#515E1E',
        600: '#7E932F',
        550: '#ABC840',
        DEFAULT: '#D7FB50',
        500: '#D7FB50',
        450: '#E0FC75',
        400: '#E8FD9A',
        350: '#F0FDBE',
        300: '#F9FEE3',
      },

      // GREEN
      green: {
        700: '#012915',
        650: '#015D30',
        600: '#01914B',
        550: '#01C566',
        DEFAULT: '#00F780',
        500: '#00F780',
        450: '#37F99B',
        400: '#6CFAB6',
        350: '#A1FCD0',
        300: '#D6FEEB',
      },

      // BLUE
      blue: {
        700: '#01142A',
        650: '#012C60',
        600: '#014595',
        550: '#015ECB',
        DEFAULT: '#0075FF',
        500: '#0075FF',
        450: '#3793FF',
        400: '#6CAFFF',
        350: '#A1CCFF',
        300: '#D6E9FF',
      },

      // PURPLE
      purple: {
        700: '#15072A',
        650: '#301060',
        600: '#4B1895',
        550: '#6620CB',
        DEFAULT: '#8028FF',
        500: '#8028FF',
        450: '#9B56FF',
        400: '#B683FF',
        350: '#D0B0FF',
        300: '#EBDDFF',
      },

      // PINK
      pink: {
        700: '#210215',
        650: '#600330',
        600: '#95054B',
        550: '#CB0666',
        DEFAULT: '#FF077F',
        500: '#FF077F',
        450: '#FF3C9A',
        400: '#FF70B5',
        350: '#FFA3D0',
        300: '#FFD7EA',
      },

      // ORANGE
      orange: {
        700: '#2A1701',
        650: '#603301',
        600: '#954F01',
        550: '#CB6C01',
        DEFAULT: '#FF8700',
        500: '#FF8700',
        450: '#FFA137',
        400: '#FFBA6C',
        350: '#FFD3A1',
        300: '#FFECD6',
      },

      // DARK
      dark: {
        100: '#161616',
        150: '#262626',
        200: '#404040',
        300: '#8B8B8B',
        400: '#C0C0C0',
      },

      // LIGHT
      light: {
        100: '#F0F0F0',
        150: '#E9E9E9',
        200: '#D2D2D2',
        300: '#939393',
        400: '#626262',
      },
    },
  },
  spacing: {
    1: '2px',
    2: '6px',
    3: '10px',
  },
  fontSize: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    xl: '18xp',
    '2xl': '22px',
    '3xl': '24px',
    '4xl': '30px',
  },
  letterSpacing: {
    tightest: '-.075em',
    tighter: '-.05em',
    tight: '-.025em',
    normal: '0',
    wide: '.025em',
    wider: '.05em',
    widest: '.3em',
  },
  fontFamily: {
    mono: ['Roboto Mono', 'monospace'],
    sans: [
      '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    ],
    alpha: [
      'AlphaLyrae, "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      { fontFeatureSettings: '"calt" 0, "liga" 0' },
    ],
  },
}
