/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0fc',
          100: '#e8d9f9',
          200: '#d4b8f3',
          300: '#b88deb',
          400: '#9560e0',
          500: '#7d3fd6',
          600: '#6d2fc2',
          700: '#5a25a3',
          800: '#4b2085',
          900: '#300F59',
          950: '#1f0836',
        },
      },
    },
  },
  plugins: [],
}

