import { input, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function TextArea({ label, hint, className, id, ...props }: TextAreaProps) {
  const fieldId = id ?? `area-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-xs font-medium">
        {label}
      </label>
      <textarea id={fieldId} rows={3} className={cn(input, "resize-none", className)} {...props} />
      {hint ? <p className={cn("text-xs", muted)}>{hint}</p> : null}
    </div>
  );
}
