/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to match your project's structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary & Secondary Solids
        primarySolid: "#0147B9",   // Solid Primary Color
        secondary: "#041139",      // Secondary Background
        secondaryHover: "#041150",      // Secondary Background
      },
      backgroundImage: {
        primary: "radial-gradient(107.86% 70.84% at 52.33% 52.59%, #0147B9 0%, #051948 100%)",
        // customGradient: 'linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)',
        customGradient: "linear-gradient(117deg, rgba(255, 255, 255, 0.00) -3.91%, rgba(255, 255, 255, 0.04) 75.27%)",

      },
      backdropBlur: {
        21: '21px',
      },
      strokeWidth: {
        2: '2px',
      },
    },
  },
  plugins: [],
};

