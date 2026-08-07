/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05070d',
          900: '#0a0e1a',
          800: '#111627',
          700: '#1a2036',
        },
        gold: {
          400: '#f2c464',
          500: '#e8b34a',
          600: '#c8933a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
}
