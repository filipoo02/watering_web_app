/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-0': '#F8F9F6',
        'primary-10': '#EAE5DC',
        'primary-20': '#CBBFA9',
        'primary-30': '#BCAC90',
        'primary-40': '#54684B',
        'primary-60': '#485940',
        'primary-80': '#3C4A35',
        'primary-100': '#303B2B',
        'dark-10': '#E5E6E5',
        'dark-20': '#B2B4B1',
        'dark-40': '#878A84',
        'dark-60': '#6B6F68',
        'dark-80': '#3E4339',
        'dark-100': '#191F14',
        'error-40': '#FF4C4D',
        'error-60': '#FF0000',
        'error-80': '#CC0000',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem'
      }
    },
    fontFamily: {
      'poppins': ['"Poppins", "sans-serif"'],
      'roboto': ['"Roboto", "sans-serif"']
    }
  },
  plugins: [],
}
