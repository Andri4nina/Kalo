interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "subtle" | "danger";
  size?: "sm" | "md";
}

const variants = {
  primary:
    "bg-kalo-accent text-kalo-accent-ink hover:bg-kalo-accent-strong dark:bg-kalo-dark-accent dark:hover:bg-kalo-dark-accent-strong",
  ghost:
    "bg-transparent text-kalo-ink hover:bg-kalo-raised dark:text-kalo-dark-ink dark:hover:bg-kalo-dark-raised",
  subtle:
    "bg-kalo-raised text-kalo-ink hover:bg-kalo-line dark:bg-kalo-dark-raised dark:text-kalo-dark-ink dark:hover:bg-kalo-dark-line",
  danger:
    "bg-kalo-danger text-white hover:opacity-90 dark:bg-kalo-dark-danger dark:text-kalo-dark-canvas",
};

const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm" };

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
      {...props}
    />
  );
}
