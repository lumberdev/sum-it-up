/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Path to all template files
    // if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "1rem",
      sm: "1.2rem",
      base: ["1.4rem", "2.1rem"],
      lg: "1.6rem",
      xl: "1.8rem",
      "2xl": "3.6rem",
      "3xl": "5.4rem",
    },
    extend: {
      fontSize: {
        heading1: `4.4rem`,
        heading2: `3.2rem`,
        heading3: `2.4rem`,
        heading4: `1.6rem`,
        paragraph: `1.4rem`,
      },
      fontFamily: {
        Spline: ["Spline Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        splineSans: ["Spline Sans", "sans-serif"],
      },
      colors: {
        dark: `#161613`,
        medium: `#B4B4B4`,
        light: `#CBCBCB`,
        primary: `#3A2ADC`,
        background: `#F5F5ED`,
      },
      animation: {
        shine: "shine 1s",
        fadeIn: "fadeIn 0.5s forwards",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
