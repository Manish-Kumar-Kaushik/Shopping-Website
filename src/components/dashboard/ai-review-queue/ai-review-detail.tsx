"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  HelpCircle,
  Bell,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Copy,
  Info,
  ArrowRight,
  MessageSquare,
  FileText,
  User,
  Tag,
  Clock,
  TrendingUp,
  AlertTriangle,
  PlaySquare,
  BadgeCheck,
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Lock,
  LockOpen
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

const SCORE_DATA = [
  { name: "Value for Money", value: 22, color: "#22c55e", max: 30 },
  { name: "Review Quality", value: 18, color: "#06b6d4", max: 25 },
  { name: "Price Trend", value: 14, color: "#f59e0b", max: 20 },
  { name: "Alternatives", value: 12, color: "#ef4444", max: 15 },
  { name: "Risk Factors", value: 6, color: "#8b5cf6", max: 10 },
  { name: "Other Factors", value: 4, color: "#3b82f6", max: 5 },
];

// Empty slice for the remaining out of 100
const REMAINDER_DATA = [
  { name: "Score", value: 76, color: "#f59e0b" },
  { name: "Remaining", value: 24, color: "#f1f5f9" }
];

export default function AiReviewDetail() {
  const [mounted, setMounted] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full bg-slate-50 font-sans overflow-y-auto">
      {/* 
        NOTE: 
        The global Header and Sidebar are assumed to be wrapping this component. 
        We only render the page-specific Top Navigation if it needs a custom breadcrumb, 
        but matching the screenshot, there is a breadcrumb in the top left.
        To avoid duplicating the global header, we just place it in the content area padding.
      */}
      <div className="p-8 max-w-[1600px] mx-auto space-y-6">

        {/* Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[13px] font-medium text-slate-500">
            <Link href="/dashboard/ai-queue" className="hover:text-slate-900 transition-colors">AI Review Queue</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <Link href="/dashboard/ai-queue" className="hover:text-slate-900 transition-colors">Queue List</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1" />
            <span className="text-slate-900">AI Verdict Review</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <button className="flex items-center gap-1.5 text-[13px] font-semibold hover:text-slate-900 transition-colors">
              <HelpCircle className="w-4 h-4" /> Help
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-bold text-slate-950 tracking-tight">AI Verdict Review</h1>
              <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 font-semibold px-2.5 py-0.5 mt-1">
                AI Verdict
              </Badge>
            </div>
            <p className="text-[15px] text-slate-500 mt-1">Review the AI verdict, score, and reasoning before approving.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <User className="w-4 h-4 text-slate-400" />
              Send to Human Approval
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition-colors shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
              Approve Verdict
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-rose-50 border border-rose-200 rounded-lg text-sm font-bold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm">
              <XCircle className="w-4 h-4" />
              Reject Verdict
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div className="flex items-stretch gap-6">

          {/* Main Product & Verdict Card */}
          <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 flex items-stretch gap-8 w-[72%]">

            {/* Left: Product Info */}
            <div className="flex gap-6 w-[55%]">
              <div className="w-[140px] h-[140px] shrink-0 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-2">
                <img
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&q=80"
                  alt="Sony WH-1000XM5"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-slate-900 leading-tight mb-3">
                  Sony WH-1000XM5 Wireless<br />Noise Cancelling Headphones
                </h2>
                <div className="space-y-1.5 text-[13px]">
                  <div className="flex"><span className="w-20 font-semibold text-slate-900">Brand:</span> <span className="text-slate-600">Sony</span></div>
                  <div className="flex"><span className="w-20 font-semibold text-slate-900">Model:</span> <span className="text-slate-600">WH-1000XM5</span></div>
                  <div className="flex"><span className="w-20 font-semibold text-slate-900">Category:</span> <span className="text-slate-600">Electronics {">"} Headphones</span></div>
                </div>
                <div className="mt-4 space-y-1.5 text-[13px]">
                  <div className="flex"><span className="w-20 font-semibold text-slate-900">ASIN:</span> <span className="text-slate-600">B09XS7JWVH</span></div>
                  <div className="flex"><span className="w-20 font-semibold text-slate-900">UPC:</span> <span className="text-slate-600">027242915872</span></div>
                  <div className="flex items-center"><span className="w-20 font-semibold text-slate-900">Canonical ID:</span> <span className="text-slate-600 flex items-center gap-1.5">PROD-8J72K9 <Copy className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-slate-600" /></span></div>
                </div>
              </div>
            </div>

            <div className="w-[1px] bg-slate-200 shrink-0"></div>

            {/* Middle: AI Verdict & Score */}
            <div className="w-[45%] flex flex-col justify-between">
              <div>
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-2">AI Verdict</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-transparent text-sm font-bold px-3 py-1">
                    Wait
                  </Badge>
                  <Info className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="flex items-center gap-8 mt-4">
                <div>
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-2">AI Buy Score</span>
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={REMAINDER_DATA}
                            innerRadius={30}
                            outerRadius={40}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                            startAngle={90}
                            endAngle={-270}
                          >
                            {REMAINDER_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-slate-900 leading-none">76</span>
                      <span className="text-[10px] font-bold text-slate-400">/100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Confidence</span>
                  <div className="flex items-end gap-1 h-6">
                    <span className="text-sm font-bold text-emerald-600 mr-2 leading-none mb-0.5">High</span>
                    {/* Signal bars */}
                    <div className="w-1.5 h-2 bg-emerald-500 rounded-sm"></div>
                    <div className="w-1.5 h-3.5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-1.5 h-5 bg-emerald-500 rounded-sm"></div>
                    <div className="w-1.5 h-6 bg-slate-200 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 mt-4 text-[12px]">
                <div>
                  <span className="font-semibold text-slate-500 block mb-0.5">Last Scored</span>
                  <span className="font-medium text-slate-900">May 18, 2024 10:42 AM</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block mb-0.5">Model Version</span>
                  <span className="font-medium text-slate-900 font-mono text-[11px]">gpt-4.1-score-v2.3.1</span>
                </div>
              </div>
            </div>
          </Card>
          {/* Right: Queue Details */}
          <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 w-[28%] flex flex-col">
            <h3 className="text-[13px] font-bold text-slate-900 mb-3">Queue Details</h3>

            <div className="space-y-2 text-[12px] mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Queue Type</span>
                <span className="font-medium text-slate-900">AI Verdict</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Priority</span>
                <span className="font-medium text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Medium
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">In Queue For</span>
                <span className="font-medium text-slate-900">2h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Queue Position</span>
                <span className="font-medium text-slate-900">12 of 54</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-500">Added At</span>
                <span className="font-medium text-slate-900">May 18, 2024 08:27 AM</span>
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-[13px] font-bold text-slate-900 mb-2">Assigned To</h3>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">JS</div>
                <span className="text-[12px] font-medium text-slate-900">John Smith</span>
                <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 ml-2">Reassign</button>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-[13px] font-bold text-slate-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 text-[11px] font-medium font-sans">Low price trend confidence</Badge>
                <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 text-[11px] font-medium font-sans">Conflicting reviews</Badge>
                <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 text-[11px] font-medium transition-colors">
                  + Add Tag
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-slate-200 pt-2">
          <button className="px-1 py-3 text-[13px] font-bold text-blue-600 border-b-2 border-blue-600">AI Analysis</button>
          <button className="px-1 py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-800">Score Breakdown</button>
          <button className="px-1 py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-800">Key Signals</button>
          <button className="px-1 py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-800">Source Data</button>
          <button className="px-1 py-3 text-[13px] font-semibold text-slate-500 hover:text-slate-800">History</button>
        </div>

        {/* Grid Layout for Main Content */}
        <div className="grid grid-cols-12 gap-6">

          {/* Column 1: Reasoning & Detailed Rationale */}
          <div className="col-span-5 flex flex-col gap-6">

            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">AI Reasoning Summary</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-6">
                The current market price is 18% higher than the 90-day average. Newer model (WH-1000XM6) has been announced with expected release in June 2024. Review sentiment is positive but concerns about call quality persist. Recommend waiting for price drop or next model release.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[12px] font-bold text-slate-900 mb-3">Top Positive Signals</h4>
                  <ul className="space-y-2">
                    {["Excellent sound quality", "Top-tier noise cancellation", "High review volume with positive sentiment", "Strong brand reliability"].map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[12px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-bold text-slate-900 mb-3">Top Negative Signals</h4>
                  <ul className="space-y-2">
                    {["Price above 90-day average", "Newer model expected soon", "Some call quality complaints", "Competitors with similar performance for less"].map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[12px] text-slate-600">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
              <h3 className="text-sm font-bold text-slate-900 mb-3">AI Verdict Rationale (Detailed)</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
                While the Sony WH-1000XM5 is an excellent headphone with strong overall performance, the current pricing does not present enough value compared to the 90-day average and upcoming WH-1000XM6 release. Historical pricing suggests a likely drop in the next 4-6 weeks.
              </p>
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start mb-6">
                View full model reasoning <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="border-t border-slate-200 pt-5 mt-auto">
                <h3 className="text-[13px] font-bold text-slate-900 mb-4">Model Information</h3>
                <div className="grid grid-cols-4 gap-4 text-[12px]">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-500">Model</span>
                    <span className="font-medium text-slate-900">gpt-4.1-score-v2.3.1</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-500">Prompt Template</span>
                    <span className="font-medium text-slate-900">verdict_v3.2</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-500">Temperature</span>
                    <span className="font-medium text-slate-900">0.2</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-500">Top P</span>
                    <span className="font-medium text-slate-900">0.3</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="font-semibold text-slate-500">Max Tokens</span>
                    <span className="font-medium text-slate-900">1024</span>
                  </div>
                </div>
              </div>
            </Card>

          </div>

          {/* Column 2: Score Breakdown & Influences */}
          <div className="col-span-4 flex flex-col gap-6">

            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
              <h3 className="text-sm font-bold text-slate-900 mb-6">Score Breakdown</h3>
              <div className="flex items-center gap-8 mb-6">
                <div className="w-[120px] h-[120px] relative flex items-center justify-center shrink-0">
                  {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={SCORE_DATA}
                          innerRadius={45}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {SCORE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">76</span>
                    <span className="text-[10px] font-bold text-slate-400">/100</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {SCORE_DATA.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-slate-600">{item.name}</span>
                      </div>
                      <span className="text-slate-900">{item.value} / {item.max}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-end mt-auto">
                View full score breakdown <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Card>

            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-slate-900 mb-5">What Influenced This Verdict</h3>
              <div className="flex flex-col gap-4">
                {[
                  { text: "Price is 18% above 90-day average", type: "Negative" },
                  { text: "WH-1000XM6 announcement (May 15, 2024)", type: "Negative" },
                  { text: "87% positive sentiment from 12,450 reviews", type: "Positive" },
                  { text: "Competing products are 15-20% cheaper", type: "Negative" },
                  { text: "High review trust score (85/100)", type: "Positive" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-2">
                      {item.type === "Negative" ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" /> // Using a placeholder icon as requested by general style
                      ) : (
                        <LockOpen className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="text-[12px] text-slate-700 leading-snug font-medium">{item.text}</span>
                    </div>
                    <Badge className={`px-2 py-0 border-transparent text-[10px] font-bold rounded shrink-0 ${item.type === "Negative" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                      {item.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 mt-auto pt-4">
                View key signals <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Card>

          </div>

          {/* Column 3: Source Data Summary */}
          <div className="col-span-3 flex flex-col gap-6">

            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-6 flex flex-col h-full">
              <h3 className="text-sm font-bold text-slate-900 mb-5">Source Data Summary</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Reviews Analyzed", value: "12,450", icon: <MessageSquare className="w-4 h-4 text-slate-400" /> },
                  { label: "Retailer Prices", value: "8", icon: <FileText className="w-4 h-4 text-slate-400" /> },
                  { label: "Price History Points", value: "247", icon: <TrendingUp className="w-4 h-4 text-slate-400" /> },
                  { label: "YouTube Videos", value: "18", icon: <PlaySquare className="w-4 h-4 text-slate-400" /> },
                  { label: "Expert Reviews", value: "6", icon: <BadgeCheck className="w-4 h-4 text-slate-400" /> },
                  { label: "Q&A Pairs", value: "312", icon: <HelpCircle className="w-4 h-4 text-slate-400" /> },
                  { label: "User Reports", value: "2", icon: <AlertTriangle className="w-4 h-4 text-slate-400" /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[13px]">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-medium text-slate-600">{item.label}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
              <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 mt-auto pt-4">
                View all source data <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Card>

          </div>
        </div>

        {/* Footer Actions Row */}
        <div className="grid grid-cols-12 gap-6 pt-2">

          <div className="col-span-5">
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5 flex flex-col h-full">
              <h3 className="text-[13px] font-bold text-slate-900 mb-3">Admin Notes</h3>
              <textarea
                className="w-full h-20 resize-none border border-slate-200 rounded-lg p-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Add notes about your review decision (optional)..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
              <div className="text-[11px] font-semibold text-slate-400 mt-2">
                {adminNotes.length} / 1000
              </div>
            </Card>
          </div>

          <div className="col-span-4">
            <Card className="bg-indigo-50 border-indigo-100 rounded-xl shadow-sm p-5 flex flex-col h-full">
              <h3 className="text-[13px] font-bold text-indigo-900 mb-3">Next Step Suggestions</h3>
              <ul className="space-y-2 flex-1">
                <li className="flex items-start gap-2 text-[12px] text-indigo-700 font-medium">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                  Approve if you agree with the AI verdict and score
                </li>
                <li className="flex items-start gap-2 text-[12px] text-indigo-700 font-medium">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                  Send to Human Approval for high-risk or uncertain cases
                </li>
                <li className="flex items-start gap-2 text-[12px] text-indigo-700 font-medium">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 mt-1.5"></div>
                  Reject if the AI analysis is incorrect or missing key context
                </li>
              </ul>
            </Card>
          </div>

          <div className="col-span-3">
            <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5 flex flex-col h-full">
              <h3 className="text-[13px] font-bold text-slate-900 mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-3 flex-1">
                <button className="w-full flex items-center justify-center gap-2 h-10 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  Send to Human Approval
                </button>
                <button className="w-full flex items-center justify-center gap-2 h-10 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  Escalate to Senior Reviewer
                </button>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
