import {
  FileText,
  History,
  LayoutDashboard,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/research/new", label: "New Research", icon: Search },
  { href: "/research", label: "Research History", icon: History },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  if (href === "/research/new") {
    return (
      pathname === "/research/new" || pathname.startsWith("/research/new/")
    );
  }

  if (href === "/research") {
    if (
      pathname === "/research/new" ||
      pathname.startsWith("/research/new/")
    ) {
      return false;
    }

    return pathname === "/research" || pathname.startsWith("/research/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getPageTitle(pathname: string): string {
  const exact = NAV_ITEMS.find((item) => item.href === pathname);
  if (exact) {
    return exact.label;
  }

  const nested = [...NAV_ITEMS]
    .filter((item) => item.href !== "/" && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return nested?.label ?? "Competitor Intelligence";
}
