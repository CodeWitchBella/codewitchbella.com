import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx,html}", "./blog/**/*.mdx"],
  theme: {
    extend: {},
  },
  plugins: [typography],
} satisfies Config;
