/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      colors: {
        surface: '#f6f8fc',
        ink: '#0b1220',
        muted: '#5b6577',
        line: '#e6e9f0',
        iosBg: '#f2f2f7',
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#059669',
          600: '#047857',
          700: '#065f46',
          800: '#064e3b',
          900: '#022c22',
        },
      },
      borderRadius: {
        ios: '12px',
        card: '16px',
        sheet: '24px',
      },
      boxShadow: {
        ios: '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'ios-sheet': '0 -4px 24px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
