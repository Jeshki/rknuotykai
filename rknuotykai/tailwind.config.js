/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Labai svarbu, kad Tailwind nuskaitytų visas klases
  ],
  theme: {
    extend: {
      fontFamily: {
              'poppins': ['"Poppins"', 'sans-serif'], // Added Poppins font
      },
      // Jei naudojate spalvas, kurios nėra default Tailwind paletėje,
      // turėsite jas apibrėžti čia.
      // Pvz., jei `neutral-200`, `emerald-950`, `slate-900`, `slate-700`,
      // `gray-800`, `slate-100`, `slate-800`, `gray-300`, `gray-600`,
      // `gray-100`, `slate-950`, `gray-500` nėra jau apibrėžtos,
      // Tailwind gali jų neįtraukti į galutinį CSS.
      // Tačiau didžioji dalis šių spalvų yra numatytosios Tailwind paletės dalis.
      colors: {
        'neutral-200': '#e5e5e5', // Pavyzdys, jei nėra numatytojo
        'emerald-950': '#064e3b', // Pavyzdys
        'slate-900': '#0f172a',  // Pavyzdys
        'slate-700': '#334155',  // Pavyzdys
        'slate-800': '#1e293b',  // Pavyzdys
        'slate-100': '#f1f5f9',  // Pavyzdys
        'gray-800': '#1f2937',   // Pavyzdys
        'gray-300': '#d1d5db',   // Pavyzdys
        'gray-600': '#4b5563',   // Pavyzdys
        'gray-100': '#f3f4f6',   // Pavyzdys
        'slate-950': '#020617',  // Pavyzdys
        'gray-500': '#6b7280',   // Pavyzdys
        'orange-500': '#f97316', // Pavyzdys
        'red-500': '#ef4444',    // Pavyzdys
      }
    },
  },
  plugins: [],
}