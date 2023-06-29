module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
};
