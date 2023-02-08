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
        darkest: `#373737`,
        dark: `#5C5C5C`,
        medium: `#B4B4B4`,
        lightest: `#CBCBCB`,
        primaryDark: `#2c5071`,
        primary: `#6384a2`,
      },
    },
  },
  plugins: [],
};
