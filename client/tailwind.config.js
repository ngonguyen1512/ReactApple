/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      width: {
        '1200': '1200px',
      },
      height: {
        '60': '60px',
        '50': '50px',
      },
      backgroundColor: {
        primary: "#fff",
        secondary1: "#333",
        secondary2: "#06c",
        secondary3: "#fbfbfb",
        cancel: '#ff0000',
      },
      maxWidth: {
        '600': '600px',
        '1500': '1500px',
      },
      minWidth: {
        '200': '200px',
        '1500': '1500px',
      },
      cursor: {
        pointer: 'pointer',
      },
      textColor: {
        primary: '#ff0000',
        secondary: '#06c',
        gray: '#333'
      }
    },
  },
  plugins: [],
}

