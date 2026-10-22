import { focus } from "@/design/tokens";

type Variant = "primary" | "ghost" | "subtle" | "outline" | "danger";
type Size = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants = {
  primary:
    "bg-kalo-accent text-kalo-accent-ink hover:scale-[1.03] hover:brightness-110 dark:bg-kalo-dark-accent",
  ghost:
    "bg-transparent text-kalo-muted hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink",
  subtle:
    "bg-kalo-raised text-kalo-ink hover:bg-kalo-line dark:bg-kalo-dark-raised dark:text-kalo-dark-ink dark:hover:bg-kalo-dark-line",
  outline:
    "border border-kalo-muted/60 text-kalo-ink hover:scale-[1.03] hover:border-kalo-ink dark:border-kalo-dark-muted/60 dark:text-kalo-dark-ink dark:hover:border-kalo-dark-ink",
  danger:
    "bg-kalo-danger text-white hover:opacity-90 dark:bg-kalo-dark-danger dark:text-kalo-dark-canvas",
};

const sizes = { sm: "h-8 px-4 text-xs", md: "h-10 px-5 text-sm" };

/** Classes d'un bouton pilule ; réutilisables sur un lien de navigation. */
export function buttonClass(variant: Variant = "primary", size: Size = "md", className = ""): string {
  return `${focus} inline-flex items-center justify-center gap-2 rounded-full font-bold transition disabled:pointer-events-none disabled:opacity-50 motion-reduce:hover:scale-100 ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}
