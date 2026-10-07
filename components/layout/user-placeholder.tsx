import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserPlaceholderProps = {
  className?: string;
};

export function UserPlaceholder({ className }: UserPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar/40 px-2.5 py-2",
        className
      )}
    >
      <Avatar size="sm" aria-hidden="true">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-sidebar-foreground">
          Guest
        </p>
        <p className="truncate text-xs text-muted-foreground">
          Authentication not enabled
        </p>
      </div>
    </div>
  );
}
