/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        "secondary-light": "var(--secondary-light)",
        "card-bg": "var(--card-bg)",
        "input-bg": "var(--input-bg)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        pretendard: ["Pretendard Variable", "system-ui", "sans-serif"],
        lotteria: ["LOTTERIA CHAB", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.15)",
        button: "0 4px 12px rgba(240, 100, 161, 0.4)",
      },
    },
  },
  plugins: [],
};
