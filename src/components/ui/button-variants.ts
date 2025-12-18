import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] touch-manipulation",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/20 hover:shadow-xl hover:shadow-destructive/30",
        outline: "border-2 border-border bg-background/60 backdrop-blur-xl hover:bg-gold/5 hover:border-gold/40 hover:text-gold transition-all duration-400",
        secondary:
          "bg-gradient-to-r from-secondary-dark via-secondary to-secondary-light text-white shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5",
        ghost: "hover:bg-gold/8 hover:text-gold transition-all duration-400",
        link: "text-gold underline-offset-4 hover:underline font-medium",
        gold:
          "relative overflow-hidden bg-gradient-to-r from-gold-deep via-gold to-gold-light text-secondary font-bold shadow-lg shadow-gold/25 hover:shadow-xl hover:shadow-gold/40 hover:-translate-y-0.5 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-lg",
        "outline-gold": "border-2 border-gold/30 bg-transparent text-gold hover:bg-gold/10 hover:border-gold/60 transition-all duration-400",
        celestial:
          "bg-gradient-to-r from-celestial-deep via-celestial to-celestial-light text-white shadow-lg shadow-celestial/20 hover:shadow-xl hover:shadow-celestial/30 hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-7 py-3",
        sm: "h-10 rounded-xl px-5 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base tracking-wide",
        xl: "h-16 rounded-2xl px-12 text-base tracking-wide",
        icon: "h-12 w-12 rounded-xl",
        "icon-sm": "h-10 w-10 rounded-lg",
        "icon-lg": "h-14 w-14 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  haptic?: boolean;
};
