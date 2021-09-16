module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'tiny': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        para: ['15px', '1.5'],
        btn: ['15px', '1.5']
      },
      fill: theme => ({
        'red': theme('colors.red.500'),
      }),
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  