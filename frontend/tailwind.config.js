/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bouncePause: {
          '0%': { transform: 'translateX(0%)' },     // center
          '20%': { transform: 'translateX(0%)' },    // pause
          '40%': { transform: 'translateX(50%)' },   // right
          '80%': { transform: 'translateX(-50%)' },  // left
          '100%': { transform: 'translateX(0%)' },   // center
        },
      },
      animation: {
        bouncePause: 'bouncePause 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
