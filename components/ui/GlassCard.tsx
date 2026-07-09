"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padded?: boolean;
  asMotion?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = true, glow = false, padded = true, asMotion = false, motionProps, ...props }, ref) => {
    const baseClass = cn(
      "glass-card rounded-xl",
      hover && "transition-all duration-300 hover:border-cyber-accent/20 hover:shadow-glow",
      glow && "glow-border",
      padded && "p-5",
      className
    );

    if (asMotion) {
      return (
        <motion.div
          ref={ref as any}
          className={baseClass}
          {...motionProps}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClass} {...props}>
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, dense = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass rounded-lg",
        dense ? "p-3" : "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
GlassPanel.displayName = "GlassPanel";
