import { AlertCircle, CheckCircle2, Clock3, LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ResearchStatus } from "@/lib/mock-research";

const STATUS_STYLES: Record<ResearchStatus, string> = {
  queued: "bg-slate-500/10 text-slate-700 ring-1 ring-inset ring-slate-500/20 dark:text-slate-300",
  running: "bg-amber-500/10 text-amber-700 ring-1 ring-inset ring-amber-500/20 dark:text-amber-400",
  completed: "bg-emerald-500/10 text-emerald-700 ring-1 ring-inset ring-emerald-500/20 dark:text-emerald-400",
  failed: "bg-red-500/10 text-red-700 ring-1 ring-inset ring-red-500/20 dark:text-red-400",
};

const STATUS_ICONS: Record<ResearchStatus, typeof Clock3> = {
  queued: Clock3,
  running: LoaderCircle,
  completed: CheckCircle2,
  failed: AlertCircle,
};

export function ResearchStatusBadge({ status }: { status: ResearchStatus }) {
  const Icon = STATUS_ICONS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        STATUS_STYLES[status]
      )}
    >
      <Icon className={cn("size-3.5", status === "running" && "animate-spin")} aria-hidden="true" />
      {status}
    </span>
  );
}
