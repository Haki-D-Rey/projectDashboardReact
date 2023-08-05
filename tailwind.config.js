/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111318',
        secondary: '#1F222B',
        tertiary: '#2E8E9E',
        primaryText: '#F5F5F5',
        secondaryText: '#BDBDBD',
        specialText: '#D3B123',
        divider: '#94A3B8',
        info: '#0CA5E9',
        accent: '#4FE8D0',
        navSi: '#1F222B',
        primaryLigth: '#2E8E9E',
        primaryDark: '#1F222B',
        BackgroundLigth: '#DBDBDB',
        BackgroundDark: '#111318',
      },
    },
  },
  daisyui: {
    themes: [
      {
        'barter-capital': {
          primary: '#040D19',
          secondary: '#071426',
          accent: '#4FE8D0',
          neutral: '#FFFFFF',
          'base-100': '#0F172A',
          info: '#0CA5E9',
          normal: '#FFFFFF',
          success: '#27D323',
          warning: '#CC3300',
          error: '#FB7085',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
