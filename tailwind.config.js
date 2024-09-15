/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'white': '#F7F7F7',
        'lightGray': '#EEEEEE',
        'darkGray': '#393E46',
        'steel': '#929AAB',
        'bgGray': '#D1D5D8',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-in-out',
        'slide-out': 'slideOut 0.5s ease-in-out',
        'fade-in': 'fadeIn 1s ease-in 1s',
      },
      boxShadow: {
        'custom-gray': '1px 2px 2px 2px rgb(111, 111, 111)',
      },
    },
  },
  plugins: [],
}
