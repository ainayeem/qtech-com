/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customYellow: "#fcc137",
        customYellowHover: "#e0a828",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["light"] },
};
