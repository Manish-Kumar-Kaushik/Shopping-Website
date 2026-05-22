"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download, RefreshCw, ShieldCheck, Search, SlidersHorizontal, X,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, ClipboardCheck,
  TrendingUp, AlertTriangle, GitBranch, FileQuestion,
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
  { id: 1, name: "Sony WH-1000XM6", image: "🎧", category: "Electronics > Headphones", aiScore: 76, valueScore: 72, qualityScore: 85, reviewTrust: 88, priceScore: 63, healthSafety: "N/A", confidence: "High", scoreVersion: "electronics-v1.2", lastChange: "-5 pts, 2h ago" },
  { id: 2, name: "CeraVe Moisturizing Cream", image: "🧴", category: "Health & Beauty > Skincare", aiScore: 84, valueScore: 79, qualityScore: 86, reviewTrust: 82, priceScore: 77, healthSafety: 91, confidence: "High", scoreVersion: "beauty-v1.4", lastChange: "+4 pts, 5h ago" },
  { id: 3, name: "Ninja Air Fryer XL", image: "🍳", category: "Home & Kitchen > Small Appliances", aiScore: 82, valueScore: 80, qualityScore: 84, reviewTrust: 74, priceScore: 78, healthSafety: "N/A", confidence: "Medium", scoreVersion: "home-v1.1", lastChange: "+2 pts, 1d ago" },
  { id: 4, name: "Apple iPad 10th Gen", image: "📱", category: "Electronics > Tablets", aiScore: 45, valueScore: 58, qualityScore: 87, reviewTrust: 89, priceScore: 32, healthSafety: "N/A", confidence: "High", scoreVersion: "electronics-v1.2", lastChange: "-12 pts, 3h ago" },
  { id: 5, name: "The Ordinary Niacinamide 10%", image: "💊", category: "Health & Beauty > Skincare", aiScore: 61, valueScore: 64, qualityScore: 68, reviewTrust: 70, priceScore: 59, healthSafety: 85, confidence: "Medium", scoreVersion: "beauty-v1.4", lastChange: "Manual override, 8h ago", lastChangeNote: "Manual override" },
  { id: 6, name: "Orgain Organic Protein", image: "🥤", category: "Health & Beauty > Supplements", aiScore: 71, valueScore: 69, qualityScore: 75, reviewTrust: 66, priceScore: 70, healthSafety: 62, confidence: "Low", scoreVersion: "health-v1.0", lastChange: "Needs explanation, 8h ago", lastChangeNote: "Needs explanation" },
  { id: 7, name: "Bose QuietComfort Ultra", image: "🎧", category: "Electronics > Headphones", aiScore: 73, valueScore: 70, qualityScore: 88, reviewTrust: 86, priceScore: 61, healthSafety: "N/A", confidence: "Medium", scoreVersion: "electronics-v1.2", lastChange: "-3 pts, 4h ago" },
];

const RECENT_CHANGES = [
  { name: "Sony WH-1000XM6", change: -6, time: "2h ago", color: "text-red-500" },
  { name: "CeraVe Moisturizing Cream", change: +4, time: "5h ago", color: "text-green-500" },
  { name: "Apple iPad 10th Gen", change: -12, time: "3h ago", color: "text-red-500" },
  { name: "Ninja Air Fryer XL", change: +2, time: "1d ago", color: "text-green-500" },
  { name: "The Ordinary Niacinamide 10%", change: 0, time: "8h ago", color: "text-orange-500", note: "Manual override" },
];

const SCORE_VERSIONS = [
  { label: "electronics-v1.2", count: 96, pct: 38, color: "bg-blue-500" },
  { label: "beauty-v1.4", count: 68, pct: 27, color: "bg-purple-500" },
  { label: "home-v1.1", count: 44, pct: 18, color: "bg-teal-500" },
  { label: "health-v1.0", count: 40, pct: 16, color: "bg-orange-500" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreColor(val: number | "N/A") {
  if (val === "N/A") return "text-slate-400";
  if (val >= 80) return "text-green-600 font-semibold";
  if (val >= 60) return "text-amber-600 font-semibold";
  return "text-red-500 font-semibold";
}

function confidenceBadge(c: Confidence) {
  if (c === "High") return "bg-green-100 text-green-700 border border-green-200";
  if (c === "Medium") return "bg-amber-100 text-amber-700 border border-amber-200";
  return "bg-red-100 text-red-700 border border-red-200";
}

function confidenceDot(c: Confidence) {
  if (c === "High") return "bg-green-500";
  if (c === "Medium") return "bg-amber-500";
  return "bg-red-500";
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, trend, trendLabel, iconBg }: {
  icon: React.ReactNode; label: string; value: number; trend: string; trendLabel: string; iconBg: string;
}) {
  const isUp = trend.startsWith("+") || trend.includes("▲");
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-start gap-3 shadow-sm">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        <p className={`text-[11px] mt-0.5 font-medium ${isUp ? "text-green-600" : "text-red-500"}`}>
          {trend} <span className="text-slate-400 font-normal">{trendLabel}</span>
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
    <div className="flex h-full min-h-0">
      {/* ── Main Content ── */}
      <div className="flex-1 overflow-y-auto min-w-0">
        <div className="p-5 max-w-[1200px]">
          {/* Breadcrumb and buttons row */}
          <div className="flex items-center justify-between mb-2">
            <nav className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-800 font-medium">Score Audit</span>
            </nav>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <Download className="w-3.5 h-3.5" /> Export Audit
              </button>
              <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-blue-600 rounded-lg text-white hover:bg-blue-700 shadow-sm transition-all">
                <ShieldCheck className="w-3.5 h-3.5" /> Score Rules
              </button>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="mb-1">
            <h1 className="text-2xl font-bold text-slate-800">Score Audit</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Review products with score changes, low confidence, manual overrides, and explanations needed.</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-5 gap-3 mt-4">
            <StatCard icon={<ClipboardCheck className="w-5 h-5 text-blue-600" />} label="Products Audited" value={248} trend="+18%" trendLabel="vs May 5 – May 11" iconBg="bg-blue-50" />
            <StatCard icon={<TrendingUp className="w-5 h-5 text-green-600" />} label="Score Changed" value={42} trend="+22%" trendLabel="vs May 5 – May 11" iconBg="bg-green-50" />
            <StatCard icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} label="Low Confidence" value={18} trend="-10%" trendLabel="vs May 5 – May 11" iconBg="bg-amber-50" />
            <StatCard icon={<GitBranch className="w-5 h-5 text-purple-600" />} label="Manual Overrides" value={9} trend="+25%" trendLabel="vs May 5 – May 11" iconBg="bg-purple-50" />
            <StatCard icon={<FileQuestion className="w-5 h-5 text-orange-500" />} label="Needs Explanation" value={27} trend="+13%" trendLabel="vs May 5 – May 11" iconBg="bg-orange-50" />
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 mt-5 border-b border-slate-200">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-all -mb-px whitespace-nowrap ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Filter row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search product, brand, ASIN, SKU..."
                className="h-8 pl-8 pr-3 w-56 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            {["Category", "Confidence", "Score Version", "Change Type", "Health/Safety"].map(f => (
              <select key={f} className="h-8 px-2 pr-6 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none appearance-none cursor-pointer hover:border-slate-300">
                <option>{f} All</option>
              </select>
            ))}
            <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50">
              <SlidersHorizontal className="w-3.5 h-3.5" /> More Filters
            </button>
            <button onClick={() => setSearchQuery("")}
              className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium text-slate-500 hover:text-slate-800">
              <X className="w-3.5 h-3.5" /> Clear Filters
            </button>
          </div>

          {/* Table */}
          <div className="mt-3 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Product", "Category", "AI Buy Score ⓘ", "Value Score", "Quality Score", "Review Trust", "Price Score", "Health/Safety", "Confidence", "Score Version", "Last Change", "Action"].map(h => (
                      <th key={h} className="text-left px-3 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{p.image}</span>
                          <span className="font-medium text-slate-800 whitespace-nowrap max-w-[140px] truncate">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap max-w-[140px]">
                        <span className="block truncate">{p.category}</span>
                      </td>
                      <td className="px-3 py-2.5"><span className={`text-[13px] ${scoreColor(p.aiScore)}`}>{p.aiScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.valueScore)}>{p.valueScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.qualityScore)}>{p.qualityScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.reviewTrust)}>{p.reviewTrust}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.priceScore)}>{p.priceScore}</span></td>
                      <td className="px-3 py-2.5"><span className={scoreColor(p.healthSafety)}>{p.healthSafety}</span></td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${confidenceBadge(p.confidence)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${confidenceDot(p.confidence)}`} />
                          {p.confidence}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-mono whitespace-nowrap">{p.scoreVersion}</span>
                      </td>
                      <td className="px-3 py-2.5 whitespace-nowrap max-w-[140px]">
                        {p.lastChangeNote ? (
                          <span className="inline-block px-2 py-0.5 rounded bg-orange-50 border border-orange-100 text-orange-700 text-[11px]">{p.lastChangeNote},<br />{p.lastChange.split(",")[1]?.trim()}</span>
                        ) : (
                          <span className={p.lastChange.startsWith("-") ? "text-red-500" : "text-green-600"}>{p.lastChange}</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => router.push(`/dashboard/audit/${p.id}`)} className="text-[11px] font-medium text-blue-600 hover:underline flex items-center gap-0.5"><Eye className="w-3 h-3" />View</button>
                          <button className="text-[11px] font-medium text-slate-600 hover:underline flex items-center gap-0.5"><ClipboardCheck className="w-3 h-3" />Audit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
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
                  <button key={i} onClick={btn.action} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50">{btn.icon}</button>
                ))}
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setCurrentPage(n)}
                    className={`w-7 h-7 flex items-center justify-center rounded text-[12px] font-medium transition-all ${currentPage === n ? "bg-blue-600 text-white border border-blue-600" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    {n}
                  </button>
                ))}
                {[
                  { icon: <ChevronRight className="w-3.5 h-3.5" />, action: () => setCurrentPage(p => p + 1) },
                  { icon: <ChevronsRight className="w-3.5 h-3.5" />, action: () => setCurrentPage(25) },
                ].map((btn, i) => (
                  <button key={i} onClick={btn.action} className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-slate-50">{btn.icon}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-64 shrink-0 border-l border-slate-200 bg-white overflow-y-auto hidden xl:block">
        <div className="p-4 space-y-5">

          {/* Recent Score Changes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wide">Recent Score Changes</h3>
              <button className="text-[11px] text-blue-600 hover:underline font-medium">View all</button>
            </div>
            <div className="space-y-2">
              {RECENT_CHANGES.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] shrink-0">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-slate-800 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">{item.time}</p>
                  </div>
                  <span className={`text-[11px] font-bold shrink-0 ${item.note ? "text-orange-500" : item.change < 0 ? "text-red-500" : "text-green-600"}`}>
                    {item.note ? item.note.split(" ")[0] : item.change > 0 ? `+${item.change} pts` : `${item.change} pts`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Distribution by Confidence */}
          <div>
            <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wide mb-3">Distribution by Confidence</h3>
            <div className="flex items-center gap-3">
              <DonutChart segments={[
                { value: 142, color: "#22c55e" },
                { value: 68, color: "#f59e0b" },
                { value: 34, color: "#ef4444" },
              ]} size={80} />
              <div className="space-y-1.5">
                {[{ label: "High", count: 142, pct: 57, color: "bg-green-500" }, { label: "Medium", count: 68, pct: 27, color: "bg-amber-500" }, { label: "Low", count: 34, pct: 14, color: "bg-red-500" }].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
                    <span className="text-[11px] text-slate-700">{item.label}</span>
                    <span className="text-[11px] text-slate-400 ml-auto">{item.count} ({item.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Score Version Summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wide">Score Version Summary</h3>
              <button className="text-[11px] text-blue-600 hover:underline font-medium">View all</button>
            </div>
            <div className="space-y-2">
              {SCORE_VERSIONS.map(v => (
                <div key={v.label}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-slate-700 font-mono truncate">{v.label}</span>
                    <span className="text-slate-500 shrink-0 ml-1">{v.count} ({v.pct}%)</span>
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
            <h3 className="text-[12px] font-bold text-slate-800 uppercase tracking-wide mb-3">Audit Reasons (All)</h3>
            <div className="flex items-center gap-3">
              <DonutChart segments={[
                { value: 42, color: "#3b82f6" },
                { value: 18, color: "#f59e0b" },
                { value: 9, color: "#8b5cf6" },
                { value: 27, color: "#22c55e" },
              ]} size={80} />
              <div className="space-y-1.5">
                {[
                  { label: "Score Changed", count: 42, pct: 44, color: "bg-blue-500" },
                  { label: "Low Confidence", count: 18, pct: 19, color: "bg-amber-500" },
                  { label: "Manual Override", count: 9, pct: 9, color: "bg-purple-500" },
                  { label: "Needs Explanation", count: 27, pct: 28, color: "bg-green-500" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
                    <span className="text-[10px] text-slate-700 truncate">{item.label}</span>
                    <span className="text-[10px] text-slate-400 ml-auto shrink-0">{item.count} ({item.pct}%)</span>
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
