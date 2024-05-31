/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#8C39FF',
        'dark-purple': '#18132B',
        'pink': '#FF005C',
        'black': '#131313',
        'white': '#FCFAF9',
        'dark-blue': '#130F22',
        'gray': '#8C8995',
        'green': '#52ED39',
        'orange': '#FF380D',
        'blue': '#1271FF'
      }
    }
  },
  plugins: [],
}

