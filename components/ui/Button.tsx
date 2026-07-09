"use client";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonVariant, ButtonSize } from "@/types";

type CombinedProps = ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<"button">;

interface ButtonProps extends CombinedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-cyber-accent/15 border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/25 hover:border-cyber-accent/60",
  secondary:
    "bg-glass-white border-glass-border text-cyber-text hover:bg-glass-hover",
  ghost:
    "border-transparent text-cyber-muted hover:text-cyber-text hover:bg-glass-white",
  danger:
    "bg-cyber-red/15 border-cyber-red/40 text-cyber-red hover:bg-cyber-red/25",
  success:
    "bg-cyber-green/15 border-cyber-green/40 text-cyber-green hover:bg-cyber-green/25",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-6 py-2.5 text-base rounded-lg",
};

const springTap = { type: "spring" as const, stiffness: 500, damping: 17, mass: 0.5 };

const MotionButton = motion.button as React.ForwardRefExoticComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<"button"> & React.RefAttributes<HTMLButtonElement>
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <MotionButton
      ref={ref}
      disabled={disabled || loading}
      whileHover={disabled || loading ? undefined : { scale: 1.03 }}
      whileTap={disabled || loading ? undefined : { scale: 0.96 }}
      transition={springTap}
      className={cn(
        "inline-flex items-center justify-center gap-2 border font-medium",
        "focus-visible:outline-2 focus-visible:outline-cyber-accent focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        "select-none",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </MotionButton>
  )
);
Button.displayName = "Button";
