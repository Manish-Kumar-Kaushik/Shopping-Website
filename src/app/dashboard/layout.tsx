"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  FileWarning,
  LayoutDashboard,
  Link2,
  ListChecks,
  Menu,
  Monitor,
  PanelLeftClose,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  UserRound,
  Users,
  XCircle,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const sidebarGroups = [
  {
    title: "Core Operations",
    items: [
      { label: "Products", icon: ShoppingBag, href: "/dashboard/products" },
      { label: "Retailer Connectors", icon: Link2, href: "#" },
      { label: "AI Review Queue", icon: LayoutDashboard, href: "#" },
      { label: "Score Audit", icon: ListChecks, href: "#" },
      { label: "Review Intelligence", icon: Monitor, href: "#" },
      { label: "YouTube Reviewer Trust", icon: Sparkles, href: "#" },
      { label: "Alternatives", icon: CircleDollarSign, href: "#" },
    ],
  },
  { title: "Growth & Partnerships", items: [{ label: "Affiliate Programs", icon: Target, href: "#" }] },
  {
    title: "Trust & Safety",
    items: [
      { label: "Health / Safety Review", icon: ShieldCheck, href: "#" },
      { label: "Content Moderation", icon: XCircle, href: "#" },
      { label: "User Reports", icon: Users, href: "#" },
      { label: "Users", icon: UserRound, href: "#" },
      { label: "Receipts", icon: CalendarDays, href: "#" },
    ],
  },
  { title: "Insights & Governance", items: [{ label: "Analytics", icon: Zap, href: "#" }, { label: "Compliance Logs", icon: FileWarning, href: "#" }, { label: "Settings", icon: Menu, href: "#" }] },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-70 flex-col border-r border-slate-800/80 bg-slate-950 text-slate-100 lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">B</div>
          <div className="text-lg font-semibold tracking-tight">BuyWise AI Admin</div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-5 text-sm">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 font-medium transition shadow-sm",
                pathname === "/dashboard"
                  ? "bg-blue-600 text-white shadow-blue-950/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white",
              )}
            >
              <LayoutDashboard className="size-4" />
              Overview
            </Link>

            {sidebarGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <div className="px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">{group.title}</div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 transition",
                        pathname === item.href
                          ? "bg-blue-600 text-white"
                          : "text-slate-300 hover:bg-slate-900 hover:text-white",
                      )}
                    >
                      <item.icon className="size-4 opacity-90" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-6 border-t border-slate-800 pt-4">
            <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white">
              <ShieldCheck className="size-4" />
              Help & Support
              <ChevronDown className="ml-auto size-4 text-slate-500" />
            </a>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-70">
        <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
            <Button variant="ghost" size="icon-sm" className="text-slate-500 lg:hidden">
              <Menu className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" className="hidden text-slate-500 lg:inline-flex">
              <PanelLeftClose className="size-4" />
            </Button>

            <div className="relative hidden flex-1 items-center lg:flex">
              <Search className="pointer-events-none absolute left-3 size-4 text-slate-400" />
              <input
                aria-label="Search"
                placeholder="Search products, ASINs, users, reports..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-20 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-300"
              />
              <div className="pointer-events-none absolute right-3 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5">⌘</span>
                <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5">K</span>
              </div>
            </div>

            <div className="ml-auto hidden items-center gap-3 sm:flex">
              <Badge className="gap-2 border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500" />
                Production
              </Badge>
              <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white px-3.5 text-slate-700 shadow-none">
                <CalendarDays className="mr-2 size-4" />
                May 11 – May 17, 2026
                <ChevronDown className="ml-2 size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="relative text-slate-500">
                <Bell className="size-4" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-blue-500 ring-2 ring-white" />
              </Button>
              <Button variant="ghost" className="h-10 gap-3 rounded-xl px-2.5 text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">A</div>
                <div className="text-left leading-tight">
                  <div className="text-sm font-medium">Admin</div>
                  <div className="text-xs text-slate-500">Administrator</div>
                </div>
                <ChevronDown className="size-4 text-slate-400" />
              </Button>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}
