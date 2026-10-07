import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";

import type { EvidenceStatus } from "@/lib/report-mock";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<EvidenceStatus, string> = {
  confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  inferred: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  unavailable: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

const STATUS_LABELS: Record<EvidenceStatus, string> = {
  confirmed: "Confirmed information",
  inferred: "AI inference",
  unavailable: "Information unavailable",
};

export function EvidenceStatusBadge({ status }: { status: EvidenceStatus }) {
  const Icon = {
    confirmed: CheckCircle2,
    inferred: HelpCircle,
    unavailable: AlertCircle,
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-medium",
        STATUS_STYLES[status]
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  );
}
