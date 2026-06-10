import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]",
        "shadow-[var(--shadow-sm)]",
        hoverable && "transition-shadow duration-200 hover:shadow-[var(--shadow-md)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 pb-0", className)} {...props}>
      {children}
    </div>
  );
}

function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-t border-[var(--color-border)] p-5 pt-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, CardHeader, CardBody, CardFooter };
export type { CardProps };
