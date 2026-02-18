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
        // NEXOS: Palette La Table de Marguerite — Chaleureux organique, textures vivantes
        olive: {
          50: "#F5F6F2",
          100: "#E8EBE0",
          200: "#D1D7C1",
          300: "#B3BCA0",
          400: "#7A8B64",
          500: "#6B7D58",
          600: "#4A5A3C",
          700: "#3A4730",
          800: "#2B3524",
          900: "#1C2317",
        },
        terra: {
          50: "#FDF5EE",
          100: "#FAE8D5",
          200: "#F5D0AB",
          300: "#EFB580",
          400: "#D4854A",
          500: "#B06830",
          600: "#8F5226",
          700: "#73421E",
          800: "#573217",
          900: "#3B2210",
        },
        prune: {
          50: "#F8F2F6",
          100: "#EFE2EA",
          200: "#DFC5D5",
          300: "#CDA7BF",
          400: "#A97292",
          500: "#874873",
          600: "#6B3A5E",
          700: "#552E4A",
          800: "#402337",
          900: "#2A1724",
        },
        cream: {
          50: "#FFFFFF",
          100: "#FEFDFB",
          200: "#FBF7F0",
          300: "#F5EDE0",
          400: "#E0D4BE",
          500: "#C4B494",
          600: "#9A8A6E",
          700: "#8E7E68",
          800: "#655949",
          900: "#3C352C",
        },
        bark: {
          DEFAULT: "#3C2E24",
          light: "#4A3B2E",
          dark: "#2A1F17",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        simmer: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "0.7", transform: "scaleY(1.15)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-left": "fade-in-left 0.6s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        simmer: "simmer 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(74,90,60,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,90,60,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
