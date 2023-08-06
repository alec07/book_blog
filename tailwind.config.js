/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {

        'lg': {'max': '1900px'},
        // => @media (max-width: 1023px) { ... }
        'md': {'max': '900px'},
        // => @media (max-width: 767px) { ... }

        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }

        'xs': {'max': '400px'},
        // => @media (max-width: 767px) { ... }
    }
  },
  variants: {
    extend: {
      visibility: ["hover"], // Adăugăm clasa hover pentru a controla vizibilitatea butonului
    },
  },
  plugins: [],
}

