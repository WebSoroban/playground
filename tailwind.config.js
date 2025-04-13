/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stellar: {
          blue: '#3E1BDB',
          purple: '#9D41EB',
          black: '#000000',
          gray: '#F7F7F7',
        },
      },
    },
  },
  plugins: [],
};
