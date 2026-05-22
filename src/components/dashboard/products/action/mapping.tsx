"use client";

import React from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Plus,
  FileText,
  Search,
  X,
  AlertTriangle,
  Link as LinkIcon,
  Upload,
  Info,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const donutData = [
  { name: "High",   value: 3, color: "#22c55e" },
  { name: "Medium", value: 2, color: "#3b82f6" },
  { name: "Low",    value: 1, color: "#ef4444" },
];

const mappings = [
  {
    retailer:    "Amazon",
    title:       "Sony WH-1000XM5 Wireless Noise Canceling Headphones, Black",
    skuType:     "ASIN",
    skuValue:    "B09XS7JWHH",
    price:       "$299.00",
    availability:"In Stock",
    matchType:   "Exact ASIN",
    confidence:  "High",
    lastChecked: "12 min ago",
    status:      "Active",
    actions:     ["View", "Unlink", "Mark Correct"],
  },
  {
    retailer:    "Best Buy",
    title:       "Sony WH1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones - Black",
    skuType:     "SKU",
    skuValue:    "6505727",
    price:       "$329.99",
    availability:"In Stock",
    matchType:   "Brand + Model",
    confidence:  "High",
    lastChecked: "18 min ago",
    status:      "Active",
    actions:     ["View", "Unlink"],
  },
  {
    retailer:    "Walmart",
    title:       "Sony WH-1000XM5 Wireless Headphones",
    skuType:     "Item",
    skuValue:    "419577912",
    price:       "$329.00",
    availability:"In Stock",
    matchType:   "Semantic Match",
    confidence:  "Medium",
    lastChecked: "25 min ago",
    status:      "Review",
    actions:     ["Review", "View", "Investigate"],
  },
  {
    retailer:    "Target",
    title:       "Sony Premium Wireless Headphones",
    skuType:     "Product ID",
    skuValue:    "8741638",
    price:       "$339.99",
    availability:"Limited Stock",
    matchType:   "Low Confidence",
    confidence:  "Low",
    lastChecked: "39 min ago",
    status:      "Needs Review",
    actions:     ["View", "Unlink"],
  },
  {
    retailer:    "eBay",
    title:       "Sony WH-1000XM5 Black New Sealed",
    skuType:     "Item",
    skuValue:    "295742133469",
    price:       "$278.00",
    availability:"Varies",
    matchType:   "Manual Match",
    confidence:  "Medium",
    lastChecked: "1 h ago",
    status:      "Active",
    actions:     ["View", "Edit"],
  },
  {
    retailer:    "Newegg",
    title:       "Sony WH-1000XM5 ANC Headphones",
    skuType:     "Item",
    skuValue:    "N82E16826123456",
    price:       "$309.99",
    availability:"In Stock",
    matchType:   "Brand + Model",
    confidence:  "High",
    lastChecked: "2 h ago",
    status:      "Active",
    actions:     ["View"],
  },
];

// ─── Retailer Logos ───────────────────────────────────────────────────────────

const RetailerLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Amazon":
      return (
        <div className="w-7 h-7 rounded bg-[#1a1a1a] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="52" fontWeight="900" fill="white" fontFamily="Arial">a</text>
            <path d="M18 72 Q50 84 82 72" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M76 68 L82 72 L76 76" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    case "Best Buy":
      return (
        <div className="w-7 h-7 rounded bg-[#FFF200] flex flex-col items-center justify-center shrink-0 shadow-sm">
          <span className="text-[6px] font-black text-black leading-none tracking-tighter text-center">BEST<br />BUY</span>
        </div>
      );
    case "Walmart":
      return (
        <div className="w-7 h-7 rounded bg-[#0071CE] flex items-center justify-center shrink-0 shadow-sm">
          <svg viewBox="0 0 36 36" className="w-4 h-4" fill="#FFC220" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2 L19.5 11 L21 2 L18 2Z M18 34 L19.5 25 L21 34 L18 34Z M2 18 L11 16.5 L2 15 L2 18Z M34 18 L25 16.5 L34 15 L34 18Z M6.5 6.5 L13 13 L14 11 L7.5 4.5 L6.5 6.5Z M29.5 29.5 L23 23 L22 25 L28.5 31.5 L29.5 29.5Z M29.5 6.5 L28.5 4.5 L22 11 L23 13 L29.5 6.5Z M6.5 29.5 L7.5 31.5 L14 25 L13 23 L6.5 29.5Z"/>
          </svg>
        </div>
      );
    case "Target":
      return (
        <div className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#CC0000" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="2" fill="#CC0000"/>
          </svg>
        </div>
      );
    case "eBay":
      return (
        <div className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm px-0.5">
          <span className="flex text-[11px] font-extrabold tracking-tighter leading-none">
            <span className="text-[#E53238]">e</span>
            <span className="text-[#0064D2]">b</span>
            <span className="text-[#F5AF02]">a</span>
            <span className="text-[#86B817]">y</span>
          </span>
        </div>
      );
    case "Newegg":
      return (
        <div className="w-7 h-7 rounded bg-[#002B5C] flex items-center justify-center shrink-0 shadow-sm px-1">
          <span className="text-[6px] font-black text-[#FF6600] leading-none tracking-tight">newegg</span>
        </div>
      );
    default:
      return (
        <div className="w-7 h-7 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
          {name.charAt(0)}
        </div>
      );
  }
};

// ─── Badge Components ─────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  if (s === "active") return (
    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px] whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      {status}
    </span>
  );
  if (s === "high") return (
    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
      {status}
    </span>
  );
  if (s === "review" || s === "medium") return (
    <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
      {status}
    </span>
  );
  if (s === "needs review") return (
    <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px] whitespace-nowrap">
      Needs Review
    </span>
  );
  if (s === "wait") return (
    <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
      {status}
    </span>
  );
  if (s === "low") return (
    <span className="font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 text-[11px]">
      {status}
    </span>
  );
  return (
    <span className="font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
      {status}
    </span>
  );
};

const MatchTypeBadge = ({ type }: { type: string }) => {
  if (type === "Exact ASIN" || type === "Brand + Model")
    return <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-none hover:bg-emerald-50 text-[11px] font-medium rounded px-2 py-0.5">{type}</Badge>;
  if (type === "Semantic Match")
    return <Badge className="bg-blue-50 text-blue-700 border border-blue-200 shadow-none hover:bg-blue-50 text-[11px] font-medium rounded px-2 py-0.5">{type}</Badge>;
  if (type === "Low Confidence")
    return <Badge className="bg-red-50 text-red-600 border border-red-200 shadow-none hover:bg-red-50 text-[11px] font-medium rounded px-2 py-0.5">{type}</Badge>;
  if (type === "Manual Match")
    return <Badge className="bg-purple-50 text-purple-700 border border-purple-200 shadow-none hover:bg-purple-50 text-[11px] font-medium rounded px-2 py-0.5">{type}</Badge>;
  return <Badge className="bg-slate-50 text-slate-600 border border-slate-200 shadow-none hover:bg-slate-50 text-[11px] font-medium rounded px-2 py-0.5">{type}</Badge>;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductMapping() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-full bg-[#f8f9fb]">

      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="px-6 pt-4 pb-0 shrink-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-slate-500 mb-3">
          <Link href="/dashboard" className="hover:text-slate-800 transition-colors">Admin</Link>
          <span className="text-slate-300">/</span>
          <Link href="/dashboard/products" className="hover:text-slate-800 transition-colors">Products</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 cursor-pointer hover:text-slate-800 transition-colors">Sony WH-1000XM5</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-medium">Mappings</span>
        </nav>

        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-bold text-slate-900 leading-tight tracking-tight">Product Mapping</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Review retailer mappings, match confidence, and canonical product relationships.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
            <button className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              Add Manual Mapping
            </button>
            <button className="h-9 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors">
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Refresh Mappings
            </button>
            <button className="h-9 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-semibold rounded-lg flex items-center gap-2 shadow-sm transition-colors">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              View Mapping Rules
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="px-6 pt-3 pb-6 flex flex-col gap-4 flex-1 min-h-0">

        {/* ── Product Header Card ─────────────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex gap-5 items-start">
            {/* Product image */}
            <div className="w-[120px] h-[120px] rounded-lg border border-slate-200 bg-white flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&q=80"
                alt="Sony WH-1000XM5"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Product meta */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[17px] font-bold text-slate-900 mb-3 leading-snug">
                Sony WH-1000XM5 Wireless Headphones
              </h2>

              {/* Brand / Model / Category row */}
              <div className="flex items-start gap-0 mb-4">
                <div className="pr-5">
                  <div className="text-[11px] text-slate-400 font-medium mb-0.5">Brand</div>
                  <div className="text-[13px] font-semibold text-slate-800">Sony</div>
                </div>
                <div className="w-px bg-slate-200 self-stretch mx-0 my-0.5" />
                <div className="px-5">
                  <div className="text-[11px] text-slate-400 font-medium mb-0.5">Model</div>
                  <div className="text-[13px] font-semibold text-slate-800">WH-1000XM5</div>
                </div>
                <div className="w-px bg-slate-200 self-stretch mx-0 my-0.5" />
                <div className="pl-5">
                  <div className="text-[11px] text-slate-400 font-medium mb-0.5">Category</div>
                  <div className="text-[13px] font-semibold text-slate-800">Electronics &gt; Headphones</div>
                </div>
              </div>

              {/* Canonical ID */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-slate-500 font-medium">Canonical Product ID</span>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1">
                  <span className="text-[13px] font-bold text-slate-900 font-mono tracking-wide">PRD-001482</span>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Right info block — exact match to screenshot ── */}
            <div className="border border-slate-200 rounded-xl bg-white shrink-0 flex overflow-hidden shadow-sm" style={{ minWidth: 400 }}>
              {/* Left 2×2 grid */}
              <div className="flex flex-col flex-1">
                {/* Top row */}
                <div className="flex border-b border-slate-200" style={{ minHeight: 64 }}>
                  {/* Status */}
                  <div className="flex-1 border-r border-slate-200 p-3.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Status</div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                  {/* AI Verdict */}
                  <div className="flex-1 p-3.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">AI Verdict</div>
                    <span className="inline-flex text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
                      Wait
                    </span>
                  </div>
                </div>
                {/* Bottom row */}
                <div className="flex" style={{ minHeight: 64 }}>
                  {/* Confidence Score */}
                  <div className="flex-1 border-r border-slate-200 p-3.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Confidence Score</div>
                    <span className="inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                      High
                    </span>
                  </div>
                  {/* Retailer listings */}
                  <div className="flex-1 p-3.5">
                    <div className="text-[12px] font-bold text-slate-900 leading-tight">
                      4 mapped retailer listings
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-[11px] text-slate-500">
                      <RefreshCw className="w-3 h-3 text-slate-400 shrink-0" />
                      last refreshed 12 min ago
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Buy Score — right column */}
              <div className="border-l border-slate-200 flex flex-col items-center justify-center px-6 py-4 bg-slate-50/50 shrink-0" style={{ width: 120 }}>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">AI Buy Score</div>
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="text-[44px] font-black text-orange-500 leading-none tracking-tighter">76</span>
                  <span className="text-[13px] font-semibold text-slate-400 ml-0.5">/100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two-column layout: table + sidebar ─────────────────────────── */}
        <div className="flex gap-5 items-start flex-1 min-h-0">

          {/* ── Retailer Mappings Table ──────────────────────────────────── */}
          <div className="flex flex-col flex-1 min-w-0 min-h-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-3.5 border-b border-slate-200">
              <h2 className="text-[14px] font-bold text-slate-900">Retailer Mappings</h2>
            </div>

            {/* Toolbar */}
            <div className="px-5 py-3 border-b border-slate-200 flex items-center gap-3 bg-white">
              {/* Search input */}
              <div className="relative flex-1 max-w-[280px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search retailer title, SKU, ASIN, or item ID..."
                  className="w-full h-8 pl-8 pr-3 text-[12px] bg-white border border-slate-200 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Filter dropdowns */}
              <div className="flex items-center gap-2 ml-auto">
                {["Retailer", "Match Type", "Confidence", "Status"].map((f) => (
                  <button
                    key={f}
                    className="h-8 px-3 text-[12px] font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {f}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
                <button className="h-8 px-2.5 text-[12px] font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:bg-slate-100 rounded-md transition-colors ml-1">
                  <X className="w-3.5 h-3.5" />
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1 min-h-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 border-b border-slate-200 hover:bg-slate-50">
                    {[
                      "Retailer",
                      "Retailer Product Title",
                      "Retailer SKU / ASIN / Item ID",
                      "Price",
                      "Availability",
                      "Match Type",
                      "Match Confidence",
                      "Last Checked",
                      "Status",
                      "Actions",
                    ].map((col, i) => (
                      <TableHead
                        key={col}
                        className={`text-[12px] font-semibold text-slate-700 normal-case tracking-normal whitespace-nowrap py-2.5 px-4 ${
                          i >= 6 && i <= 8 ? "text-center" : i === 9 ? "text-right" : ""
                        }`}
                      >
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappings.map((m, idx) => (
                    <TableRow
                      key={idx}
                      className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Retailer */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <RetailerLogo name={m.retailer} />
                          <span className="text-[13px] font-semibold text-slate-900">{m.retailer}</span>
                        </div>
                      </TableCell>

                      {/* Title */}
                      <TableCell className="py-3 px-4 max-w-[200px]">
                        <p className="text-[12px] text-slate-700 font-medium truncate leading-snug" title={m.title}>
                          {m.title}
                        </p>
                      </TableCell>

                      {/* SKU */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.skuType}</span>
                          <span className="text-[12px] font-bold text-slate-800 font-mono">{m.skuValue}</span>
                        </div>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[13px] font-semibold text-slate-900">{m.price}</span>
                      </TableCell>

                      {/* Availability */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[12px] font-semibold ${
                            m.availability === "In Stock"
                              ? "text-emerald-600"
                              : m.availability === "Limited Stock"
                              ? "text-amber-600"
                              : "text-slate-600"
                          }`}
                        >
                          {m.availability}
                        </span>
                      </TableCell>

                      {/* Match Type */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <MatchTypeBadge type={m.matchType} />
                      </TableCell>

                      {/* Match Confidence */}
                      <TableCell className="py-3 px-4 text-center whitespace-nowrap">
                        <StatusBadge status={m.confidence} />
                      </TableCell>

                      {/* Last Checked */}
                      <TableCell className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[12px] text-slate-500 font-medium">{m.lastChecked}</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3 px-4 text-center whitespace-nowrap">
                        <StatusBadge status={m.status} />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2.5">
                          {m.actions.map((action) => {
                            if (action === "Mark Correct") {
                              return (
                                <button
                                  key={action}
                                  className="text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded transition-colors"
                                >
                                  Mark Correct
                                </button>
                              );
                            }
                            if (action === "Review") {
                              return (
                                <button key={action} className="text-[12px] font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                                  {action}
                                </button>
                              );
                            }
                            return (
                              <button key={action} className="text-[12px] font-semibold text-blue-600 hover:underline transition-colors">
                                {action}
                              </button>
                            );
                          })}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-3.5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[12px] text-slate-500 font-medium">Showing 1–6 of 12 mappings</span>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-[12px]" disabled>
                  &lt;
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-[12px] bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 font-bold">
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-[12px] font-medium">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-[12px]">
                  &gt;
                </Button>
                <div className="ml-2 flex items-center gap-1 border border-slate-200 rounded px-2.5 py-1 bg-white text-[12px] text-slate-600 cursor-pointer hover:bg-slate-50 font-medium shadow-sm">
                  10 / page <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ─────────────────────────────────────────────── */}
          <div className="w-[300px] shrink-0 flex flex-col gap-4">

            {/* Match Confidence Summary */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-slate-200 flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-900">Match Confidence Summary</span>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  {/* Text list */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {[
                      { label: "Exact identifier matches", val: "2", color: "text-emerald-600" },
                      { label: "Brand + model matches",    val: "2", color: "text-emerald-600" },
                      { label: "Manual matches",           val: "1", color: "text-blue-600" },
                      { label: "Needs review",             val: "1", color: "text-amber-500" },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between text-[12px]">
                        <span className="text-slate-600 font-medium">{r.label}</span>
                        <span className={`font-bold ${r.color}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Donut chart */}
                  <div className="shrink-0">
                    <div className="w-[75px] h-[75px]">
                      {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={donutData}
                              innerRadius={20}
                              outerRadius={36}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              startAngle={90}
                              endAngle={-270}
                            >
                              {donutData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="w-[75px] h-[75px] bg-slate-100/50 rounded-full animate-pulse" />
                      )}
                    </div>
                    {/* Legend */}
                    <div className="flex flex-col gap-1 mt-1.5">
                      {donutData.map((d) => (
                        <div key={d.name} className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                          <span className="text-slate-600 font-medium">{d.name}</span>
                          <span className="text-slate-400 ml-auto">{d.value} ({Math.round((d.value / 6) * 100)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Duplicate Warning */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[13px] font-bold text-slate-900">Duplicate Warning</span>
                </div>
                <p className="text-[12px] text-slate-500">2 potentially related canonical products found.</p>
              </div>
              <div className="px-4 pb-4 space-y-2">
                {/* Dupe items */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-100">
                    <span className="text-[12px] font-semibold text-slate-800 truncate mr-2">Sony WH-1000XM5 (Silver)</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-slate-500">
                        Similarity <span className="font-bold text-slate-700">82%</span>
                      </span>
                      <button className="text-[11px] font-semibold text-blue-600 border border-blue-200 rounded px-2.5 py-1 hover:bg-blue-50 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-[12px] font-semibold text-slate-800 truncate mr-2">Sony WH-1000XM4</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-slate-500">
                        Similarity <span className="font-bold text-slate-700">64%</span>
                      </span>
                      <button className="text-[11px] font-semibold text-blue-600 border border-blue-200 rounded px-2.5 py-1 hover:bg-blue-50 transition-colors">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold py-2 rounded-lg transition-colors">
                    Merge Review
                  </button>
                  <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[12px] font-semibold py-2 rounded-lg transition-colors">
                    Keep Separate
                  </button>
                </div>
              </div>
            </div>

            {/* Manual Mapping Tools */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-slate-200">
                <span className="text-[13px] font-bold text-slate-900">Manual Mapping Tools</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { icon: Search,  label: "Search retailer listing" },
                  { icon: Plus,    label: "Create manual mapping" },
                  { icon: LinkIcon,label: "Link by ASIN/SKU" },
                  { icon: Upload,  label: "Import mapping CSV" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 text-left text-blue-600 hover:text-blue-700 group"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-[12px] font-semibold leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mapping Activity */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-slate-200">
                <span className="text-[13px] font-bold text-slate-900">Mapping Activity</span>
              </div>
              <div className="p-4 space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    iconBg: "bg-emerald-50",
                    iconBorder: "border-emerald-200",
                    iconColor: "text-emerald-600",
                    text: "Admin Lee marked Amazon listing as correct",
                    time: "12 min ago",
                  },
                  {
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconBorder: "border-amber-200",
                    iconColor: "text-amber-500",
                    text: "System flagged Target match as low confidence",
                    time: "39 min ago",
                  },
                  {
                    icon: Info,
                    iconBg: "bg-blue-50",
                    iconBorder: "border-blue-200",
                    iconColor: "text-blue-500",
                    text: "Walmart mapping updated",
                    time: "25 min ago",
                  },
                ].map(({ icon: Icon, iconBg, iconBorder, iconColor, text, time }, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-6 h-6 rounded-full ${iconBg} border ${iconBorder} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-3 h-3 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-slate-700 font-medium leading-snug">{text}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium shrink-0 whitespace-nowrap">{time}</span>
                  </div>
                ))}

                <div className="pt-1 flex justify-center">
                  <button className="flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:underline transition-colors">
                    View all activity <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
