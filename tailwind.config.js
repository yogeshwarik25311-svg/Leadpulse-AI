/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: "#0b0b0c", // or whatever dark hex code your app uses
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.3)",
      },
    },
  },
  plugins: [],
}

