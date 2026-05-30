"use client";

import React, { useState, useEffect } from "react";
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
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const donutData = [
  { name: "High", value: 3, color: "#10b981" },
  { name: "Medium", value: 2, color: "#3b82f6" },
  { name: "Low", value: 1, color: "#ef4444" },
];

const mappings = [
  {
    retailer: "Amazon",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones, Black",
    skuType: "ASIN",
    skuValue: "B09XS7JWHH",
    price: "$299.00",
    availability: "In Stock",
    matchType: "Exact ASIN",
    confidence: "High",
    lastChecked: "12 min ago",
    status: "Active",
    actions: ["View", "Unlink", "Mark Correct"],
  },
  {
    retailer: "Best Buy",
    title: "Sony WH1000XM5 Wireless Noise-Canceling Over-the-Ear Headphones - Black",
    skuType: "SKU",
    skuValue: "6505727",
    price: "$329.99",
    availability: "In Stock",
    matchType: "Brand + Model",
    confidence: "High",
    lastChecked: "18 min ago",
    status: "Active",
    actions: ["View", "Unlink"],
  },
  {
    retailer: "Walmart",
    title: "Sony WH-1000XM5 Wireless Headphones",
    skuType: "Item",
    skuValue: "419577912",
    price: "$329.00",
    availability: "In Stock",
    matchType: "Semantic Match",
    confidence: "Medium",
    lastChecked: "25 min ago",
    status: "Review",
    actions: ["Review", "View", "Investigate"],
  },
  {
    retailer: "Target",
    title: "Sony Premium Wireless Headphones",
    skuType: "Product ID",
    skuValue: "8741638",
    price: "$339.99",
    availability: "Limited Stock",
    matchType: "Low Confidence",
    confidence: "Low",
    lastChecked: "39 min ago",
    status: "Needs Review",
    actions: ["View", "Unlink"],
  },
  {
    retailer: "eBay",
    title: "Sony WH-1000XM5 Black New Sealed",
    skuType: "Item",
    skuValue: "295742133469",
    price: "$278.00",
    availability: "Varies",
    matchType: "Manual Match",
    confidence: "Medium",
    lastChecked: "1 h ago",
    status: "Active",
    actions: ["View", "Edit"],
  },
  {
    retailer: "Newegg",
    title: "Sony WH-1000XM5 ANC Headphones",
    skuType: "Item",
    skuValue: "N82E16826123456",
    price: "$309.99",
    availability: "In Stock",
    matchType: "Brand + Model",
    confidence: "High",
    lastChecked: "2 h ago",
    status: "Active",
    actions: ["View"],
  },
];

// ─── Retailer Logos ───────────────────────────────────────────────────────────

const RetailerLogo = ({ name }: { name: string }) => {
  switch (name) {
    case "Amazon":
      return (
        <div className="w-6 h-6 rounded bg-[#1a1a1a] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="52" fontWeight="900" fill="white" fontFamily="Arial">a</text>
            <path d="M18 72 Q50 84 82 72" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M76 68 L82 72 L76 76" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "Best Buy":
      return (
        <div className="w-6 h-6 rounded bg-[#FFF200] flex flex-col items-center justify-center shrink-0 shadow-sm">
          <span className="text-[5px] font-black text-black leading-none tracking-tighter text-center">BEST<br />BUY</span>
        </div>
      );
    case "Walmart":
      return (
        <div className="w-6 h-6 rounded bg-[#0071CE] flex items-center justify-center shrink-0 shadow-sm">
          <svg viewBox="0 0 36 36" className="w-3.5 h-3.5" fill="#FFC220" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2 L19.5 11 L21 2 L18 2Z M18 34 L19.5 25 L21 34 L18 34Z M2 18 L11 16.5 L2 15 L2 18Z M34 18 L25 16.5 L34 15 L34 18Z M6.5 6.5 L13 13 L14 11 L7.5 4.5 L6.5 6.5Z M29.5 29.5 L23 23 L22 25 L28.5 31.5 L29.5 29.5Z M29.5 6.5 L28.5 4.5 L22 11 L23 13 L29.5 6.5Z M6.5 29.5 L7.5 31.5 L14 25 L13 23 L6.5 29.5Z" />
          </svg>
        </div>
      );
    case "Target":
      return (
        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#CC0000" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#CC0000" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="#CC0000" strokeWidth="2.5" />
            <circle cx="12" cy="12" r="2" fill="#CC0000" />
          </svg>
        </div>
      );
    case "eBay":
      return (
        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm px-[1px]">
          <span className="flex text-[10px] font-extrabold tracking-tighter leading-none">
            <span className="text-[#E53238]">e</span>
            <span className="text-[#0064D2]">b</span>
            <span className="text-[#F5AF02]">a</span>
            <span className="text-[#86B817]">y</span>
          </span>
        </div>
      );
    case "Newegg":
      return (
        <div className="w-6 h-6 rounded bg-[#002B5C] flex items-center justify-center shrink-0 shadow-sm px-[2px]">
          <span className="text-[5px] font-black text-[#FF6600] leading-none tracking-tight">newegg</span>
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0">
          {name.charAt(0)}
        </div>
      );
  }
};

// ─── Badge Components ─────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toLowerCase();
  if (s === "active") return (
    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-[1px] rounded-full border border-emerald-200 text-[10px] whitespace-nowrap shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      {status}
    </span>
  );
  if (s === "high") return (
    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-[1px] rounded border border-emerald-200 text-[10px] shadow-sm">
      {status}
    </span>
  );
  if (s === "review" || s === "medium") return (
    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-[1px] rounded border border-blue-200 text-[10px] shadow-sm">
      {status}
    </span>
  );
  if (s === "needs review") return (
    <span className="font-semibold text-orange-700 bg-orange-50 px-2 py-[1px] rounded border border-orange-200 text-[10px] whitespace-nowrap shadow-sm">
      Needs Review
    </span>
  );
  if (s === "wait") return (
    <span className="font-semibold text-orange-700 bg-orange-50 px-2 py-[1px] rounded border border-orange-200 text-[10px] shadow-sm">
      {status}
    </span>
  );
  if (s === "low") return (
    <span className="font-semibold text-red-700 bg-red-50 px-2 py-[1px] rounded border border-red-200 text-[10px] shadow-sm">
      {status}
    </span>
  );
  return (
    <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-[1px] rounded border border-slate-200 text-[10px] shadow-sm">
      {status}
    </span>
  );
};

const MatchTypeBadge = ({ type }: { type: string }) => {
  if (type === "Exact ASIN" || type === "Brand + Model")
    return <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm hover:bg-emerald-100 transition-colors text-[10px] font-medium rounded px-2 py-[1px] leading-tight">{type}</Badge>;
  if (type === "Semantic Match")
    return <Badge className="bg-blue-50 text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-100 transition-colors text-[10px] font-medium rounded px-2 py-[1px] leading-tight">{type}</Badge>;
  if (type === "Low Confidence")
    return <Badge className="bg-red-50 text-red-700 border border-red-200 shadow-sm hover:bg-red-100 transition-colors text-[10px] font-medium rounded px-2 py-[1px] leading-tight">{type}</Badge>;
  if (type === "Manual Match")
    return <Badge className="bg-purple-50 text-purple-700 border border-purple-200 shadow-sm hover:bg-purple-100 transition-colors text-[10px] font-medium rounded px-2 py-[1px] leading-tight">{type}</Badge>;
  return <Badge className="bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-100 transition-colors text-[10px] font-medium rounded px-2 py-[1px] leading-tight">{type}</Badge>;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductMapping() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-3 shrink-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
          <Link href="/dashboard" className="hover:text-slate-800 transition-colors font-medium">Admin</Link>
          <span className="text-slate-300">/</span>
          <Link href="/dashboard/products" className="hover:text-slate-800 transition-colors font-medium">Products</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-700 cursor-pointer hover:text-slate-900 transition-colors font-medium">Sony WH-1000XM5</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">Mappings</span>
        </nav>

        {/* Title row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">Product Mapping</h1>
            <p className="text-[13px] text-slate-500 mt-1.5">
              Review retailer mappings, match confidence, and canonical product relationships.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 h-9 px-4 text-xs font-semibold transition-all">
              <Plus className="w-3.5 h-3.5" />
              Add Manual Mapping
            </Button>
            <Button variant="outline" className="h-9 px-3.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm bg-white hover:bg-slate-50 transition-all text-slate-700">
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              Refresh Mappings
            </Button>
            <Button variant="outline" className="h-9 px-3.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm bg-white hover:bg-slate-50 transition-all text-slate-700">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              View Mapping Rules
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      {/* Tighter padding and gap to ensure it fits the viewport without scrolling */}
      <div className="px-6 pb-6 flex flex-col gap-4 flex-1 min-h-0 overflow-hidden">
        {/* ── Product Header Card ─────────────────────────────────────────── */}
        <Card className="rounded-xl border-slate-200 shadow-sm p-6 bg-white flex shrink-0 gap-8 items-stretch">
          {/* Product image */}
          <div className="w-[140px] h-[140px] rounded-xl border border-slate-100 bg-white flex items-center justify-center shrink-0 overflow-hidden p-2 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&q=80"
              alt="Sony WH-1000XM5"
              className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
            />
          </div>

          {/* Product meta */}
          <div className="flex-1 flex flex-col justify-center min-w-0 pr-4">
            <h2 className="text-[19px] font-bold text-slate-900 mb-6 tracking-tight leading-none">
              Sony WH-1000XM5 Wireless Headphones
            </h2>

            {/* Brand / Model / Category row */}
            <div className="flex items-center gap-8 mb-6">
              <div className="flex flex-col gap-1.5">
                <div className="text-[11px] text-slate-500 font-medium">Brand</div>
                <div className="text-[13px] font-bold text-slate-900 leading-none">Sony</div>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex flex-col gap-1.5">
                <div className="text-[11px] text-slate-500 font-medium">Model</div>
                <div className="text-[13px] font-bold text-slate-900 leading-none">WH-1000XM5</div>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div className="flex flex-col gap-1.5">
                <div className="text-[11px] text-slate-500 font-medium">Category</div>
                <div className="text-[13px] font-bold text-slate-900 leading-none">Electronics &gt; Headphones</div>
              </div>
            </div>

            {/* Canonical ID */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium">Canonical Product ID</span>
              <div className="flex items-center gap-2 cursor-pointer group w-fit">
                <span className="text-[13px] font-bold text-slate-900 tracking-wide">PRD-001482</span>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* ── Right info block — exact match to screenshot ── */}
          <div className="flex flex-col w-[440px] shrink-0 justify-center">
            {/* Top row */}
            <div className="flex border-b border-slate-200 pb-4 mb-4">
              {/* Status */}
              <div className="flex-[0.8] flex flex-col justify-start border-r border-slate-200 pr-4">
                <span className="text-[11px] text-slate-500 font-medium mb-2">Status</span>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
              {/* AI Verdict */}
              <div className="flex-1 flex flex-col justify-start border-r border-slate-200 px-4">
                <span className="text-[11px] text-slate-500 font-medium mb-2">AI Verdict</span>
                <div>
                  <span className="inline-flex text-[11px] font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-4 py-0.5 rounded-md shadow-sm">
                    Wait
                  </span>
                </div>
              </div>
              {/* AI Buy Score */}
              <div className="flex-1 flex flex-col justify-start pl-4">
                <span className="text-[11px] text-slate-500 font-medium mb-1.5">AI Buy Score</span>
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="text-[28px] font-bold text-orange-500 leading-none tracking-tighter">76</span>
                  <span className="text-[13px] font-bold text-slate-500 ml-0.5">/100</span>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center">
              {/* Confidence Score */}
              <div className="flex-[0.8] flex flex-col justify-start pr-4">
                <span className="text-[11px] text-slate-500 font-medium mb-2">Confidence Score</span>
                <div>
                  <span className="inline-flex text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shadow-sm">
                    High
                  </span>
                </div>
              </div>
              {/* Retailer listings */}
              <div className="flex-[2] flex flex-col justify-start items-end pl-4">
                <div className="text-[11px] font-bold text-slate-700 leading-tight">
                  4 mapped retailer listings <span className="text-slate-400 ml-0.5">•</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500 font-medium">
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  last refreshed 12 min ago
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Two-column layout: table + sidebar ─────────────────────────── */}
        <div className="flex gap-4 items-stretch flex-1 min-h-0">
          {/* ── Retailer Mappings Table ──────────────────────────────────── */}
          <Card className="flex flex-col flex-1 min-w-0 min-h-0 bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-4 py-3 border-b border-slate-200 bg-white shrink-0">
              <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Retailer Mappings</h2>
            </div>

            {/* Toolbar */}
            <div className="px-4 py-2 border-b border-slate-200 flex items-center gap-2.5 bg-slate-50/50 shrink-0">
              {/* Search input */}
              <div className="relative flex-1 max-w-[280px]">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search retailer title, SKU, ASIN, or item ID..."
                  className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-slate-200 rounded-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"
                />
              </div>

              {/* Filter dropdowns */}
              <div className="flex items-center gap-1.5 ml-auto">
                {["Retailer", "Match Type", "Confidence", "Status"].map((f) => (
                  <button
                    key={f}
                    className="h-8 px-2.5 text-[11px] font-bold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {f}
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
                <button className="h-8 px-2 text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 hover:bg-slate-100 rounded-md transition-colors ml-1">
                  <X className="w-3.5 h-3.5" />
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-slate-50 z-10 shadow-sm">
                  <TableRow className="border-b border-slate-200 hover:bg-slate-50">
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
                        className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap py-2 px-4 h-auto ${
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
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      {/* Retailer */}
                      <TableCell className="py-3 px-4 whitespace-nowrap h-auto">
                        <div className="flex items-center gap-2.5">
                          <RetailerLogo name={m.retailer} />
                          <span className="text-[12px] font-bold text-slate-900">{m.retailer}</span>
                        </div>
                      </TableCell>

                      {/* Title */}
                      <TableCell className="py-3 px-4 h-auto min-w-[200px] max-w-[240px]">
                        <p className="text-[12px] text-slate-700 font-medium whitespace-normal break-words leading-relaxed">
                          {m.title}
                        </p>
                      </TableCell>

                      {/* SKU */}
                      <TableCell className="py-3 px-4 whitespace-nowrap h-auto">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[12px] font-bold text-slate-800 leading-tight">{m.skuType}</span>
                          <span className="text-[12px] text-slate-600 font-medium leading-tight">{m.skuValue}</span>
                        </div>
                      </TableCell>

                      {/* Price */}
                      <TableCell className="py-3 px-4 whitespace-nowrap h-auto">
                        <span className="text-[12px] font-bold text-slate-900">{m.price}</span>
                      </TableCell>

                      {/* Availability */}
                      <TableCell className="py-3 px-4 whitespace-nowrap h-auto">
                        <span
                          className={`text-[12px] font-bold ${
                            m.availability === "In Stock"
                              ? "text-emerald-600"
                              : m.availability === "Limited Stock"
                              ? "text-orange-500"
                              : "text-blue-600"
                          }`}
                        >
                          {m.availability}
                        </span>
                      </TableCell>

                      {/* Match Type */}
                      <TableCell className="py-3 px-4 whitespace-nowrap h-auto">
                        <MatchTypeBadge type={m.matchType} />
                      </TableCell>

                      {/* Match Confidence */}
                      <TableCell className="py-3 px-4 text-center whitespace-nowrap h-auto">
                        <StatusBadge status={m.confidence} />
                      </TableCell>

                      {/* Last Checked */}
                      <TableCell className="py-3 px-4 whitespace-nowrap text-center h-auto">
                        <span className="text-[11px] text-slate-600 font-medium">{m.lastChecked}</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3 px-4 text-center whitespace-nowrap h-auto">
                        <StatusBadge status={m.status} />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3 px-4 text-right whitespace-nowrap h-auto">
                        <div className="flex items-center justify-end gap-2">
                          {m.actions.map((action) => {
                            if (action === "Mark Correct") {
                              return (
                                <Button
                                  key={action}
                                  variant="outline"
                                  className="h-7 px-3 text-[11px] font-bold text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm rounded-md"
                                >
                                  {action}
                                </Button>
                              );
                            }
                            return (
                              <Button
                                key={action}
                                variant="outline"
                                className="h-7 px-2.5 text-[11px] font-bold text-blue-600 border-slate-200 hover:bg-slate-50 transition-colors shadow-sm rounded-md bg-white"
                              >
                                {action}
                              </Button>
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
            <div className="px-4 py-2.5 border-t border-slate-200 bg-white flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 font-medium">Showing 1–6 of 12 mappings</span>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-xs shadow-sm hover:bg-slate-50" disabled>
                  &lt;
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-xs bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 font-bold shadow-sm">
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-xs font-bold shadow-sm hover:bg-slate-50">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-7 h-7 p-0 text-xs shadow-sm hover:bg-slate-50">
                  &gt;
                </Button>
                <div className="ml-2 flex items-center gap-1.5 border border-slate-200 rounded-md px-2 py-1 bg-white text-xs text-slate-600 cursor-pointer hover:bg-slate-50 font-bold shadow-sm transition-colors">
                  10 / page <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-400" />
                </div>
              </div>
            </div>
          </Card>

          {/* ── Right Sidebar ─────────────────────────────────────────────── */}
          <div className="w-[300px] shrink-0 flex flex-col gap-4 overflow-y-auto min-h-0 pr-1">
            {/* Match Confidence Summary */}
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">Match Confidence Summary</span>
                <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Text list */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {[
                      { label: "Exact identifier matches", val: "2", color: "text-emerald-600" },
                      { label: "Brand + model matches", val: "2", color: "text-emerald-600" },
                      { label: "Manual matches", val: "1", color: "text-blue-600" },
                      { label: "Needs review", val: "1", color: "text-orange-500" },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium leading-tight">{r.label}</span>
                        <span className={`font-bold ${r.color} ml-1`}>{r.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Donut chart */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16">
                      {mounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={donutData}
                              innerRadius={20}
                              outerRadius={32}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              startAngle={90}
                              endAngle={-270}
                              animationBegin={0}
                              animationDuration={1500}
                            >
                              {donutData.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', padding: '4px 8px' }}
                              itemStyle={{ fontSize: '11px', fontWeight: 600 }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="w-full h-full bg-slate-100 rounded-full animate-pulse border-4 border-white shadow-inner" />
                      )}
                    </div>
                    {/* Legend */}
                    <div className="flex flex-col gap-1 mt-2.5 w-full">
                      {donutData.map((d) => (
                        <div key={d.name} className="flex items-center gap-1.5 text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                          <span className="text-slate-600 font-bold">{d.name}</span>
                          <span className="text-slate-400 font-bold ml-auto">{d.value} ({Math.round((d.value / 6) * 100)}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Duplicate Warning */}
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
              <div className="px-4 py-3 bg-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="text-[13px] font-bold text-slate-900 tracking-tight">Duplicate Warning</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">2 potentially related canonical products found.</p>
              </div>
              <div className="px-4 pb-4 space-y-2.5">
                {/* Dupe items */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50 shadow-sm">
                  <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200">
                    <span className="text-[11px] font-bold text-slate-800 truncate mr-2">Sony WH-1000XM5 (Silver)</span>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[10px] text-slate-500 font-bold">
                        Similarity <span className="text-slate-800 ml-0.5">82%</span>
                      </span>
                      <button className="text-[10px] font-bold text-blue-600 border border-blue-200 bg-white rounded px-2 py-0.5 hover:bg-blue-50 transition-colors shadow-sm">
                        Review
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5">
                    <span className="text-[11px] font-bold text-slate-800 truncate mr-2">Sony WH-1000XM4</span>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[10px] text-slate-500 font-bold">
                        Similarity <span className="text-slate-800 ml-0.5">64%</span>
                      </span>
                      <button className="text-[10px] font-bold text-blue-600 border border-blue-200 bg-white rounded px-2 py-0.5 hover:bg-blue-50 transition-colors shadow-sm">
                        Compare
                      </button>
                    </div>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all h-8">
                    Merge Review
                  </Button>
                  <Button variant="outline" className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-all h-8">
                    Keep Separate
                  </Button>
                </div>
              </div>
            </Card>

            {/* Manual Mapping Tools */}
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
              <div className="px-4 py-3 border-b border-slate-200 bg-white">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">Manual Mapping Tools</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-x-3 gap-y-3">
                {[
                  { icon: Search, label: "Search retailer listing" },
                  { icon: Plus, label: "Create manual mapping" },
                  { icon: LinkIcon, label: "Link by ASIN/SKU" },
                  { icon: Upload, label: "Import mapping CSV" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center gap-2 text-left text-blue-600 hover:text-blue-800 group transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover:opacity-100" />
                    <span className="text-[11px] font-bold leading-tight group-hover:underline underline-offset-2">{label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Mapping Activity */}
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
              <div className="px-4 py-3 border-b border-slate-200 bg-white">
                <span className="text-[13px] font-bold text-slate-900 tracking-tight">Mapping Activity</span>
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
                    iconBg: "bg-orange-50",
                    iconBorder: "border-orange-200",
                    iconColor: "text-orange-500",
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
                    <div className={`w-6 h-6 rounded-full ${iconBg} border ${iconBorder} flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className={`w-3 h-3 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-slate-700 font-bold leading-snug">{text}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold shrink-0 whitespace-nowrap pt-0.5">{time}</span>
                  </div>
                ))}

                <div className="pt-1 flex justify-center">
                  <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                    <span className="group-hover:underline underline-offset-2">View all activity</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
