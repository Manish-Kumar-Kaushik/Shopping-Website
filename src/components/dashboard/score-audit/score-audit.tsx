"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Download, RefreshCw, Search, SlidersHorizontal, X,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, ClipboardCheck,
  TrendingUp, AlertTriangle, User, MessageSquare, Settings, ShoppingBag, ChevronDown,
  Info, RotateCcw,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Confidence = "High" | "Medium" | "Low";
type Tab = "All" | "Score Changed" | "Low Confidence" | "Manual Override" | "Needs Explanation";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  aiScore: number;
  valueScore: number;
  qualityScore: number;
  reviewTrust: number;
  priceScore: number;
  healthSafety: number | "N/A";
  confidence: Confidence;
  scoreVersion: string;
  lastChange: string;
  lastChangeNote?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 1, name: "Sony WH-1000XM5", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&auto=format&fit=crop&q=60", category: "Electronics > Headphones", aiScore: 76, valueScore: 72, qualityScore: 85, reviewTrust: 88, priceScore: 63, healthSafety: "N/A", confidence: "High", scoreVersion: "electronics-v1.2", lastChange: "-6 pts, 2h ago" },
  { id: 2, name: "CeraVe Moisturizing Cream", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&auto=format&fit=crop&q=60", category: "Health & Beauty > Skincare", aiScore: 84, valueScore: 79, qualityScore: 86, reviewTrust: 82, priceScore: 77, healthSafety: 91, confidence: "High", scoreVersion: "beauty-v1.4", lastChange: "+4 pts, 5h ago" },
  { id: 3, name: "Ninja Air Fryer XL", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=80&auto=format&fit=crop&q=60", category: "Home & Kitchen > Small Appliances", aiScore: 82, valueScore: 80, qualityScore: 84, reviewTrust: 74, priceScore: 78, healthSafety: "N/A", confidence: "Medium", scoreVersion: "home-v1.1", lastChange: "+2 pts, 1d ago" },
  { id: 4, name: "Apple iPad 10th Gen", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&auto=format&fit=crop&q=60", category: "Electronics > Tablets", aiScore: 45, valueScore: 58, qualityScore: 87, reviewTrust: 89, priceScore: 32, healthSafety: "N/A", confidence: "High", scoreVersion: "electronics-v1.2", lastChange: "-12 pts, 3h ago" },
  { id: 5, name: "The Ordinary Niacinamide 10%", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&auto=format&fit=crop&q=60", category: "Health & Beauty > Skincare", aiScore: 61, valueScore: 64, qualityScore: 68, reviewTrust: 70, priceScore: 59, healthSafety: 85, confidence: "Medium", scoreVersion: "beauty-v1.4", lastChange: "Manual override, 6h ago", lastChangeNote: "Manual override" },
  { id: 6, name: "Orgain Organic Protein", image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=80&auto=format&fit=crop&q=60", category: "Health > Supplements", aiScore: 71, valueScore: 69, qualityScore: 75, reviewTrust: 66, priceScore: 70, healthSafety: 62, confidence: "Low", scoreVersion: "health-v1.0", lastChange: "Needs explanation, 6h ago", lastChangeNote: "Needs explanation" },
  { id: 7, name: "Bose QuietComfort Ultra", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=80&auto=format&fit=crop&q=60", category: "Electronics > Headphones", aiScore: 73, valueScore: 70, qualityScore: 88, reviewTrust: 86, priceScore: 61, healthSafety: "N/A", confidence: "Medium", scoreVersion: "electronics-v1.2", lastChange: "-3 pts, 4h ago" },
];

const RECENT_CHANGES = [
  { name: "Sony WH-1000XM5", change: -6, time: "2h ago", color: "text-red-500", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&auto=format&fit=crop&q=60" },
  { name: "CeraVe Moisturizing Cream", change: +4, time: "5h ago", color: "text-green-500", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=80&auto=format&fit=crop&q=60" },
  { name: "Apple iPad 10th Gen", change: -12, time: "3h ago", color: "text-red-500", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&auto=format&fit=crop&q=60" },
  { name: "Ninja Air Fryer XL", change: +2, time: "1d ago", color: "text-green-500", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=80&auto=format&fit=crop&q=60" },
  { name: "The Ordinary Niacinamide 10%", change: 0, time: "6h ago", color: "text-orange-500", note: "Manual override", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&auto=format&fit=crop&q=60" },
];

const SCORE_VERSIONS = [
  { label: "electronics-v1.2", count: 96, pct: 38, color: "bg-blue-500" },
  { label: "beauty-v1.4", count: 68, pct: 27, color: "bg-purple-500" },
  { label: "home-v1.1", count: 44, pct: 18, color: "bg-teal-500" },
  { label: "health-v1.0", count: 40, pct: 16, color: "bg-emerald-500" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(val: number | "N/A") {
  if (val === "N/A") return "text-slate-400";
  if (val >= 80) return "text-emerald-600 font-semibold";
  if (val >= 70) return "text-blue-600 font-semibold";
  if (val >= 60) return "text-amber-600 font-semibold";
  return "text-rose-500 font-semibold";
}

function scoreBadgeStyle(val: number) {
  if (val >= 80) return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (val >= 70) return "bg-blue-50 text-blue-600 border border-blue-100";
  if (val >= 60) return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-rose-50 text-rose-500 border border-rose-100";
}

function confidenceDot(c: Confidence) {
  if (c === "High") return "bg-emerald-500";
  if (c === "Medium") return "bg-amber-500";
  return "bg-rose-500";
}

function versionBadgeStyle(v: string) {
  if (v.startsWith("electronics")) return "bg-blue-50 text-blue-600 border border-blue-100";
  if (v.startsWith("beauty")) return "bg-purple-50 text-purple-600 border border-purple-100";
  if (v.startsWith("home")) return "bg-teal-50 text-teal-600 border border-teal-100";
  return "bg-emerald-50 text-emerald-600 border border-emerald-100";
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, trend, trendLabel, iconBg }: {
  icon: React.ReactNode; label: string; value: number; trend: string; trendLabel: string; iconBg: string;
}) {
  const isUp = trend.startsWith("+");
  const displayTrend = trend.replace("+", "").replace("-", "");
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", iconBg)}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[12px] text-slate-500 font-semibold">{label}</p>
        <p className="text-2xl font-bold text-slate-800 leading-tight mt-0.5">{value}</p>
        <p className={cn("text-[11px] mt-1 font-semibold flex items-center gap-0.5", isUp ? "text-emerald-600" : "text-rose-500")}>
          <span>{isUp ? "▲" : "▼"}</span>
          <span>{displayTrend}</span>
          <span className="text-slate-400 font-normal ml-0.5">{trendLabel}</span>
        </p>
      </div>
    </div>
  );
}

// ─── Donut Chart (SVG) ────────────────────────────────────────────────────────

function DonutChart({ segments, size = 80 }: { segments: { value: number; color: string }[]; size?: number }) {
  const r = 30, cx = 40, cy = 40, circ = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((a, b) => a + b.value, 0);
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      {segments.map((seg, i) => {
        const dash = (seg.value / total) * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color}
            strokeWidth="14" strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset} transform="rotate(-90 40 40)" />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ScoreAudit() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const tabs: Tab[] = ["All", "Score Changed", "Low Confidence", "Manual Override", "Needs Explanation"];

  const filtered = PRODUCTS.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (activeTab === "Low Confidence") return p.confidence === "Low";
    if (activeTab === "Manual Override") return p.lastChangeNote === "Manual override";
    if (activeTab === "Needs Explanation") return p.lastChangeNote === "Needs explanation";
    return true;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* ── Top Header Section (Full Width) ── */}
      <div className="px-6 pt-5 pb-0">
        {/* Breadcrumb row */}
        <nav className="flex items-center gap-1.5 text-[12px] text-slate-500 mb-2">
          <span className="hover:text-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-medium">Score Audit</span>
        </nav>

        {/* Title and Action Buttons Row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-tight">Score Audit</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Review products with score changes, low confidence, manual overrides, and explanations needed.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 xl:hidden">
            <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all cursor-pointer">
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export Audit
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Refresh
            </button>
            <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-[#0066FF] rounded-lg text-white hover:bg-blue-700 shadow-sm transition-all cursor-pointer">
              <Settings className="w-3.5 h-3.5" /> Score Rules
            </button>
          </div>
        </div>
      </div>

      {/* ── Split Layout Grid ── */}
      <div className="flex flex-1 gap-6 px-6 pb-6 min-h-0 mt-5">
        {/* Left Side: Stats, Tabs, Filters, Table */}
        <div className="flex-1 min-w-0">
          {/* Stat Cards */}
          <div className="grid grid-cols-5 gap-3">
            <StatCard icon={<ShoppingBag className="w-5 h-5 text-white" />} label="Products Audited" value={248} trend="+18%" trendLabel="vs May 5 – May 11" iconBg="bg-[#0066FF]" />
            <StatCard icon={<TrendingUp className="w-5 h-5 text-white" />} label="Score Changed" value={42} trend="+22%" trendLabel="vs May 5 – May 11" iconBg="bg-[#22C55E]" />
            <StatCard icon={<AlertTriangle className="w-5 h-5 text-white" />} label="Low Confidence" value={18} trend="-10%" trendLabel="vs May 5 – May 11" iconBg="bg-[#F59E0B]" />
            <StatCard icon={<User className="w-5 h-5 text-white" />} label="Manual Overrides" value={9} trend="+29%" trendLabel="vs May 5 – May 11" iconBg="bg-[#8B5CF6]" />
            <StatCard icon={<MessageSquare className="w-5 h-5 text-white" />} label="Needs Explanation" value={27} trend="+13%" trendLabel="vs May 5 – May 11" iconBg="bg-[#F97316]" />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 mt-5 border-b border-slate-200">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-all -mb-px whitespace-nowrap cursor-pointer ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search product, brand, ASIN, SKU..."
                className="h-11 pl-9 pr-3 w-60 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm" />
            </div>
            {["Category", "Confidence", "Score Version", "Change Type", "Health/Safety"].map(f => (
              <div key={f} className="flex flex-col justify-center px-3 py-1 bg-white border border-slate-200 rounded-lg cursor-pointer h-11 min-w-[95px] relative pr-7 hover:border-slate-300 transition-all select-none shadow-sm">
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-tight">{f}</span>
                <span className="text-[12px] text-slate-800 font-bold leading-tight mt-0.5">All</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            ))}
            <button className="flex items-center gap-1.5 h-11 px-4 text-[12px] font-bold border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" /> More Filters
            </button>
            <button onClick={() => setSearchQuery("")}
              className="flex items-center gap-1 text-[12px] font-bold text-[#0066FF] hover:text-blue-800 transition-all ml-1 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
            </button>
          </div>

          {/* Table */}
          <div className="mt-3 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Product", "Category", "AI Buy Score ⓘ", "Value Score", "Quality Score", "Review Trust", "Price Score", "Health/Safety", "Confidence", "Score Version", "Last Change", "Action"].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                        {h === "AI Buy Score ⓘ" ? (
                          <span className="flex items-center gap-1">
                            AI Buy Score <Info className="w-3 h-3 text-slate-400" />
                          </span>
                        ) : h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-slate-100 shrink-0" />
                          <span className="font-bold text-slate-800 whitespace-nowrap max-w-[140px] truncate">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap max-w-[140px]">
                        <span className="block truncate font-medium">{p.category}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={cn("inline-flex items-center justify-center w-8 h-7 rounded-md text-[12px] font-bold border", scoreBadgeStyle(p.aiScore))}>
                          {p.aiScore}
                        </span>
                      </td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.valueScore)}>{p.valueScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.qualityScore)}>{p.qualityScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.reviewTrust)}>{p.reviewTrust}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.priceScore)}>{p.priceScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.healthSafety)}>{p.healthSafety}</span></td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-700">
                          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", confidenceDot(p.confidence))} />
                          <span>{p.confidence}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={cn("inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border whitespace-nowrap font-mono", versionBadgeStyle(p.scoreVersion))}>
                          {p.scoreVersion}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        {(() => {
                          const parts = p.lastChange.split(", ");
                          let colorClass = "text-slate-500";
                          if (p.lastChangeNote === "Manual override") {
                            colorClass = "text-amber-500";
                          } else if (p.lastChangeNote === "Needs explanation") {
                            colorClass = "text-orange-500";
                          } else if (p.lastChange.startsWith("-")) {
                            colorClass = "text-rose-500";
                          } else if (p.lastChange.startsWith("+")) {
                            colorClass = "text-emerald-600";
                          }
                          
                          if (parts.length > 1) {
                            return (
                              <div className="flex flex-col leading-tight">
                                <span className={cn("font-bold text-[12px]", colorClass)}>{parts[0]},</span>
                                <span className="text-slate-400 text-[10px] font-normal">{parts[1]}</span>
                              </div>
                            );
                          }
                          return <span className={cn("font-bold text-[12px]", colorClass)}>{p.lastChange}</span>;
                        })()}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => router.push(`/dashboard/audit/${p.id}`)} className="text-[12px] font-bold text-blue-600 hover:underline hover:text-blue-800 cursor-pointer">View</button>
                          <span className="text-slate-300">|</span>
                          <button className="text-[12px] font-bold text-blue-600 hover:underline hover:text-blue-800 cursor-pointer">Audit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white">
              <span className="text-[12px] text-slate-500">Showing 1 to {Math.min(perPage, filtered.length)} of 248 results</span>
              <div className="flex items-center gap-1">
                <select className="h-7 px-2 text-[12px] border border-slate-200 rounded bg-white text-slate-700 focus:outline-none mr-2">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
                {[
                  { icon: <ChevronsLeft className="w-3.5 h-3.5" />, action: () => setCurrentPage(1) },
                  { icon: <ChevronLeft className="w-3.5 h-3.5" />, action: () => setCurrentPage(p => Math.max(1, p - 1)) },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.action} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer">{btn.icon}</button>
                ))}
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setCurrentPage(n)}
                    className={`w-7 h-7 flex items-center justify-center rounded text-[12px] font-medium transition-all cursor-pointer ${currentPage === n ? "bg-blue-600 text-white border border-blue-600" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {n}
                  </button>
                ))}
                {[
                  { icon: <ChevronRight className="w-3.5 h-3.5" />, action: () => setCurrentPage(p => p + 1) },
                  { icon: <ChevronsRight className="w-3.5 h-3.5" />, action: () => setCurrentPage(25) },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.action} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer">{btn.icon}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Column */}
        <div className="w-80 shrink-0 hidden xl:flex flex-col gap-4">
          {/* Action Buttons Group (Desktop) */}
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 h-8 px-2 text-[11px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all cursor-pointer whitespace-nowrap">
              <Download className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Export Audit
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 h-8 px-2 text-[11px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all cursor-pointer whitespace-nowrap">
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 shrink-0" /> Refresh
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 h-8 px-2 text-[11px] font-semibold bg-[#0066FF] rounded-lg text-white hover:bg-blue-700 shadow-sm transition-all cursor-pointer whitespace-nowrap">
              <Settings className="w-3.5 h-3.5 shrink-0" /> Score Rules
            </button>
          </div>

          {/* Analytics Panel */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-5 shadow-sm">
            {/* Recent Score Changes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-bold text-slate-800">Recent Score Changes</h3>
              <button className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer">View all</button>
            </div>
            <div className="space-y-3">
              {RECENT_CHANGES.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2.5 py-0.5">
                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover border border-slate-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-slate-800 truncate leading-tight">{item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                  <div className="flex flex-col items-end text-[11px] font-bold shrink-0 leading-tight">
                    {item.note ? (
                      <>
                        <span className="text-amber-500 text-right">Manual</span>
                        <span className="text-amber-500 text-right">override</span>
                      </>
                    ) : (
                      <span className={item.change < 0 ? "text-rose-500" : "text-emerald-600"}>
                        {item.change > 0 ? `+${item.change} pts` : `${item.change} pts`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Distribution by Confidence */}
          <div>
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Distribution by Confidence</h3>
            <div className="flex items-center gap-3">
              <DonutChart segments={[
                { value: 142, color: "#22C55E" },
                { value: 72, color: "#F59E0B" },
                { value: 34, color: "#EF4444" },
              ]} size={80} />
              <div className="space-y-1.5 flex-1">
                {[
                  { label: "High", count: 142, pct: 57, color: "bg-emerald-500" },
                  { label: "Medium", count: 72, pct: 29, color: "bg-amber-500" },
                  { label: "Low", count: 34, pct: 14, color: "bg-rose-500" }
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-[11px] font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
                      <span className="text-slate-700">{item.label}</span>
                    </div>
                    <span className="text-slate-400 font-normal">{item.count} ({item.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Score Version Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[13px] font-bold text-slate-800">Score Version Summary</h3>
              <button className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer">View all</button>
            </div>
            <div className="space-y-2.5">
              {SCORE_VERSIONS.map(v => (
                <div key={v.label}>
                  <div className="flex justify-between text-[11px] font-semibold mb-0.5">
                    <span className="text-slate-700 truncate">{v.label}</span>
                    <span className="text-slate-400 font-normal shrink-0 ml-1">{v.count} ({v.pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${v.color}`} style={{ width: `${v.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Audit Reasons */}
          <div>
            <h3 className="text-[13px] font-bold text-slate-800 mb-3">Audit Reasons (All)</h3>
            <div className="flex items-center gap-3">
              <DonutChart segments={[
                { value: 40, color: "#0066FF" },
                { value: 17, color: "#F59E0B" },
                { value: 9, color: "#8B5CF6" },
                { value: 34, color: "#06B6D4" },
              ]} size={80} />
              <div className="space-y-1.5 flex-1">
                {[
                  { label: "Score Changed", count: 42, pct: 40, color: "bg-blue-500" },
                  { label: "Low Confidence", count: 18, pct: 17, color: "bg-amber-500" },
                  { label: "Manual Override", count: 9, pct: 9, color: "bg-purple-500" },
                  { label: "Needs Explanation", count: 27, pct: 34, color: "bg-cyan-500" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-[11px] font-semibold">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
                      <span className="text-slate-700 truncate">{item.label}</span>
                    </div>
                    <span className="text-slate-400 font-normal shrink-0 ml-1">{item.count} ({item.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
