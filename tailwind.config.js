/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "576px",
      },
      colors: {
        green: {
          50: "oklch(96% 0.08 134.3)",
          100: "oklch(91% 0.09 134.3)",
          200: "oklch(85% 0.10 134.3)",
          300: "oklch(79% 0.11 134.3)",
          400: "oklch(76% 0.11 134.3)",
          500: "oklch(74% 0.11 134.3)", // ton vert principal
          600: "oklch(70% 0.11 134.3)",
          700: "oklch(63% 0.11 134.3)",
          800: "oklch(55% 0.11 134.3)",
          900: "oklch(45% 0.11 134.3)",
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ["placeholder-shown"],
        borderColor: ["placeholder-shown"],
        color: ["placeholder-shown"],
        textColor: ["placeholder-shown"],
      },
    },
  },
  plugins: [],
};
