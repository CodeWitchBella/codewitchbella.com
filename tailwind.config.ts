import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,html}", "./blog/**/*.mdx"],
  theme: {
    extend: {},
  },
  plugins: [typography, forms],
} satisfies Config;
