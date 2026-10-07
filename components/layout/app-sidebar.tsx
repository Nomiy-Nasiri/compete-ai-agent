import { Radar } from "lucide-react";

import { NavItems } from "@/components/layout/nav-items";
import { UserPlaceholder } from "@/components/layout/user-placeholder";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  className?: string;
};

export function AppSidebar({ className }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex",
        className
      )}
    >
      <div className="flex h-14 items-center gap-2.5 px-4">
        <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Radar className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium tracking-tight">
            Competitor Intel
          </p>
          <p className="truncate text-xs text-muted-foreground">Research agent</p>
        </div>
      </div>
      <Separator />
      <nav
        aria-label="Main"
        className="flex min-h-0 flex-1 flex-col px-3 py-4"
      >
        <NavItems />
      </nav>
      <div className="mt-auto px-3 pb-4">
        <UserPlaceholder />
      </div>
    </aside>
  );
}
