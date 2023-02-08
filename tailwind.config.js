/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Path to all template files
    // if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        heading1: `2.75rem`,
        heading2: `2rem`,
        heading3: `1.5rem`,
        heading4: `1rem`,
        paragraph: `0.875rem`,
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        dark: `#161613`,
        medium: `#B4B4B4`,
        light: `#CBCBCB`,
        primary: `#3A2ADC`,
        background: `#F5F5ED`,
      },
    },
  },
  plugins: [],
};
