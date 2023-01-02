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
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FCFBFB',
          500: '#ECE7E2',
          600: '#D6CBC0',
          700: '#C0AF9E',
          800: '#A9937C',
          900: '#90775E',
        },
        'fuscous-gray': {
          DEFAULT: '#514E40',
          50: '#AFAB9A',
          100: '#A6A28E',
          200: '#948F77',
          300: '#7F7A64',
          400: '#686452',
          500: '#514E40',
          600: '#323027',
          700: '#12120E',
          800: '#000000',
          900: '#000000',
        },
        'blue-smoke': {
          DEFAULT: '#7E8E86',
          50: '#E0E4E2',
          100: '#D5DAD8',
          200: '#BFC7C3',
          300: '#A9B4AF',
          400: '#94A19A',
          500: '#7E8E86',
          600: '#63716A',
          700: '#49534E',
          800: '#2F3532',
          900: '#141716',
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
