"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import {
  Home,
  Tag,
  Network,
  Bot,
  ClipboardCheck,
  Sparkles,
  Youtube,
  Layers,
  Percent,
  ShieldCheck,
  Activity,
  Flag,
  Users,
  Receipt,
  LineChart,
  Scroll,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
} from "lucide-react";

interface SidebarItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

const groups: SidebarGroup[] = [
  {
    items: [
      { name: "Overview", icon: Home, href: "/" },
    ],
  },
  {
    title: "Core Operations",
    items: [
      { name: "Products", icon: Tag, href: "/dashboard/products" },
      { name: "Retailer Connectors", icon: Network, href: "/dashboard/connectors" },
      { name: "AI Review Queue", icon: Bot, href: "/dashboard/ai-queue" },
      { name: "Score Audit", icon: ClipboardCheck, href: "/dashboard/audit" },
      { name: "Review Intelligence", icon: Sparkles, href: "/dashboard/intelligence" },
      { name: "YouTube Reviewer Trust", icon: Youtube, href: "/dashboard/youtube-trust" },
      { name: "Alternatives", icon: Layers, href: "/dashboard/alternatives" },
    ],
  },
  {
    title: "Growth & Partnerships",
    items: [
      { name: "Affiliate Programs", icon: Percent, href: "/dashboard/affiliate" },
    ],
  },
  {
    title: "Trust & Safety",
    items: [
      { name: "Health / Safety Review", icon: ShieldCheck, href: "/dashboard/safety" },
      { name: "Content Moderation", icon: Activity, href: "/dashboard/moderation" },
      { name: "User Reports", icon: Flag, href: "/dashboard/reports" },
      { name: "Users", icon: Users, href: "/dashboard/users" },
      { name: "Receipts", icon: Receipt, href: "/dashboard/receipts" },
    ],
  },
  {
    title: "Insights & Governance",
    items: [
      { name: "Analytics", icon: LineChart, href: "/dashboard/analytics" },
      { name: "Compliance Logs", icon: Scroll, href: "/dashboard/compliance" },
      { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();

  const isItemActive = (itemHref: string) => {
    if (!pathname) return false;
    if (itemHref === "/") {
      return pathname === "/" || pathname === "/dashboard/overview";
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#0c1424] text-slate-300 flex flex-col h-screen border-r border-[#1a253c] shrink-0 z-50 transition-all duration-300 ease-in-out",
          "lg:relative fixed top-0 bottom-0 left-0",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden lg:border-r-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a253c] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md shadow-blue-500/20">
              B
            </div>
            <span className="font-semibold text-white tracking-tight text-[15px] whitespace-nowrap truncate">
              BuyWise AI Admin
            </span>
          </div>
          <button
            onClick={toggle}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {group.title && (
                <h4 className="px-3 pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {group.title}
                </h4>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.href);
                  return (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-md transition-all duration-150 whitespace-nowrap",
                          active
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-[#1a253c] shrink-0">
          <button className="w-full flex items-center justify-between px-3 py-2 text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Help & Support</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
}
