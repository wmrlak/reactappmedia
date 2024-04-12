/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {  //keyframes are used to implement an animation
        shimmer: {
          '100%': {transform: 'translateX(100%)'} //move an element 100% to the right hand side
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite' //find the shimmer rule, play it for 1,5sec and repeat it for ever
      }
    },
  },
  plugins: [],
}

