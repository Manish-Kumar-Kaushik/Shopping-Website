"use client";

import React, { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { useSidebar } from "@/components/dashboard/sidebar-context";

export default function Header() {
  const { toggle } = useSidebar();
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm transition-all duration-300">
      {/* Sidebar Toggle Hamburger */}
      <div className="flex-none flex items-center">
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Global Search Bar (Centered) */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-[360px] md:max-w-[420px] hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands, ASINs, users..."
            className="w-full h-9 pl-9 pr-14 text-[13px] bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-0.5 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-400 shadow-sm pointer-events-none">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex-none flex items-center gap-2.5 md:gap-4">
        {/* Production Pill (hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[12px] font-semibold text-emerald-700 select-none shadow-sm/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Production
        </div>

        {/* Date Selector (hidden on mobile) */}
        <button className="hidden md:flex items-center gap-2 h-8 px-3 bg-white border border-slate-200 rounded-lg text-[12px] font-semibold text-slate-700 hover:bg-slate-50 shadow-sm hover:border-slate-300 transition-all">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          May 12 – May 18, 2024
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {/* Notification Bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center border border-slate-200 bg-white hover:border-slate-300 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#EF4444] border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold leading-none shadow-sm">
            5
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 select-none">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
            alt="Admin Avatar"
            className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200 cursor-pointer"
          />
          <div className="hidden lg:flex flex-col leading-none">
            <span className="text-[12px] font-bold text-slate-800">Admin User</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
