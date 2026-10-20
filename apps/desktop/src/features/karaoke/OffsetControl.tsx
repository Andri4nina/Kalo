import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const STEP_MS = 500;
const LIMIT_MS = 5_000;

interface Props {
  offsetMs: number;
  onChange: (offsetMs: number) => void;
}

export function OffsetControl({ offsetMs, onChange }: Props) {
  const sign = offsetMs > 0 ? "+" : "";
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("mr-1 text-xs", muted)}>Décalage</span>
      <IconButton
        icon={Minus}
        label="Avancer les paroles"
        size="sm"
        onClick={() => onChange(Math.max(-LIMIT_MS, offsetMs - STEP_MS))}
      />
      <span className="w-14 text-center text-xs tabular-nums">{sign}{(offsetMs / 1_000).toFixed(1)} s</span>
      <IconButton
        icon={Plus}
        label="Retarder les paroles"
        size="sm"
        onClick={() => onChange(Math.min(LIMIT_MS, offsetMs + STEP_MS))}
      />
    </div>
  );
}
