import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "save-to-designs": {
          "0%": { 
            transform: "translate(50%, 50%)",
            opacity: "1"
          },
          "100%": { 
            transform: "translate(calc(50vw - 100px), 0)",
            opacity: "0"
          }
        },
        "save-to-cart": {
          "0%": { 
            transform: "translate(50%, 50%)",
            opacity: "1"
          },
          "100%": { 
            transform: "translate(calc(100vw - 50px), 0)",
            opacity: "0"
          }
        }
      },
      animation: {
        "save-to-designs": "save-to-designs 1s ease-out forwards",
        "save-to-cart": "save-to-cart 1s ease-out forwards"
      }
    }
  }
} satisfies Config;
