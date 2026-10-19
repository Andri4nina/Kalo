import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { pageCount } from "./useTrackPage";

interface Props {
  page: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

export function LibraryPagination({ page, total, pageSize = 100, onChange }: Props) {
  const count = pageCount(total, pageSize);
  if (count <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-end gap-3">
      <span className={cn("text-xs", muted)}>
        Page {page + 1} sur {count}
      </span>
      <IconButton icon={ChevronLeft} label="Page précédente" disabled={page === 0} onClick={() => onChange(page - 1)} />
      <IconButton icon={ChevronRight} label="Page suivante" disabled={page + 1 >= count} onClick={() => onChange(page + 1)} />
    </div>
  );
}
