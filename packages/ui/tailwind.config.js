/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "stable-hay": "#f9e0bd",
        "sheer-apricot": "#f2c99e",
        "android-green": "#a4c83f",
      },
    },
  },
  plugins: [],
};
