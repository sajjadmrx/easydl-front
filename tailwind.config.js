module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0066ff",
        secondary: "#161B25",
        ctaGradientStart: "#176ae5",
        ctaGradientEnd: "#0066ff",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: false,
    rtl: true,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require('daisyui'), require("tailwindcss-flip")],
}
