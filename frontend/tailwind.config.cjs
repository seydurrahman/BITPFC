module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          600: "#4f46e5",
        },
      },
      keyframes: {
        bounceLR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        bounceLR: "bounceLR 4s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
