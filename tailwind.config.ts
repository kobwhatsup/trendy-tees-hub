import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        border: "hsl(var(--border))",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
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