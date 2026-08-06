/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
