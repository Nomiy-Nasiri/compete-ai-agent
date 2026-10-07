"use client";

import { usePathname } from "next/navigation";

import { MobileNav } from "@/components/layout/mobile-nav";
import { getPageTitle } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  className?: string;
};

export function AppHeader({ className }: AppHeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-3 backdrop-blur-md sm:px-6",
        className
      )}
    >
      <MobileNav />
      <p className="truncate text-sm font-medium tracking-tight sm:text-base">
        {title}
      </p>
    </header>
  );
}
