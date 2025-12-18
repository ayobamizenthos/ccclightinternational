import type { Config } from "tailwindcss";
import animatePlugin from 'tailwindcss-animate';

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Outfit', 'DM Sans', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.18em',
        'editorial': '0.06em',
        'wide': '0.12em',
        'ultra': '0.25em',
      },
      lineHeight: {
        'luxury': '1.85',
        'tight': '1.15',
        'display': '0.95',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          warm: "hsl(var(--background-warm))",
          cream: "hsl(var(--background-cream))",
          ivory: "hsl(var(--background-ivory))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          soft: "hsl(var(--foreground-soft))",
          muted: "hsl(var(--foreground-muted))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          light: "hsl(var(--tertiary-light))",
          dark: "hsl(var(--tertiary-dark))",
          foreground: "hsl(var(--tertiary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          light: "hsl(var(--accent-light))",
          dark: "hsl(var(--accent-dark))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Celestial Slate Blue Spectrum (from exterior roof)
        celestial: {
          DEFAULT: "hsl(var(--celestial))",
          deep: "hsl(var(--celestial-deep))",
          mid: "hsl(var(--celestial-mid))",
          light: "hsl(var(--celestial-light))",
          sky: "hsl(var(--celestial-sky))",
          pale: "hsl(var(--celestial-pale))",
        },
        // Rich Mahogany Spectrum (from interior wood panels)
        mahogany: {
          DEFAULT: "hsl(var(--mahogany))",
          deep: "hsl(var(--mahogany-deep))",
          warm: "hsl(var(--mahogany-warm))",
          light: "hsl(var(--mahogany-light))",
          pale: "hsl(var(--mahogany-pale))",
        },
        // Burgundy Spectrum (from pillars)
        burgundy: {
          DEFAULT: "hsl(var(--burgundy))",
          deep: "hsl(var(--burgundy-deep))",
          mid: "hsl(var(--burgundy-mid))",
          light: "hsl(var(--burgundy-light))",
          rose: "hsl(var(--burgundy-rose))",
        },
        // Terracotta Spectrum (from brick facade)
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          deep: "hsl(var(--terracotta-deep))",
          warm: "hsl(var(--terracotta-warm))",
          light: "hsl(var(--terracotta-light))",
        },
        // Divine Gold Spectrum (from chandeliers)
        gold: {
          DEFAULT: "hsl(var(--gold))",
          deep: "hsl(var(--gold-deep))",
          light: "hsl(var(--gold-light))",
          bright: "hsl(var(--gold-bright))",
          pale: "hsl(var(--gold-pale))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-luxury': 'radial-gradient(at 20% 20%, hsl(42 85% 48% / 0.08) 0%, transparent 50%), radial-gradient(at 80% 30%, hsl(198 38% 42% / 0.08) 0%, transparent 50%), radial-gradient(at 50% 80%, hsl(15 48% 26% / 0.06) 0%, transparent 50%)',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'gold': 'var(--shadow-gold)',
        'gold-lg': 'var(--shadow-gold-lg)',
        'gold-glow': 'var(--shadow-gold-glow)',
        'celestial': 'var(--shadow-celestial)',
        'celestial-glow': 'var(--shadow-celestial-glow)',
        'mahogany': 'var(--shadow-mahogany)',
        'burgundy': 'var(--shadow-burgundy)',
      },
      backdropBlur: {
        'xs': '2px',
        'luxury': '24px',
        '3xl': '64px',
        '4xl': '80px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px hsl(42 85% 48% / 0.2)" },
          "50%": { boxShadow: "0 0 60px hsl(42 85% 48% / 0.4)" },
        },
        "celestial-pulse": {
          "0%, 100%": { boxShadow: "0 0 30px hsl(198 38% 42% / 0.2)" },
          "50%": { boxShadow: "0 0 60px hsl(198 38% 42% / 0.4)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(42 85% 48% / 0.25)" },
          "50%": { boxShadow: "0 0 50px hsl(42 85% 48% / 0.5)" },
        },
        "cross-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 15px hsl(42 85% 48% / 0.35))" },
          "50%": { filter: "drop-shadow(0 0 35px hsl(42 85% 48% / 0.65))" },
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.95" },
        },
        "divine-glow": {
          "0%, 100%": { opacity: "0.35", filter: "blur(60px)" },
          "50%": { opacity: "0.65", filter: "blur(80px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        "accordion-up": "accordion-up 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        "fade-in": "fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-up": "slide-up 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slide-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-left": "slide-in-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "celestial-pulse": "celestial-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-subtle": "float-subtle 5s ease-in-out infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "pulse-gold": "pulse-gold 4s ease-in-out infinite",
        "cross-glow": "cross-glow 4s ease-in-out infinite",
        "breathe": "breathe 5s ease-in-out infinite",
        "divine-glow": "divine-glow 12s ease-in-out infinite",
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
