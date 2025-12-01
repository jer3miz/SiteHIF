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
          300: '#B086E6',
          400: '#8B5FD6',
          500: '#6D3FA8',
          600: '#300F59',
          700: '#2A0D4D',
          800: '#240B41',
          900: '#1E0836',
          950: '#150523',
        },
      },
    },
  },
  plugins: [],
}

