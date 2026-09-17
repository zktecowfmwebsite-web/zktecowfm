/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,tsx}',
    './*.html',
    './insights/**/*.html',
  ],
  prefix: 'tw-',
  safelist: ['tw-sr-only'],
  corePlugins: {
    // Existing site CSS owns the reset and base element styling.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'zk-navy': '#201f62',
        'zk-green': '#75bd3b',
      },
    },
  },
};
