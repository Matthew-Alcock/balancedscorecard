/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // Includes all files in the app directory
    "./components/**/*.{js,ts,jsx,tsx}", // Includes all files in the components directory
    "./app/**/*.{html,js}",            // Include any additional HTML or JS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

