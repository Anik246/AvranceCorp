import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "error" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[var(--color-primary)] text-[var(--color-text-inverse)]",
  accent:  "bg-[var(--color-accent)] text-[var(--color-text-inverse)]",
  success: "bg-[var(--color-success)] text-[var(--color-text-inverse)]",
  warning: "bg-[var(--color-warning)] text-[var(--color-text-inverse)]",
  error:   "bg-[var(--color-error)] text-[var(--color-text-inverse)]",
  neutral: "bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
};

function Badge({ variant = "neutral", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
