/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
    },
    textColor: {
      accent: "var(--color-text-accent)",
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
    },
  },
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "grid-cols-6",
    "grid-cols-7",
    "grid-cols-8",
    "grid-cols-9",
    "grid-cols-10",
    "grid-cols-11",
    "grid-cols-12",
    "grid-cols-13",
    "grid-cols-14",
    "grid-cols-15",
    "grid-cols-16",
    "grid-cols-17",
    "grid-cols-18",
    "grid-cols-19",
    "grid-cols-20",
  ],
  plugins: [],
};
