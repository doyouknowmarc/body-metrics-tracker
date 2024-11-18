/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'rgb(229, 231, 235)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'input[type="number"], input[type="date"]': {
          appearance: 'none',
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            appearance: 'none',
            margin: 0,
          },
        },
      });
    },
  ],
};