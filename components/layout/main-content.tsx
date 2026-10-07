import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MainContentProps = {
  children: ReactNode;
  className?: string;
};

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "min-h-0 flex-1 overflow-y-auto outline-none",
        className
      )}
    >
      {children}
    </main>
  );
}
