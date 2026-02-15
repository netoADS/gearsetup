/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        primary: "#3b82f6",
        softwhite: "#e2e8f0",
        accent: "#8b5cf6",
        neon: "#34d399",
      },
    },
  },
  plugins: [],
}
