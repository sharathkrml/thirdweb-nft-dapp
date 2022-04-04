module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      backgroundImage:{
        'background':'url(/background.png)'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')

  ],
};
