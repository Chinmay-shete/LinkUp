/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./views/**/*.ejs", "./public/js/**/*.js"],
   theme: {
     extend: {
       fontFamily: {
         sans: ["'DM Sans'", "system-ui", "sans-serif"],
         serif: ["'Instrument Serif'", "Georgia", "serif"],
       }
     },
   },
   plugins: [],
}