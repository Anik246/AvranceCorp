import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]",
            "px-3 py-2.5 text-sm text-[var(--color-text-primary)]",
            "outline-none transition-colors duration-150",
            "focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239aa5b4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]",
            "pr-10",
            error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-xs text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export type { SelectProps, SelectOption };
