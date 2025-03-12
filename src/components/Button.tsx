
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  size = "default",
  children,
  className,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-sm":
            variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "h-10 px-5 py-2": size === "default",
          "h-8 px-3 text-sm": size === "sm",
          "h-12 px-8 text-lg": size === "lg",
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
