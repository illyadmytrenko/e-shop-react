import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      animation: {
        "slide-down": "slideDown 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-in",
        "slide-in": "slideIn 0.8s ease-out",
        "slide-out": "slideOut 0.8s ease-in",
      },
      keyframes: {
        slideDown: {
          "0%": {
            opacity: "0",
            left: "50%",
            transform: "translateX(-50%) translateY(-100%)",
          },
          "100%": {
            opacity: "1",
            left: "50%",
            transform: "translateX(-50%) translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            opacity: "1",
            left: "50%",
            transform: "translateX(-50%) translateY(0)",
          },
          "100%": {
            opacity: "0",
            left: "50%",
            transform: "translateX(-50%) translateY(-100%)",
          },
        },
        slideIn: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
