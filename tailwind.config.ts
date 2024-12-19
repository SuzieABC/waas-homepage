import type { Config } from "tailwindcss";

const fonts = [
  "pretendardLight",
  "pretendardRegular",
  "pretendardMedium",
  "pretendardSemibold",
  "pretendardBold",
  "pretendardExtrabold",
  "dmSansRegular",
  "dmSansMedium",
  "dmSansSemibold",
  "dmSansBold",
]

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      willChange: {
        transform: 'transform',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: Object.fromEntries(fonts.map((font) => [font, [`var(--font-${font})`]])),
      screens: {
        // 최대 너비로 범위 설정
        sm: { min: "0px", max: "699px" }, // 0 ~ 360px
        md: { min: "700px", max: "1439px" }, // 700px ~ 1440px
        lg: { min: "1440px", max: "1919px" }, // 1440px ~ 1920px
        xl: { min: "1920px" }, // 1920px 이상
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }, // 위로 10px 이동
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite', // 3초 주기로 반복
      },
    },
  },
  plugins: [],
};
export default config;
