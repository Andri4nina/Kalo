import { cn } from "@/lib/cn";
import { card } from "@/design/tokens";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(card, className)} {...props}>
      {children}
    </div>
  );
}
