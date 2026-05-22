"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Search,
  Bot,
  Network,
  ClipboardCheck,
  Percent,
  Activity,
  ShieldAlert,
  Flag,
  RotateCw,
  Eye,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  User,
  UserPlus,
  RefreshCw,
  Link2,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const trendData = [
  { date: "May 11", Searches: 24200, Clicks: 4100 },
  { date: "May 12", Searches: 28000, Clicks: 4600 },
  { date: "May 13", Searches: 26500, Clicks: 5200 },
  { date: "May 14", Searches: 31200, Clicks: 6100 },
  { date: "May 15", Searches: 29800, Clicks: 5800 },
  { date: "May 16", Searches: 30100, Clicks: 5600 },
  { date: "May 17", Searches: 33000, Clicks: 6800 },
];

const actionQueue = [
  { priority: "HIGH", pCls: "bg-red-100 text-red-700 border border-red-200", type: "AI Verdict",    TypeIcon: Bot,          product: "CeraVe Moisturizing Cream",   issue: "Health/safety claim needs approval",         age: "42m", status: "Pending",  sCls: "bg-amber-50 text-amber-700 border border-amber-200" },
  { priority: "HIGH", pCls: "bg-red-100 text-red-700 border border-red-200", type: "Connector",     TypeIcon: Link2,        product: "Walmart API",                  issue: "Error rate above threshold (6.2%)",           age: "1h",  status: "Warning",  sCls: "bg-orange-50 text-orange-700 border border-orange-200" },
  { priority: "MED",  pCls: "bg-amber-100 text-amber-700 border border-amber-200", type: "Product Match", TypeIcon: ClipboardCheck, product: "Sony WH-1000XM5",     issue: "Duplicate mapping confidence conflict",     age: "2h",  status: "Review",   sCls: "bg-blue-50 text-blue-700 border border-blue-200" },
  { priority: "MED",  pCls: "bg-amber-100 text-amber-700 border border-amber-200", type: "Affiliate",    TypeIcon: Percent,      product: "Best Buy links",              issue: "Disclosure coverage check failed",           age: "3h",  status: "Open",     sCls: "bg-sky-50 text-sky-700 border border-sky-200" },
  { priority: "LOW",  pCls: "bg-slate-100 text-slate-600 border border-slate-200", type: "User Report",  TypeIcon: Flag,         product: "Ninja Air Fryer",             issue: "Incorrect price report",                    age: "5h",  status: "Assigned", sCls: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
];

const retailers = [
  { name: "Amazon",   abbr: "a",  pct: 96, status: "Healthy",    sColor: "text-emerald-600", bar: "bg-emerald-500" },
  { name: "Walmart",  abbr: "W",  pct: 74, status: "Warning",    sColor: "text-amber-500",   bar: "bg-amber-500" },
  { name: "Best Buy", abbr: "BB", pct: 91, status: "Healthy",    sColor: "text-emerald-600", bar: "bg-emerald-500" },
  { name: "Target",   abbr: "◎",  pct: 68, status: "Feed Delay", sColor: "text-rose-600",    bar: "bg-rose-500" },
  { name: "eBay",     abbr: "e",  pct: 88, status: "Healthy",    sColor: "text-emerald-600", bar: "bg-emerald-500" },
];

const flaggedProducts = [
  { rank: 1, name: "CeraVe Moisturizing Cream",    sub: "Health claim unverified",       badge: "High", bCls: "bg-rose-50 text-rose-600 border border-rose-200",   imgCls: "from-blue-400 to-blue-600" },
  { rank: 2, name: "Sony WH-1000XM5",              sub: "Duplicate mapping conflict",    badge: "Med",  bCls: "bg-amber-50 text-amber-600 border border-amber-200", imgCls: "from-slate-700 to-slate-900" },
  { rank: 3, name: "Ninja Air Fryer XL",           sub: "Price discrepancy reported",    badge: "Med",  bCls: "bg-amber-50 text-amber-600 border border-amber-200", imgCls: "from-slate-600 to-slate-800" },
  { rank: 4, name: "Apple AirPods Pro (2nd Gen)",  sub: "Source authenticity conflict",  badge: "Low",  bCls: "bg-blue-50 text-blue-600 border border-blue-200",    imgCls: "from-slate-400 to-slate-600" },
  { rank: 5, name: "The Ordinary Niacinamide 10%", sub: "Ingredient concentration claim",badge: "Low",  bCls: "bg-blue-50 text-blue-600 border border-blue-200",    imgCls: "from-amber-300 to-amber-500" },
];

const activities = [
  { Icon: Check,         bg: "bg-blue-100",    ic: "text-blue-600",   title: "AI verdict approved",            sub: "Admin Lee approved CeraVe Moisturizing Cream",    time: "12m ago" },
  { Icon: AlertTriangle, bg: "bg-amber-100",   ic: "text-amber-600",  title: "Connector issue acknowledged",   sub: "Walmart API error acknowledged by system",        time: "34m ago" },
  { Icon: User,          bg: "bg-purple-100",  ic: "text-purple-600", title: "User report reviewed",           sub: "Incorrect price report for Ninja Air Fryer",      time: "1h ago" },
  { Icon: RefreshCw,     bg: "bg-emerald-100", ic: "text-emerald-600",title: "Affiliate disclosure updated",   sub: "Best Buy affiliate program disclosure updated",    time: "2h ago" },
  { Icon: UserPlus,      bg: "bg-blue-100",    ic: "text-blue-600",   title: "New user registered",            sub: "editor.jane@example.com",                         time: "3h ago" },
];

export default function AdminOverview() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-slate-50 min-h-full">

      {/* ─── Page Body ─── */}
      <div className="px-6 py-5 space-y-5">

        {/* ── Page Title ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight">Admin Overview</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Real-time platform health, AI review operations, and actionable intelligence.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <button className="flex items-center gap-1.5 h-8 px-3.5 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
              <RotateCw className="w-3.5 h-3.5" /> Refresh Data
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3.5 text-[12px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
              <Eye className="w-3.5 h-3.5" /> View Critical Queue
            </button>
          </div>
        </div>

        {/* ── 6 Stat Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* Card: Today's Searches */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">Today's Searches</span>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">28,651</div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">↑ 14.6%</span> vs last 7 days
            </div>
          </div>

          {/* Card: AI Reviews Pending */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">AI Reviews Pending</span>
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">186</div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="text-amber-600 font-semibold">31 high-</span><span className="text-amber-600 font-semibold underline decoration-amber-400">priority</span>
            </div>
          </div>

          {/* Card: Low Confidence Verdicts */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">Low Confidence Verdicts</span>
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">42</div>
            <div className="mt-2 text-[11px] text-rose-600 font-semibold">Needs review</div>
          </div>

          {/* Card: Connector Errors */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">Connector Errors</span>
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-orange-500" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">9</div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="text-orange-600 font-semibold">3</span> needing attention
            </div>
          </div>

          {/* Card: Affiliate Clicks */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">Affiliate Clicks</span>
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <MousePointerClick className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">5,318</div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="text-emerald-600 font-semibold">↑ 11.2%</span> vs last 7 days
            </div>
          </div>

          {/* Card: User Reports */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] font-semibold text-slate-500 leading-snug max-w-[80px]">User Reports</span>
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <Flag className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <div className="text-[28px] font-bold text-slate-900 leading-none">37</div>
            <div className="mt-2 text-[11px] text-slate-500">
              <span className="text-purple-600 font-semibold">8</span> safety concerns
            </div>
          </div>
        </div>

        {/* ── Row 1: Action Queue + Retailer Health ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Critical Action Queue */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-bold text-slate-900">Critical Action Queue</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">High Priority</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Unassigned</span>
              </div>
              <button className="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors">View all</button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="pl-5 text-[11px] text-slate-500 font-semibold uppercase tracking-wide w-20">Priority</TableHead>
                    <TableHead className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide w-32">Type</TableHead>
                    <TableHead className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Product / Source</TableHead>
                    <TableHead className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Issue</TableHead>
                    <TableHead className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide w-12">Age</TableHead>
                    <TableHead className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide pr-5 text-right w-24">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actionQueue.map((row, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/60">
                      <TableCell className="pl-5 py-3">
                        <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${row.pCls}`}>{row.priority}</span>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5 text-[12px] text-slate-600 font-medium">
                          <row.TypeIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{row.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-[13px] font-semibold text-slate-800">{row.product}</TableCell>
                      <TableCell className="py-3 text-[12px] text-slate-500 max-w-[160px] truncate">{row.issue}</TableCell>
                      <TableCell className="py-3 text-[12px] text-slate-500">{row.age}</TableCell>
                      <TableCell className="py-3 pr-5 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.sCls}`}>{row.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50/60 border-t border-slate-100">
              <span className="text-[12px] text-slate-500">Showing 1–5 of 18</span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-400 hover:text-slate-700 transition-colors" disabled>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1,2,3,4].map((n) => (
                  <button key={n} className={`w-7 h-7 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${n === 1 ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{n}</button>
                ))}
                <button className="w-7 h-7 flex items-center justify-center border border-slate-200 bg-white rounded text-slate-600 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Retailer Health */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-slate-900">
                <Activity className="w-4 h-4 text-blue-600" />
                Retailer Health
              </div>
              <button className="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors">View all</button>
            </div>
            <div className="px-5 py-4 space-y-3.5">
              {retailers.map((r) => (
                <div key={r.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">{r.abbr}</div>
                      <span className="text-[13px] font-semibold text-slate-800">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[12px] font-semibold ${r.sColor}`}>{r.status}</span>
                      <span className="text-[12px] font-bold text-slate-600 w-7 text-right">{r.pct}%</span>
                    </div>
                  </div>
                  <Progress value={r.pct} indicatorClassName={r.bar} className="h-[6px] bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Chart + Flagged Products + Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Search / Click Trend */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <span className="text-[14px] font-bold text-slate-900">Search / Click Trend</span>
              <button className="flex items-center gap-1 h-7 px-2.5 border border-slate-200 rounded-lg text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Last 7 days <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
            </div>
            <div className="px-5 pt-4 pb-0">
              {/* Legend */}
              <div className="flex items-center gap-5 mb-3">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" /> Searches
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> Affiliate Clicks
                </div>
              </div>
              {/* Chart */}
              <div className="h-[180px]">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 9, fontFamily: "var(--font-sans)" }} />
                      <YAxis yAxisId="left"  tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                      <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} tick={{ fill: "#94a3b8", fontSize: 9 }} />
                      <Tooltip
                        contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "11px", padding: "6px 10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                        labelStyle={{ color: "#475569", fontWeight: 600, marginBottom: 4 }}
                      />
                      <Line yAxisId="left"  type="monotone" dataKey="Searches" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#fff", stroke: "#2563eb", strokeWidth: 1.5 }} activeDot={{ r: 4 }} />
                      <Line yAxisId="right" type="monotone" dataKey="Clicks"   stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#fff", stroke: "#10b981", strokeWidth: 1.5 }} activeDot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[180px] w-full bg-slate-100/50 rounded-lg animate-pulse" />
                )}
              </div>
            </div>
            {/* Totals */}
            <div className="grid grid-cols-2 border-t border-slate-100 mt-0">
              <div className="flex items-center gap-2.5 px-5 py-3.5 border-r border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Total Searches</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[15px] font-bold text-slate-900">182,463</span>
                    <span className="text-[10px] font-bold text-emerald-600">↑ 12.8%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <MousePointerClick className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Total Clicks</div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-[15px] font-bold text-slate-900">32,719</span>
                    <span className="text-[10px] font-bold text-emerald-600">↑ 9.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Flagged Products */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <span className="text-[14px] font-bold text-slate-900">Top Flagged Products</span>
              <button className="text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors">View all</button>
            </div>
            <div className="px-5 py-4 space-y-3.5">
              {flaggedProducts.map((p) => (
                <div key={p.rank} className="flex items-center gap-3">
                  {/* Rank */}
                  <div className="w-5 h-5 flex items-center justify-center text-[11px] font-bold text-slate-500 shrink-0">{p.rank}</div>
                  {/* Thumbnail */}
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${p.imgCls} shrink-0`} />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{p.sub}</div>
                  </div>
                  {/* Badge */}
                  <span className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${p.bCls}`}>{p.badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Admin Activity */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100">
              <span className="text-[14px] font-bold text-slate-900">Recent Admin Activity</span>
            </div>
            <div className="px-5 py-4">
              <div className="relative space-y-4">
                {/* Vertical line */}
                <div className="absolute left-3 top-3 bottom-3 w-px bg-slate-100 z-0" />
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 relative z-10">
                    <div className={`w-7 h-7 rounded-full ${a.bg} ${a.ic} flex items-center justify-center border-2 border-white shrink-0 shadow-sm`}>
                      <a.Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="text-[12px] font-bold text-slate-900">{a.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate">{a.sub}</div>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 pt-0.5 whitespace-nowrap">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
