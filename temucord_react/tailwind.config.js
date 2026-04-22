/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // AQUÍ AGREGAMOS LA IMAGEN PERSONALIZADA
      backgroundImage: {
        'temucord-pattern': "url('./src/assets/fondo-temucord.png')",
      },
      // También agregaremos el color principal que definiste para el botón
      colors: {
        temucord: {
          button: '#4e7a97',
          'button-hover': '#3d637a',
          bg: '#7ba4c4', // El color plano de fondo por si no carga la imagen
        }
      }
    },
  },
  plugins: [],
}