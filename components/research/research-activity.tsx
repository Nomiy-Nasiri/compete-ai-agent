import { AlertCircle, CheckCircle2, Circle, LoaderCircle } from "lucide-react";

import type { ActivityItem } from "@/lib/mock-research";
import { cn } from "@/lib/utils";

const ACTIVITY_STYLES = {
  pending: "border-border bg-background text-muted-foreground",
  current: "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  completed: "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  failed: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
} as const;

const ACTIVITY_ICONS = {
  pending: Circle,
  current: LoaderCircle,
  completed: CheckCircle2,
  failed: AlertCircle,
};

export function ResearchActivityTimeline({ activities }: { activities: ActivityItem[] }) {
  return (
    <ol className="relative ml-2 space-y-1 border-l border-border pl-6" aria-label="Agent activity timeline">
      {activities.map((activity) => {
        const Icon = ACTIVITY_ICONS[activity.status];

        return (
          <li key={activity.id} className="relative pb-6 last:pb-0">
            <span className={cn(
              "absolute left-[-1.57rem] top-0 flex size-6 items-center justify-center rounded-full border-2 border-background shadow-sm",
              ACTIVITY_STYLES[activity.status]
            )}>
              <Icon className={cn("size-3.5", activity.status === "current" && "animate-spin")} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className={cn("text-sm font-medium", activity.status === "pending" ? "text-muted-foreground" : "text-foreground")}>
                {activity.label}
              </p>
              {activity.timestamp !== "—" ? (
                <time className="text-xs text-muted-foreground">{activity.timestamp}</time>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ResearchProgress({ value }: { value: number }) {
  return (
    <div className="space-y-3" aria-label={`Research progress: ${value}%`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Progress</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-[width] duration-300 ease-out",
            value === 0 && "bg-muted"
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
