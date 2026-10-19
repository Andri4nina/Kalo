import { input, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function TextField({ label, hint, className, id, ...props }: TextFieldProps) {
  const fieldId = id ?? `field-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-xs font-medium">
        {label}
      </label>
      <input id={fieldId} className={cn(input, className)} {...props} />
      {hint ? <p className={cn("text-xs", muted)}>{hint}</p> : null}
    </div>
  );
}
