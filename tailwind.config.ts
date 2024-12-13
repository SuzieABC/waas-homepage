import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        '2xl': '1920px', // 1920px 이상
        'xl': '1440px',  // 1440px 이상
        'lg': '1024px',  // 1024px 이상
        'md': '700px',   // 700px 이상
        'sm': '360px',   // 360px 이상
      },
    },
  },
  plugins: [],
};
export default config;
