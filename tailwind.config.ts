import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        recoleta: ["var(--font-recoleta)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
      },
      colors: {
        /* Core colors */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        /* Primary and Secondary */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        /* Muted and Accent */
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        /* Destructive */
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        /* Popover and Card */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* Charts */
        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",

        /* General colors */
        "general-white": "var(--general-white)",
        "general-black": "var(--general-black)",
        "body-text-gray": "var(--gray-text)",
        "gray-text": "var(--gray-text)",
        "text-gray": "var(--text-body)",
        "surface-card-bold": "var(--surface-card-bold)",

        /* Forms */
        "form-bg": "var(--form-bg)",
        "form-bg-gray": "var(--form-bg-gray)",

        /* Secondary Debbo Palette */
        "secondary-debbo": "var(--color-secondary-debbo)",
        "secondary-debbo1": "var(--color-secondary-debbo1)",
        "secondary-debbo2": "var(--color-secondary-debbo2)",
        "secondary-debbo3": "var(--color-secondary-debbo3)",
        "secondary-debbo4": "var(--color-secondary-debbo4)",
        "secondary-debbo5": "var(--color-secondary-debbo5)",
        "secondary-debbo6": "var(--color-secondary-debbo6)",
        "secondary-debbo7": "var(--color-secondary-debbo7)",
        "secondary-debbo8": "var(--color-secondary-debbo8)",
        "secondary-debbo9": "var(--color-secondary-debbo9)",
        "secondary-debbo10": "var(--color-secondary-debbo10)",
        "secondary-debbo11": "var(--color-secondary-debbo11)",
        "secondary-debbo-dark": "var(--color-secondary-debbo-dark)",
        "secondary-debbo-dark1": "var(--color-secondary-debbo-dark1)",
        "text-body": "var(--text-body)",

        /* Other specific colors */
        green: "var(--green)",
        yellow: "var(--yellow)",
        "light-green": "var(--light-green)",
        badge: "var(--badge)",
        "surface-card": "var(--suface-card)",

        /* Light selections and outline */
        "light-orange": "var(--light-orange)",
        "selected-light-green": "var(--selected-light-green)",
        "selected-light-yellow": "var(--selected-light-yellow)",
        "selected-light-blue": "var(--selected-light-blue)",
        "selected-light-pink": "var(--selected-light-pink)",
        "selected-light-red": "var(--selected-light-red)",
        "light-outline": "var(--light-outline)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
