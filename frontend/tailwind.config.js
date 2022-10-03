/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#ffffff',
      'dark-blue': '#050A30',
      'navy-blue': '#000C66',
      blue: '#0000FF',
      'baby-blue': '#7EC8E3',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
