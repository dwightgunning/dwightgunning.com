/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
    extend: {
      colors: {
        // https://www.tailwindshades.com
        pampas: {
          DEFAULT: '#ECE7E2',
          50: '#FEFEFE',
          100: '#FCFBFB',
          200: '#F8F6F4',
          300: '#F4F1EE',
          400: '#F0ECE8',
          500: '#ECE7E2',
          600: '#D2C7BA',
          700: '#B8A792',
          800: '#9D896A',
          900: '#77684E',
        },
        armadillo: {
          DEFAULT: '#464337',
          50: '#E3E1DB',
          100: '#D3D1C7',
          200: '#B4B09F',
          300: '#948F77',
          400: '#6E6956',
          500: '#464337',
          600: '#3D3B30',
          700: '#35332A',
          800: '#2C2A23',
          900: '#24221C',
        },
        'blue-smoke': {
          DEFAULT: '#63716A',
          50: '#DADFDD',
          100: '#CDD3D0',
          200: '#B2BBB6',
          300: '#97A39D',
          400: '#7B8C84',
          500: '#63716A',
          600: '#525E58',
          700: '#424B46',
          800: '#313834',
          900: '#202523',
        },
      },
      fontFamily: {
        ...fontFamily,
        sans: ['Tahoma', 'Verdana', 'Segoe', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'Lucida Sans Typewriter', 'Lucida Typewriter', 'monospace'],
      },
    },
  },
  plugins: [],
};
