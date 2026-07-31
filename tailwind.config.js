/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        google: {
          blue:   '#1a73e8',
          green:  '#188038',
          yellow: '#f9ab00',
          red:    '#d93025',
        },
        surface: {
          page: '#f8f9fa',
          card: '#ffffff',
          hover: '#f1f3f4',
        },
        border: {
          subtle:  '#e8eaed',
          default: '#dadce0',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(60,64,67,0.12), 0 1px 2px rgba(60,64,67,0.08)',
        'card-hover': '0 2px 6px rgba(60,64,67,0.10), 0 1px 2px rgba(60,64,67,0.08)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
      },
    },
  },
  plugins: [],
}
