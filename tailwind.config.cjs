/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    // https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
    extend: {
      fontFamily: {
        ...fontFamily,
        sans: ['Tahoma', 'Verdana', 'Segoe', 'sans-serif'],
        mono: ['Courier New', 'Courier', 'Lucida Sans Typewriter', 'Lucida Typewriter', 'monospace'],
      },
      colors: {
        armadillo: {
          DEFAULT: '#464337',
          50: '#EDECE8',
          100: '#DDDCD4',
          200: '#BCB8A9',
          300: '#9A957E',
          400: '#726D5A',
          500: '#464337',
          600: '#39372D',
          700: '#2B2922',
          800: '#1D1B16',
          900: '#0E0E0B',
        },
        fern: {
          DEFAULT: '#53621B',
          50: '#FAFCF3',
          100: '#ECF3D3',
          200: '#D0E193',
          300: '#B5D053',
          400: '#8AA42D',
          500: '#53621B',
          600: '#475417',
          700: '#394413',
          800: '#2C340E',
          900: '#1E240A',
        },
      },
    },
  },
  plugins: [],
};
