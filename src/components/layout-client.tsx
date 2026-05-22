"use client";

import React from "react";
import Sidebar from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import Header from "@/components/dashboard/header";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-full w-full flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-slate-50 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
