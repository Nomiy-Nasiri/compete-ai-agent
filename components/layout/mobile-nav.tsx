"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Radar } from "lucide-react";

import { NavItems } from "@/components/layout/nav-items";
import { UserPlaceholder } from "@/components/layout/user-placeholder";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet key={pathname} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        id="mobile-navigation"
        className="w-72 bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="border-b border-sidebar-border">
          <SheetTitle className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Radar className="size-4" aria-hidden="true" />
            </span>
            Competitor Intel
          </SheetTitle>
          <SheetDescription>Main navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Main" className="flex flex-1 flex-col px-3 py-4">
          <NavItems onNavigate={() => setOpen(false)} />
        </nav>
        <Separator />
        <div className="p-3">
          <UserPlaceholder />
        </div>
      </SheetContent>
    </Sheet>
  );
}
