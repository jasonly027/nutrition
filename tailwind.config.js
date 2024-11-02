/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tblue": "#228CDB",
        "lavender": "#DDDBF1",
        "cerulean": "#0B7189"
      }
    },
  },
  plugins: [],
};
