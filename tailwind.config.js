/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  /* important true so that tailwind takes precedence over dsfr in production build
  we want tailwind utilities to have the final say */
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
};
