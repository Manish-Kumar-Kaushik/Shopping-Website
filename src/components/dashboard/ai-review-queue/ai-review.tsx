"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Settings,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  asin: string;
  sku: string;
  category: string;
  verdict: "Wait" | "Buy" | "Avoid" | "Better Alternative";
  score: number;
  confidence: "High" | "Medium" | "Low";
  queueType: "AI Verdict" | "Human Approval" | "Re-Review" | "Escalated";
  priority: "Low" | "Medium" | "High";
  reason: string;
  assignedTo: {
    name: string;
    initials: string;
    avatarColor: string;
  };
  timeInQueue: string;
}

const initialProducts: ProductItem[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&q=80",
    asin: "B09XS7JWHH",
    sku: "SONY-WH1000XM5-BLK",
    category: "Electronics > Headphones",
    verdict: "Wait",
    score: 76,
    confidence: "High",
    queueType: "AI Verdict",
    priority: "Medium",
    reason: "Low price trend confidence",
    assignedTo: {
      name: "John Smith",
      initials: "JS",
      avatarColor: "bg-blue-600",
    },
    timeInQueue: "2h 15m",
  },
  {
    id: "2",
    name: "Orgain Organic Protein",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=100&q=80",
    asin: "B07N2ZJXRD",
    sku: "ORGAIN-PROTEIN-2LB",
    category: "Health > Supplements",
    verdict: "Buy",
    score: 88,
    confidence: "High",
    queueType: "Human Approval",
    priority: "High",
    reason: "New product",
    assignedTo: {
      name: "Emma Davis",
      initials: "EM",
      avatarColor: "bg-indigo-600",
    },
    timeInQueue: "1h 45m",
  },
  {
    id: "3",
    name: "Ninja Air Fryer AF101",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=100&q=80",
    asin: "B07FDJMC91",
    sku: "NINJA-AF101",
    category: "Home & Kitchen > Small Appliances",
    verdict: "Buy",
    score: 82,
    confidence: "Medium",
    queueType: "Re-Review",
    priority: "Medium",
    reason: "Conflicting pros & cons",
    assignedTo: {
      name: "Mike Wilson",
      initials: "MW",
      avatarColor: "bg-violet-600",
    },
    timeInQueue: "5h 30m",
  },
  {
    id: "4",
    name: "CeraVe Hydrating Cleanser",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&q=80",
    asin: "B01N1LL0PR",
    sku: "CERAVE-HC-12OZ",
    category: "Beauty > Skincare",
    verdict: "Avoid",
    score: 42,
    confidence: "High",
    queueType: "AI Verdict",
    priority: "High",
    reason: "Safety concerns detected",
    assignedTo: {
      name: "Lisa Patel",
      initials: "LP",
      avatarColor: "bg-cyan-600",
    },
    timeInQueue: "3h 10m",
  },
  {
    id: "5",
    name: "Apple MacBook Air M2",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
    asin: "B0B3CMLZJN",
    sku: "APPLE-MBA-M2-13",
    category: "Electronics > Laptops",
    verdict: "Better Alternative",
    score: 65,
    confidence: "Medium",
    queueType: "Human Approval",
    priority: "Medium",
    reason: "Better alternatives found",
    assignedTo: {
      name: "Tom Clark",
      initials: "TC",
      avatarColor: "bg-blue-700",
    },
    timeInQueue: "6h 5m",
  },
  {
    id: "6",
    name: "Keurig K-Elite Coffee Maker",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?w=100&q=80",
    asin: "B07JYZC12M",
    sku: "KEURIG-KELITE",
    category: "Home & Kitchen > Coffee Makers",
    verdict: "Wait",
    score: 71,
    confidence: "Low",
    queueType: "Re-Review",
    priority: "Low",
    reason: "Not enough reviews",
    assignedTo: {
      name: "John Smith",
      initials: "JS",
      avatarColor: "bg-blue-600",
    },
    timeInQueue: "8h 20m",
  },
];

export default function AIReviewQueue() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(initialProducts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const getVerdictStyle = (verdict: ProductItem["verdict"]) => {
    switch (verdict) {
      case "Buy":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Wait":
        return "bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Avoid":
        return "bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Better Alternative":
        return "bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
    }
  };

  const getConfidenceStyle = (confidence: ProductItem["confidence"]) => {
    switch (confidence) {
      case "High":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Medium":
        return "bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Low":
        return "bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
    }
  };

  const getQueueTypeStyle = (type: ProductItem["queueType"]) => {
    switch (type) {
      case "AI Verdict":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Human Approval":
        return "bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Re-Review":
        return "bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Escalated":
        return "bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
    }
  };

  const getPriorityStyle = (priority: ProductItem["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Medium":
        return "bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
      case "Low":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-md text-xs font-semibold";
    }
  };

  const getScoreCircleStyle = (score: number) => {
    if (score >= 80) return "border-emerald-200 text-emerald-600";
    if (score >= 70) return "border-orange-200 text-orange-600";
    if (score >= 50) return "border-blue-200 text-blue-600";
    return "border-rose-200 text-rose-600";
  };

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <main className="flex flex-col gap-6 p-6">
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 text-xs text-slate-500 font-semibold tracking-wide flex items-center gap-1.5">
              <span>AI Review Queue</span>
              <span className="text-slate-300">/</span>
              <span>Queue List</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">AI Review Queue</h1>
              <span className="bg-indigo-100 text-indigo-700 rounded-md px-2 py-0.5 text-xs font-bold shrink-0">128</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Review and approve AI verdicts, scores, and summaries before they go live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors">
              <Settings className="h-4 w-4 text-slate-500" /> Queue Settings
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors">
              <RefreshCw className="h-4 w-4" /> Refresh Queue
            </button>
          </div>
        </div>

        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total in Queue</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">128</div>
              <p className="mt-2 text-[11px] font-bold text-emerald-600">↑ 18 from yesterday</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 ring-1 ring-orange-100">
              <Bot className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending AI Verdict</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">54</div>
              <p className="mt-2 text-[11px] font-bold text-orange-500">42.2% of queue</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending Human Approval</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">47</div>
              <p className="mt-2 text-[11px] font-bold text-blue-600">36.7% of queue</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 ring-1 ring-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Re-Review Needed</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">19</div>
              <p className="mt-2 text-[11px] font-bold text-rose-600">14.8% of queue</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Approved Today</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">86</div>
              <p className="mt-2 text-[11px] font-bold text-emerald-600">↑ 12.4% vs yesterday</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-indigo-100">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Avg. Queue Time</p>
              <div className="mt-1.5 text-2xl font-extrabold leading-none text-slate-950">4h 32m</div>
              <p className="mt-2 text-[11px] font-bold text-emerald-600">↓ 18m vs yesterday</p>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT CONTAINER */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          
          {/* A. Filters Row */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-end">
            {/* Search */}
            <div className="flex-1 min-w-[280px] flex flex-col gap-1.5">
              <label htmlFor="search-input" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search by product name, brand, ASIN, SKU..."
                  className="w-full h-10 rounded-lg border border-slate-200 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Queue Type */}
            <div className="w-[140px] flex flex-col gap-1.5">
              <label htmlFor="queue-type-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Queue Type</label>
              <div className="relative">
                <select
                  id="queue-type-select"
                  className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>All</option>
                  <option>AI Verdict</option>
                  <option>Human Approval</option>
                  <option>Re-Review</option>
                  <option>Escalated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* AI Verdict */}
            <div className="w-[140px] flex flex-col gap-1.5">
              <label htmlFor="ai-verdict-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Verdict</label>
              <div className="relative">
                <select
                  id="ai-verdict-select"
                  className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>All</option>
                  <option>Buy</option>
                  <option>Wait</option>
                  <option>Avoid</option>
                  <option>Better Alternative</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* AI Buy Score */}
            <div className="w-[140px] flex flex-col gap-1.5">
              <label htmlFor="ai-buy-score-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Buy Score</label>
              <div className="relative">
                <select
                  id="ai-buy-score-select"
                  className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>All</option>
                  <option>80+</option>
                  <option>70-79</option>
                  <option>50-69</option>
                  <option>&lt; 50</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Priority */}
            <div className="w-[140px] flex flex-col gap-1.5">
              <label htmlFor="priority-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</label>
              <div className="relative">
                <select
                  id="priority-select"
                  className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Assigned To */}
            <div className="w-[140px] flex flex-col gap-1.5">
              <label htmlFor="assigned-to-select" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned To</label>
              <div className="relative">
                <select
                  id="assigned-to-select"
                  className="w-full h-10 appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>All</option>
                  <option>John Smith</option>
                  <option>Emma Davis</option>
                  <option>Mike Wilson</option>
                  <option>Lisa Patel</option>
                  <option>Tom Clark</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Add Filter */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-none">More Filters</span>
              <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <Plus className="h-4 w-4 text-slate-500" /> Add Filter
              </button>
            </div>
          </div>

          {/* B. Tabs Row */}
          <div className="px-4 pt-4 border-b border-slate-200 flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
            {[
              { id: "all", name: "All Items", count: 128 },
              { id: "verdict", name: "AI Verdict", count: 54 },
              { id: "human", name: "Human Approval", count: 47 },
              { id: "review", name: "Re-Review", count: 19 },
              { id: "escalated", name: "Escalated", count: 8 },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-semibold transition-colors border-b-2 relative ${
                    active
                      ? "text-indigo-600 border-indigo-600 font-bold"
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              );
            })}
          </div>

          {/* C. Table Controls Row */}
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200">
            <span className="text-sm font-semibold text-slate-500">
              Showing 1 to 20 of 128 results
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-colors">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Columns <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              
              <div className="relative">
                <select
                  aria-label="Rows per page"
                  className="appearance-none h-9 rounded-lg border border-slate-200 bg-white pl-3 pr-8 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-600"
                >
                  <option>20 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Pagination */}
              <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                <button className="flex h-9 w-9 items-center justify-center border-r border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors" aria-label="Previous page">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center bg-indigo-600 text-sm font-bold text-white">1</button>
                <button className="flex h-9 w-9 items-center justify-center border-l border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">2</button>
                <button className="flex h-9 w-9 items-center justify-center border-l border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">3</button>
                <span className="flex h-9 w-8 items-center justify-center border-l border-slate-200 text-xs font-semibold text-slate-400 bg-slate-50/50">...</span>
                <button className="flex h-9 w-9 items-center justify-center border-l border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">7</button>
                <button className="flex h-9 w-9 items-center justify-center border-l border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors" aria-label="Next page">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* D. DATA TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 w-12 text-center">
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedIds.length === initialProducts.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Product</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Category</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">AI Verdict</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">AI Buy Score</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Confidence</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Queue Type</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Priority</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Reason</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">Assigned To</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">In Queue For</th>
                  <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialProducts.map((row) => {
                  const isChecked = selectedIds.includes(row.id);
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                        isChecked ? "bg-indigo-50/10" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-4 text-center">
                        <input
                          type="checkbox"
                          aria-label={`Select ${row.name}`}
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        />
                      </td>

                      {/* Product details */}
                      <td className="px-4 py-4 min-w-[240px]">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md border border-slate-200 overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-sm">
                            <img
                              src={row.image}
                              alt={row.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[13px] font-bold text-slate-900 leading-snug truncate">{row.name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              ASIN: {row.asin} &bull; SKU: {row.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 text-[13px] font-semibold text-slate-700 whitespace-nowrap">
                        {row.category}
                      </td>

                      {/* AI Verdict */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={getVerdictStyle(row.verdict)}>{row.verdict}</span>
                      </td>

                      {/* AI Buy Score */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <div className="flex justify-center">
                          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs ${getScoreCircleStyle(row.score)}`}>
                            {row.score}
                          </div>
                        </div>
                      </td>

                      {/* Confidence */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={getConfidenceStyle(row.confidence)}>{row.confidence}</span>
                      </td>

                      {/* Queue Type */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={getQueueTypeStyle(row.queueType)}>{row.queueType}</span>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={getPriorityStyle(row.priority)}>{row.priority}</span>
                      </td>

                      {/* Reason */}
                      <td className="px-4 py-4 text-[13px] font-semibold text-slate-600 max-w-[220px] truncate">
                        {row.reason}
                      </td>

                      {/* Assigned To */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-sm shrink-0 ${row.assignedTo.avatarColor}`}>
                            {row.assignedTo.initials}
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700">{row.assignedTo.name}</span>
                        </div>
                      </td>

                      {/* In Queue For */}
                      <td className="px-4 py-4 text-[13px] font-semibold text-slate-600 whitespace-nowrap">
                        {row.timeInQueue}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors" aria-label="View Details">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-slate-450 hover:text-slate-800 p-1 rounded hover:bg-slate-100 transition-colors" aria-label="More Options">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* E. Bottom Footer Bar */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                id="select-all-bottom"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={selectedIds.length === initialProducts.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <label htmlFor="select-all-bottom" className="text-sm font-semibold text-slate-700 select-none">
                Select all items on this page
              </label>
            </div>

            <span className="text-sm font-semibold text-slate-500">
              128 items in queue
            </span>

            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors self-end sm:self-auto">
              Batch Actions <ChevronDown className="h-4 w-4" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
