/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      exs: '400px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      md2: '800px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
      '4xl': '1900px',
    },
    extend: {
      fontFamily: {
        notoSans: ['Noto Sans', 'sans-serif'],
        pretendard: ['Pretendard', 'Roboto', 'sans-serif'],
        DMSerif: ['DM Serif Text', 'sans-serif']
      },
      colors: {
        white: '#FFFFFF',
        gray_5: '#FBFBFB',
        gray_10: '#F5F5F5',
        gray_20: '#E1E1E1',
        gray_30: '#CCCCCC',
        gray_40: '#A6A6A6',
        gray_50: '#959595',
        gray_60: '#6A6A6A',
        gray_80: '#383838',
        black: '#000000',
        deepCatchC: {
          line: '#57295A'
        }
      },
    },
  },
  plugins: [],
};
