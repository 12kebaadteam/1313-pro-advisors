/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14213D',
          dark: '#0D1627',
          light: '#293B59',
          muted: '#3D5174',
        },
        cream: {
          DEFAULT: '#F4EDE0',
          ivory: '#FAF7F1',
          soft: '#EBE3D3',
          border: '#E5DED2',
        },
        coral: {
          DEFAULT: '#FF6B5B',
          deep: '#E85A4D',
          light: '#FFE4E0',
          hover: '#FA5846',
        },
        warmGrey: {
          DEFAULT: '#827F79',
          light: '#A3A09A',
          dark: '#585550',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'DM Sans', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(20, 33, 61, 0.04)',
        'card': '0 10px 30px -10px rgba(20, 33, 61, 0.07)',
        'elevated': '0 20px 40px -15px rgba(20, 33, 61, 0.12)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

