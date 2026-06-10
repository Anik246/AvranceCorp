import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[var(--color-text-muted)]">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]",
              "px-3 py-2.5 text-sm text-[var(--color-text-primary)]",
              "placeholder:text-[var(--color-text-muted)]",
              "outline-none transition-colors duration-150",
              "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 text-[var(--color-text-muted)]">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-xs text-[var(--color-error)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
