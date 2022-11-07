/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial',
          'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      colors: {
        'blue':'#0C9DA4',
        'yellow' :'#F89747',
        'red' :'#BB2026',
        'green' :'#07A04A',
        'white-221': '#ddd'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
