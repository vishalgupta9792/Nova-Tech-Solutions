import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))"
      },
      boxShadow: {
        glass: "0 20px 60px rgba(10, 15, 40, 0.25)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 15% 20%, rgba(22, 163, 74, 0.3), transparent 35%), radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.35), transparent 40%), linear-gradient(135deg, rgba(10, 14, 28, 0.95), rgba(9, 18, 40, 0.82))"
      }
    }
  },
  plugins: []
};

export default config;
