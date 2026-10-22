import { AlertCircle } from "lucide-react";

export function ErrorNotice({ message }: { message: string }) {
  return (
    <div role="alert" className="mb-4 flex items-start gap-2 rounded-md bg-kalo-danger/10 px-4 py-3 text-sm text-kalo-danger dark:bg-kalo-dark-danger/10 dark:text-kalo-dark-danger">
      <AlertCircle size={16} className="mt-0.5 shrink-0" />
      <p className="min-w-0 break-words">{message}</p>
    </div>
  );
}
