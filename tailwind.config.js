/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08080a",
        surface: "#101013",
        line: "#1f1f26",
        amber: "#f5c842",
        accent: "#f97316",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};

