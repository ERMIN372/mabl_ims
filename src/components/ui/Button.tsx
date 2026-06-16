import Link from "next/link";
import { forwardRef } from "react";

// Кнопка дизайн-системы МАБЛ. Умеренные радиусы, без «пластиковости».
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-token font-semibold tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ocean-600 text-white hover:bg-ocean-700",
  secondary:
    "border border-oil-300 bg-white text-oil-900 hover:border-oil-900 hover:bg-oil-50",
  ghost: "text-ocean-700 hover:bg-ocean-50",
  danger: "border border-oil-300 bg-white text-oil-900 hover:border-oil-900",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth, className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";

interface ButtonLinkProps extends CommonProps {
  href: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}
