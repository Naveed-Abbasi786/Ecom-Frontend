// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'], 
        Josefi: ['Josefi', 'sans-serif'], 
        PoppinsBold: ['PoppinsBold', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
