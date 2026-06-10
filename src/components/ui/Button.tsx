import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Size, Variant } from "@/types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   "bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-light)] focus-visible:ring-[var(--color-primary)]",
  secondary: "bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-light)] focus-visible:ring-[var(--color-accent)]",
  outline:   "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-text-inverse)] focus-visible:ring-[var(--color-primary)]",
  ghost:     "text-[var(--color-primary)] hover:bg-[var(--color-bg-subtle)] focus-visible:ring-[var(--color-primary)]",
  danger:    "bg-[var(--color-error)] text-[var(--color-text-inverse)] hover:opacity-90 focus-visible:ring-[var(--color-error)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium",
          "transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
