"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import {
  LayoutGrid,
  Package,
  Link2,
  ArrowRightLeft,
  Bot,
  ShieldCheck,
  BrainCircuit,
  ShieldAlert,
  Flag,
  Users,
  User,
  Receipt,
  BarChart3,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  X,
} from "lucide-react";

const Youtube = ({ className, ...props }: React.ComponentPropsWithoutRef<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

interface SubItem {
  name: string;
  href: string;
}

interface SidebarItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  badge?: number;
  subItems?: SubItem[];
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const groups: SidebarGroup[] = [
  {
    title: "MAIN",
    items: [
      { name: "Overview", icon: LayoutGrid, href: "/" },
    ],
  },
  {
    title: "PRODUCT INTELLIGENCE",
    items: [
      {
        name: "Products",
        icon: Package,
        subItems: [
          { name: "Product List", href: "/dashboard/products" },
          { name: "Product Mapping", href: "/dashboard/products/mapping" },
          { name: "Product Merge Review", href: "/dashboard/products/product-merge-review" },
        ],
      },
      {
        name: "Retailer Connectors",
        icon: Link2,
        subItems: [
          { name: "Connector Status", href: "/dashboard/connectors" },
          { name: "API Logs", href: "/dashboard/connectors/logs" },
          { name: "Rate Limit Monitor", href: "/dashboard/connectors/limits" },
        ],
      },
      {
        name: "Alternatives",
        icon: ArrowRightLeft,
        subItems: [
          { name: "Alternative Recommendations", href: "/dashboard/alternatives" },
          { name: "Comparison Review", href: "/dashboard/alternatives/compare" },
        ],
      },
    ],
  },
  {
    title: "AI & TRUST",
    items: [
      {
        name: "AI Review Queue",
        icon: Bot,
        subItems: [
          { name: "Queue List", href: "/dashboard/ai-queue" },
          { name: "Human Approval", href: "/dashboard/ai-queue/approval" },
          { name: "Rejected Verdicts", href: "/dashboard/ai-queue/rejected" },
        ],
      },
      {
        name: "Score Audit",
        icon: ShieldCheck,
        subItems: [
          { name: "Score Audit List", href: "/dashboard/audit" },
          { name: "Score Rule Preview", href: "/dashboard/audit/preview" },
        ],
      },
      {
        name: "Review Intelligence",
        icon: BrainCircuit,
        subItems: [
          { name: "Review Clusters", href: "/dashboard/intelligence/clusters" },
          { name: "Suspicious Review Patterns", href: "/dashboard/intelligence/suspicious" },
          { name: "Pros / Cons Review", href: "/dashboard/intelligence/pros-cons" },
        ],
      },
      {
        name: "YouTube Reviewer Trust",
        icon: Youtube,
        subItems: [
          { name: "Channel Queue", href: "/dashboard/youtube-trust" },
          { name: "Video Evidence", href: "/dashboard/youtube-trust/evidence" },
          { name: "Blocked Channels", href: "/dashboard/youtube-trust/blocked" },
        ],
      },
      {
        name: "Health / Safety Review",
        icon: ShieldAlert,
        subItems: [
          { name: "Safety Queue", href: "/dashboard/safety" },
          { name: "Ingredient Review", href: "/dashboard/safety/ingredients" },
          { name: "Sensitive Claim Review", href: "/dashboard/safety/claims" },
          { name: "Disclaimer Review", href: "/dashboard/safety/disclaimers" },
        ],
      },
      {
        name: "Content Moderation",
        icon: Flag,
        subItems: [
          { name: "Risky AI Outputs", href: "/dashboard/moderation/ai" },
          { name: "Flagged Claims", href: "/dashboard/moderation/claims" },
          { name: "Removed Content", href: "/dashboard/moderation/removed" },
          { name: "Moderation History", href: "/dashboard/moderation/history" },
        ],
      },
    ],
  },
  {
    title: "BUSINESS OPERATIONS",
    items: [
      {
        name: "Affiliate Programs",
        icon: Users,
        subItems: [
          { name: "Affiliate Overview", href: "/dashboard/affiliate" },
          { name: "Partner List", href: "/dashboard/affiliate/partners" },
          { name: "Affiliate Links", href: "/dashboard/affiliate/links" },
          { name: "Click / Conversion View", href: "/dashboard/affiliate/conversions" },
        ],
      },
      {
        name: "User Reports",
        icon: Flag,
        subItems: [
          { name: "Report Inbox", href: "/dashboard/reports" },
          { name: "Product Correction", href: "/dashboard/reports/correction" },
          { name: "Closed Reports", href: "/dashboard/reports/closed" },
        ],
      },
      {
        name: "Users",
        icon: User,
        subItems: [
          { name: "User List", href: "/dashboard/users" },
          { name: "Privacy Actions", href: "/dashboard/users/privacy" },
        ],
      },
      {
        name: "Receipts",
        icon: Receipt,
        subItems: [
          { name: "Receipt Uploads", href: "/dashboard/receipts" },
          { name: "OCR Review", href: "/dashboard/receipts/ocr" },
          { name: "Product Match Review", href: "/dashboard/receipts/match" },
        ],
      },
      {
        name: "Analytics",
        icon: BarChart3,
        subItems: [
          { name: "Business Analytics", href: "/dashboard/analytics/business" },
          { name: "Search Analytics", href: "/dashboard/analytics/search" },
          { name: "Product Analytics", href: "/dashboard/analytics/product" },
          { name: "Affiliate Analytics", href: "/dashboard/analytics/affiliate" },
          { name: "Alert Analytics", href: "/dashboard/analytics/alert" },
        ],
      },
    ],
  },
  {
    title: "GOVERNANCE",
    items: [
      {
        name: "Compliance Logs",
        icon: Shield,
        subItems: [
          { name: "AI Audit Logs", href: "/dashboard/compliance/ai" },
          { name: "Affiliate Disclosure Logs", href: "/dashboard/compliance/affiliate" },
          { name: "Source History", href: "/dashboard/compliance/source" },
          { name: "Model Version Logs", href: "/dashboard/compliance/model" },
          { name: "Admin Activity Logs", href: "/dashboard/compliance/admin" },
        ],
      },
      {
        name: "Settings",
        icon: Settings,
        subItems: [
          { name: "Admin Users", href: "/dashboard/settings/users" },
          { name: "Roles & Permissions", href: "/dashboard/settings/roles" },
          { name: "Scoring Settings", href: "/dashboard/settings/scoring" },
          { name: "Categories", href: "/dashboard/settings/categories" },
          { name: "Feature Flags", href: "/dashboard/settings/features" },
          { name: "System Settings", href: "/dashboard/settings/system" },
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "AI Review Queue": true, // Default open to match screenshot
  });

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isItemActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/" || pathname === "/dashboard/overview";
    }
    return pathname === href;
  };

  const isGroupActive = (item: SidebarItem) => {
    if (item.href && isItemActive(item.href)) return true;
    if (item.subItems) {
      return item.subItems.some((sub) => isItemActive(sub.href));
    }
    return false;
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
          "bg-[#0B132B] text-slate-300 flex flex-col h-screen border-r border-[#1a253c] shrink-0 z-50 transition-all duration-300 ease-in-out font-sans",
          "lg:relative fixed top-0 bottom-0 left-0",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 overflow-hidden lg:border-r-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-5 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-blue-600 rounded-lg p-1.5 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12ZM4 12H12M12 4V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-base">
                BuyWise AI
              </span>
              <span className="text-xs text-slate-400">
                Admin Console
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-950/40 border border-emerald-900/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-medium text-emerald-400">Production</span>
          </div>
          <button
            onClick={toggle}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Menu */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="px-3 py-2 space-y-5">
            {groups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1.5">
                <h4 className="px-3 pt-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {group.title}
                </h4>
                <ul className="space-y-0.5">
                  {group.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const active = isGroupActive(item);
                    const isOpenMenu = openMenus[item.name];
                    const hasSub = !!item.subItems;

                    return (
                      <li key={itemIdx}>
                        {hasSub ? (
                          <>
                            <button
                              onClick={() => toggleMenu(item.name)}
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-150",
                                active && !isOpenMenu
                                  ? "bg-blue-600/10 text-blue-400"
                                  : "text-slate-300 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="truncate">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {item.badge !== undefined && (
                                  <span className="bg-blue-600 text-white rounded-md px-1.5 py-0.5 text-[10px] font-bold leading-none flex items-center justify-center shrink-0">
                                    {item.badge}
                                  </span>
                                )}
                                <ChevronDown
                                  className={cn(
                                    "w-3.5 h-3.5 transition-transform duration-200",
                                    isOpenMenu ? "rotate-180" : ""
                                  )}
                                />
                              </div>
                            </button>
                            {/* Sub menu */}
                            {isOpenMenu && item.subItems && (
                              <ul className="mt-1 mb-2 space-y-0.5 relative before:absolute before:left-[19px] before:top-1 before:bottom-1 before:w-[1px] before:bg-slate-800">
                                {item.subItems.map((sub, subIdx) => {
                                  const subActive = isItemActive(sub.href);
                                  return (
                                    <li key={subIdx}>
                                      <Link
                                        href={sub.href}
                                        className={cn(
                                          "flex items-center pl-10 pr-3 py-1.5 text-xs transition-colors rounded-md relative",
                                          subActive
                                            ? "text-blue-400 font-medium"
                                            : "text-slate-400 hover:text-slate-200"
                                        )}
                                      >
                                        <span className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-600 border-2 border-[#0B132B]"></span>
                                        {sub.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link
                            href={item.href || "#"}
                            className={cn(
                              "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-all duration-150",
                              active
                                ? "bg-blue-600 text-white"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Icon className="w-4 h-4 shrink-0" />
                              <span className="truncate">{item.name}</span>
                            </div>
                            {item.badge !== undefined && (
                              <span className="bg-blue-600 text-white rounded-md px-1.5 py-0.5 text-[10px] font-bold leading-none flex items-center justify-center shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 shrink-0 space-y-1 mt-auto">
          <Link
            href="#"
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
              <span>Help & Support</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <div className="h-px bg-slate-800 my-1 mx-2"></div>
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                AU
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-white leading-tight">Admin User</span>
                <span className="text-[11px] text-slate-400 leading-tight">Super Admin</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
