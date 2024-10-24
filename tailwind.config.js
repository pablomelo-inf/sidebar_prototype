/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3730a3', // A cor primária
          light: '#c7d2fe',   // Variante clara
          dark: '#312e81',    // Variante escura
        },
        secondary: {
          DEFAULT: '#4b5563', // Cor secundária (por exemplo, para textos)
          light: '#6b7280',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
}
