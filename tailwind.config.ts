import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

// Tailwind v4+ config: no content[] needed, PostCSS plugin handles scanning.
// Keep theme extensions and plugins as-is.
const config: Config = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        // 🌿 Primary green tones
        green: {
          400: "#2ECC71", // soft green for highlights
          500: "#24AE7C", // main brand green
          600: "#0D2A1F", // dark green for hover/backgrounds
        },

        // 💧 Blue accents
        blue: {
          400: "#5EB8FF", // light accent
          500: "#1E90FF", // main blue tone
          600: "#152432", // deep blue
        },

        // ⚪ Neutral whites and grays
        white: {
          DEFAULT: "#FFFFFF",
          soft: "#F9FAFB",
        },

        light: {
          100: "#F3F4F6",
          200: "#E8E9E9",
        },

        dark: {
          100: "#0B0E11",
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#2E3236",
          600: "#4B5563",
          700: "#9CA3AF",
          800: "#111827",
          900: "#0F172A",
        },

        red: {
          400: "#F87171",
          500: "#F24E43",
          600: "#3E1716",
          700: "#DC2626",
        },
      },

      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },

      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
        "light-rays": "url('/assets/images/light-rays.png')",
      },

      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.1)",
        strong: "0 8px 20px rgba(0, 0, 0, 0.2)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },

  plugins: [animate],
};

export default config;
