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
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Settings,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    category: "Home & Kitchen",
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

  const renderBadge = (text: string, type: "green" | "orange" | "red" | "blue" | "indigo") => {
    const colors = {
      green: "bg-green-100 text-green-700 ring-green-700/10",
      orange: "bg-orange-100 text-orange-700 ring-orange-700/10",
      red: "bg-red-100 text-red-700 ring-red-700/10",
      blue: "bg-blue-100 text-blue-700 ring-blue-700/10",
      indigo: "bg-indigo-100 text-indigo-700 ring-indigo-700/10",
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[type]}`}>
        {text}
      </span>
    );
  };

  const getVerdictBadge = (verdict: ProductItem["verdict"]) => {
    switch (verdict) {
      case "Buy": return renderBadge(verdict, "green");
      case "Wait": return renderBadge(verdict, "orange");
      case "Avoid": return renderBadge(verdict, "red");
      case "Better Alternative": return renderBadge(verdict, "blue");
    }
  };

  const getConfidenceBadge = (confidence: ProductItem["confidence"]) => {
    switch (confidence) {
      case "High": return renderBadge(confidence, "green");
      case "Medium": return renderBadge(confidence, "orange");
      case "Low": return renderBadge(confidence, "red");
    }
  };

  const getQueueTypeBadge = (type: ProductItem["queueType"]) => {
    switch (type) {
      case "AI Verdict": return renderBadge(type, "indigo");
      case "Human Approval": return renderBadge(type, "blue");
      case "Re-Review": return renderBadge(type, "red");
      case "Escalated": return renderBadge(type, "orange");
    }
  };

  const getPriorityBadge = (priority: ProductItem["priority"]) => {
    switch (priority) {
      case "High": return renderBadge(priority, "red");
      case "Medium": return renderBadge(priority, "orange");
      case "Low": return renderBadge(priority, "green");
    }
  };

  const getScoreCircleStyle = (score: number) => {
    if (score >= 80) return "border-green-200 text-green-600";
    if (score >= 70) return "border-orange-200 text-orange-600";
    if (score >= 50) return "border-blue-200 text-blue-600";
    return "border-red-200 text-red-600";
  };

  return (
    <div className="flex min-h-full flex-col bg-slate-50 font-sans">
      <main className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 text-sm text-slate-500 font-medium flex items-center gap-1.5">
              <span>AI Review Queue</span>
              <span className="text-slate-300">&gt;</span>
              <span className="text-slate-700">Queue List</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">AI Review Queue</h1>
              <span className="bg-indigo-100 text-indigo-700 rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset ring-indigo-700/10">128</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Review and approve AI verdicts, scores, and summaries before they go live.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              <Settings className="h-4 w-4 text-slate-500" /> Queue Settings
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors">
              <RefreshCw className="h-4 w-4" /> Refresh Queue
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-inset ring-indigo-100">
              <ClipboardList className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total in Queue</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">128</div>
              <p className="mt-1 text-xs font-medium text-green-600">↑ 18 from yesterday</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 ring-1 ring-inset ring-orange-100">
              <Bot className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pending AI Verdict</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">54</div>
              <p className="mt-1 text-xs font-medium text-orange-600">42.2% of queue</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-inset ring-blue-100">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pending Human Approval</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">47</div>
              <p className="mt-1 text-xs font-medium text-blue-600">36.7% of queue</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 ring-1 ring-inset ring-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Re-Review Needed</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">19</div>
              <p className="mt-1 text-xs font-medium text-red-600">14.8% of queue</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 ring-1 ring-inset ring-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Approved Today</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">86</div>
              <p className="mt-1 text-xs font-medium text-green-600">↑ 12.4% vs yesterday</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 ring-1 ring-inset ring-indigo-100">
              <Clock className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Avg. Queue Time</p>
              <div className="mt-1 text-2xl font-bold text-slate-900">4h 32m</div>
              <p className="mt-1 text-xs font-medium text-green-600">↓ 18m vs yesterday</p>
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col relative">
          
          {/* Filters Row */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[280px] flex flex-col gap-1.5">
              <label htmlFor="search-input" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search by product name, brand, ASIN, SKU..."
                  className="w-full h-9 rounded-md border border-slate-200 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Queue Type</label>
              <div className="relative">
                <select className="w-full h-9 appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>All</option>
                  <option>AI Verdict</option>
                  <option>Human Approval</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">AI Verdict</label>
              <div className="relative">
                <select className="w-full h-9 appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>All</option>
                  <option>Buy</option>
                  <option>Wait</option>
                  <option>Avoid</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">AI Buy Score</label>
              <div className="relative">
                <select className="w-full h-9 appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>All</option>
                  <option>80+</option>
                  <option>70-79</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Priority</label>
              <div className="relative">
                <select className="w-full h-9 appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="w-[140px] flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Assigned To</label>
              <div className="relative">
                <select className="w-full h-9 appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>All</option>
                  <option>John Smith</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider opacity-0">Action</span>
              <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <Plus className="h-4 w-4 text-slate-500" /> Filter
              </button>
            </div>
          </div>

          {/* Tabs Row */}
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
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 relative ${
                    active
                      ? "text-indigo-600 border-indigo-600 font-semibold"
                      : "text-slate-500 border-transparent hover:text-slate-800"
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              );
            })}
          </div>

          {/* Table Controls */}
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 bg-white">
            <span className="text-sm font-medium text-slate-500">
              Showing 1 to 5 of 128 results
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" /> Columns <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              
              <div className="relative">
                <select className="appearance-none h-8 rounded-md border border-slate-200 bg-white pl-3 pr-8 text-xs font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>20 per page</option>
                  <option>50 per page</option>
                  <option>100 per page</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Pagination */}
              <div className="flex items-center border border-slate-200 rounded-md bg-white overflow-hidden shadow-sm h-8">
                <button className="flex h-8 w-8 items-center justify-center border-r border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center bg-indigo-600 text-xs font-semibold text-white">1</button>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">2</button>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">3</button>
                <span className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-xs font-medium text-slate-400 bg-slate-50/50">...</span>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">7</button>
                <button className="flex h-8 w-8 items-center justify-center border-l border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <Table className="w-full whitespace-nowrap">
              <TableHeader className="bg-slate-50">
                <TableRow className="border-b border-slate-200 hover:bg-slate-50">
                  <TableHead className="w-12 text-center py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedIds.length === initialProducts.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Product</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">AI Verdict</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">AI Buy Score</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Confidence</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Queue Type</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Reason</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned To</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Queue For</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialProducts.map((row) => {
                  const isChecked = selectedIds.includes(row.id);
                  return (
                    <TableRow
                      key={row.id}
                      className={`border-b border-slate-100 hover:bg-slate-50/50 transition-colors ${
                        isChecked ? "bg-indigo-50/50" : ""
                      }`}
                    >
                      <TableCell className="text-center py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                        />
                      </TableCell>
                      <TableCell className="py-3 min-w-[240px]">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md border border-slate-200 overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-sm">
                            <img
                              src={row.image}
                              alt={row.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900 leading-snug truncate">{row.name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug font-medium">
                              ASIN: {row.asin} <span className="mx-1">&bull;</span> SKU: {row.sku}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-sm font-medium text-slate-700">
                        {row.category}
                      </TableCell>
                      <TableCell className="py-3">
                        {getVerdictBadge(row.verdict)}
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <div className="flex justify-center">
                          <div className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center font-bold text-xs bg-white shadow-sm ${getScoreCircleStyle(row.score)}`}>
                            {row.score}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        {getConfidenceBadge(row.confidence)}
                      </TableCell>
                      <TableCell className="py-3">
                        {getQueueTypeBadge(row.queueType)}
                      </TableCell>
                      <TableCell className="py-3">
                        {getPriorityBadge(row.priority)}
                      </TableCell>
                      <TableCell className="py-3 text-sm font-medium text-slate-600 max-w-[200px] truncate">
                        {row.reason}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-sm shrink-0 ${row.assignedTo.avatarColor}`}>
                            {row.assignedTo.initials}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{row.assignedTo.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-sm font-medium text-slate-600">
                        {row.timeInQueue}
                      </TableCell>
                      <TableCell className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="text-slate-400 hover:text-indigo-600 p-1.5 rounded hover:bg-indigo-50 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-slate-400 hover:text-slate-800 p-1.5 rounded hover:bg-slate-100 transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                id="select-all-bottom"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                checked={selectedIds.length === initialProducts.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <label htmlFor="select-all-bottom" className="text-sm font-medium text-slate-700 select-none">
                Select all items on this page
              </label>
            </div>

            <span className="text-sm font-medium text-slate-500 hidden sm:block">
              128 items in queue
            </span>

            <button className="inline-flex h-9 items-center gap-2 rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors self-end sm:self-auto">
              Batch Actions <ChevronDown className="h-4 w-4" />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
