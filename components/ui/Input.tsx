"use client";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-cyber-muted tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "glass-input w-full px-3.5 py-2.5 text-sm text-cyber-text rounded-lg",
            "placeholder:text-cyber-muted/50",
            "transition-all duration-200",
            "focus:outline-none",
            error && "border-cyber-red/60 focus:border-cyber-red focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-cyber-red mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-cyber-muted mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
