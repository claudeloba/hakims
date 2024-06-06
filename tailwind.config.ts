import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          100: "#e3ccda",
          200: "#c899b5",
          300: "#ac6690",
          400: "#91336b",
          500: "#750046",
          600: "#5e0038",
          700: "#46002a",
          800: "#2f001c",
          900: "#17000e",
        },
        beige: {
          100: "#fefcfa",
          200: "#fdf9f5",
          300: "#fcf7ef",
          400: "#fbf4ea",
          500: "#faf1e5",
          600: "#c8c1b7",
          700: "#969189",
          800: "#64605c",
          900: "#32302e",
        },
        "dark-green": {
          100: "#ccd8d4",
          200: "#99b1a9",
          300: "#668b7f",
          400: "#336454",
          500: "#003d29",
          600: "#003121",
          700: "#002519",
          800: "#001810",
          900: "#000c08",
        },
        orange: {
          100: "#ffe2ce",
          200: "#ffc69d",
          300: "#ffa96b",
          400: "#ff8d3a",
          500: "#ff7009",
          600: "#cc5a07",
          700: "#994305",
          800: "#662d04",
          900: "#331602",
        },
        price: {
          100: "#feddde",
          200: "#fdbabe",
          300: "#fb989d",
          400: "#fa757d",
          500: "#f9535c",
          600: "#c7424a",
          700: "#953237",
          800: "#642125",
          900: "#321112",
        },
        "primary-gray": {
          500: "#F6F7F8",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
