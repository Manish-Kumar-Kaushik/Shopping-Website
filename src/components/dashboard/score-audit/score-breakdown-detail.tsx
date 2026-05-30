"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Tag,
  Star,
  PlayCircle,
  Info,
  Save,
  Trash2,
  MessageSquare,
  TrendingDown,
  User,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface ScoreComp {
  label: string;
  score: number | null;
  scoreColor: string;
  barColor: string;
  weight: number;
}

interface EvidRow {
  icon: React.ReactNode;
  source: string;
  items: number | string;
  status: "Fresh" | "Stale" | "OK";
  lastUpdated: string;
}

interface HistoryRow {
  version: string;
  score: number;
  changeDelta: number | null;
  reason: string;
  model: string;
  updatedBy: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const SCORE_COMPONENTS: ScoreComp[] = [
  { label: "Value Score", score: 74, scoreColor: "#0066FF", barColor: "#0066FF", weight: 25 },
  { label: "Quality Score", score: 88, scoreColor: "#16A34A", barColor: "#16A34A", weight: 25 },
  { label: "Review Trust Score", score: 81, scoreColor: "#0066FF", barColor: "#0066FF", weight: 20 },
  { label: "Price Score", score: 62, scoreColor: "#EA580C", barColor: "#EA580C", weight: 20 },
  { label: "Health / Safety Score", score: null, scoreColor: "#94A3B8", barColor: "#E2E8F0", weight: 0 },
  { label: "Expert / YouTube Evidence Score", score: 70, scoreColor: "#8B5CF6", barColor: "#8B5CF6", weight: 10 },
];

const WEIGHT_ROWS = [
  { label: "Value Score", pct: 25 },
  { label: "Quality Score", pct: 25 },
  { label: "Review Trust Score", pct: 20 },
  { label: "Price Score", pct: 20 },
  { label: "Expert / YouTube Evidence", pct: 10 },
];

const EVIDENCE_ROWS: EvidRow[] = [
  { icon: <Tag className="w-4 h-4 text-slate-500" />, source: "Retailer Prices", items: 12, status: "Fresh", lastUpdated: "May 18, 2024, 8:45 AM" },
  { icon: <MessageSquare className="w-4 h-4 text-slate-500" />, source: "Review Clusters", items: "1,842", status: "Fresh", lastUpdated: "May 18, 2024, 7:32 AM" },
  { icon: <PlayCircle className="w-4 h-4 text-slate-500" />, source: "YouTube Reviews", items: 38, status: "Fresh", lastUpdated: "May 18, 2024, 6:10 AM" },
  { icon: <Star className="w-4 h-4 text-slate-500" />, source: "Expert Reviews", items: 14, status: "Stale", lastUpdated: "May 17, 2024, 11:20 PM" },
  { icon: <TrendingDown className="w-4 h-4 text-slate-500" />, source: "Price History (90d)", items: 90, status: "Fresh", lastUpdated: "May 18, 2024, 8:40 AM" },
  { icon: <User className="w-4 h-4 text-slate-500" />, source: "User Reports", items: 6, status: "OK", lastUpdated: "May 18, 2024, 5:15 AM" },
];

const HISTORY_ROWS: HistoryRow[] = [
  { version: "electronics-v1.2", score: 76, changeDelta: -6, reason: "Price increased above 90-day average", model: "v1.2", updatedBy: "Scoring Engine", updatedAt: "May 18, 2024, 9:23 AM" },
  { version: "electronics-v1.1", score: 82, changeDelta: -4, reason: "Lower Review Trust Score", model: "v1.1", updatedBy: "Scoring Engine", updatedAt: "May 16, 2024, 8:12 AM" },
  { version: "electronics-v1.0", score: 86, changeDelta: null, reason: "Initial score", model: "v1.0", updatedBy: "Scoring Engine", updatedAt: "May 10, 2024, 10:05 AM" },
];

const SCORE_DATA = [
  { date: "Apr 19", score: 86 },
  { date: "Apr 24", score: 78 },
  { date: "Apr 29", score: 84 },
  { date: "May 4", score: 75 },
  { date: "May 9", score: 83 },
  { date: "May 14", score: 79 },
  { date: "May 18", score: 76 },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT HELPERS
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "Fresh" | "Stale" | "OK" | "Wait" | "High" }) {
  if (status === "Wait" || status === "Stale") {
    return <Badge variant="outline" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200 text-xs font-semibold px-2.5 py-0.5">{status}</Badge>;
  }
  if (status === "Fresh" || status === "High") {
    return <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 text-xs font-semibold px-2.5 py-0.5">{status}</Badge>;
  }
  return <Badge variant="outline" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 text-xs font-semibold px-2.5 py-0.5">{status}</Badge>;
}

function BarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="12" y1="20" x2="12" y2="9" />
      <line x1="18" y1="20" x2="18" y2="4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// RADIAL SCORE (3/4 GAUGE ARC)
// ─────────────────────────────────────────────────────────────
function RadialScore({ score }: { score: number }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const r = 58;
  const size = 160;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const arcLength = circ * (240 / 360);
  const scoreArcLength = mounted ? arcLength * (score / 100) : 0;

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Arc */}
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circ}`}
          transform={`rotate(150 ${c} ${c})`}
        />
        {/* Foreground Arc */}
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="#0066FF"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${scoreArcLength} ${circ}`}
          transform={`rotate(150 ${c} ${c})`}
          style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[42px] font-black text-slate-800 leading-none">{score}</span>
        <span className="text-[12px] text-slate-400 font-semibold mt-1">/100</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ScoreBreakdownDetail() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const [overrideOn, setOverrideOn] = useState(false);
  const [newScore, setNewScore] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="flex-1 bg-slate-50 p-6 flex flex-col gap-6 min-w-[1100px] overflow-x-auto" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ══ HEADER ══ */}
      <div>
        {/* breadcrumb */}
        <nav className="flex items-center text-xs text-slate-500 mb-2">
          <span className="font-medium hover:text-slate-700 cursor-pointer">Admin</span>
          <span className="mx-2 text-slate-300">/</span>
          <span onClick={() => router.push("/dashboard/audit")} className="font-medium text-blue-600 hover:underline cursor-pointer">Score Audit</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="font-medium text-slate-700">Sony WH-1000XM5</span>
        </nav>
        {/* title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">Score Breakdown Detail</h1>
            <p className="text-sm text-slate-500 mt-1">
              Review score components, evidence, version history, and manual overrides.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/audit")}
              className="text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Score Audit
            </Button>
            <Button variant="outline" className="text-sm font-medium">
              <Download className="w-4 h-4 mr-2" /> Export <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* ══ HERO PRODUCT CARD ══ */}
      <Card className="flex items-center p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
        {/* thumb + info */}
        <div className="flex items-center gap-5 pr-8 shrink-0">
          <div className="w-28 h-28 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0">
            <img src="/images/sony_headphones.png" alt="Sony WH-1000XM5" className="w-24 h-24 object-contain shrink-0" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-slate-900">Sony WH-1000XM5 Wireless Headphones</h2>
              <a href="https://www.amazon.com/dp/B09X57JWHH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex gap-10">
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Category</span>
                <span className="text-sm font-semibold text-slate-700">Electronics &gt; Headphones</span>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">ASIN</span>
                <span className="text-sm font-mono font-bold text-slate-700">B09X57JWHH</span>
              </div>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="flex items-center justify-between flex-1 pl-8 border-l border-slate-200">
          {/* AI Verdict */}
          <div className="flex flex-col justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Verdict</span>
            <StatusBadge status="Wait" />
          </div>
          <div className="w-px h-14 bg-slate-200 mx-2" />
          {/* Score */}
          <div className="flex flex-col justify-center gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall AI Buy Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-blue-600 leading-none">76</span>
              <span className="text-sm text-slate-400 font-medium">/100</span>
            </div>
          </div>
          <div className="w-px h-14 bg-slate-200 mx-2" />
          {/* Confidence */}
          <div className="flex flex-col justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Confidence</span>
            <StatusBadge status="High" />
          </div>
          <div className="w-px h-14 bg-slate-200 mx-2" />
          {/* Version */}
          <div className="flex flex-col justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Score Version</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-mono text-xs px-2.5 py-0.5">
              electronics-v1.2
            </Badge>
          </div>
          <div className="w-px h-14 bg-slate-200 mx-2" />
          {/* Last Updated */}
          <div className="flex flex-col justify-center gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Updated</span>
            <span className="text-sm font-semibold text-slate-800">May 18, 2024, 9:23 AM</span>
            <span className="text-xs text-slate-400">by Scoring Engine</span>
          </div>
        </div>
      </Card>

      {/* ══ MAIN BODY (DASHBOARD GRID) ══ */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (MAIN AREA) */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Row 1: Overall Score + Score Components */}
          <div className="grid grid-cols-12 gap-6">
            {/* Overall AI Buy Score */}
            <Card className="col-span-4 p-5 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-5">Overall AI Buy Score</h3>

              <div className="flex justify-center mb-4">
                <RadialScore score={76} />
              </div>

              <div className="flex justify-center mb-6">
                <StatusBadge status="High" />
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3 flex-1">
                {[
                  { icon: Tag, k: "Model", v: "electronics-v1.2", mono: true },
                  { icon: Clock, k: "Calculated", v: "May 18, 2024, 9:23 AM" },
                  { icon: FileText, k: "Category", v: "Electronics" },
                  { icon: CheckCircle2, k: "Data Freshness", v: "Up to date", green: true },
                ].map(({ icon: Icon, k, v, mono, green }) => (
                  <div key={k} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium">{k}</span>
                    </div>
                    <span
                      className={cn(
                        "text-xs",
                        mono
                          ? "font-mono text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded"
                          : green
                          ? "text-green-600 font-semibold"
                          : "text-slate-800 font-medium"
                      )}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-5 pt-3 border-t border-slate-100 w-full text-xs text-blue-600 font-semibold flex items-center justify-center gap-1.5 hover:text-blue-800 transition">
                <Info className="w-4 h-4" /> View score explanation
              </button>
            </Card>

            {/* Score Components */}
            <Card className="col-span-8 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-sm font-bold text-slate-900">Score Components</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {SCORE_COMPONENTS.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <p className="text-xs text-slate-700 font-bold leading-snug">{c.label}</p>
                    {c.score === null ? (
                      <span className="text-3xl font-black text-slate-300">N/A</span>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black" style={{ color: c.scoreColor }}>
                          {c.score}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">/100</span>
                      </div>
                    )}
                    <div className="w-full space-y-2 mt-auto">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out delay-150"
                          style={{ width: c.score ? `${c.score}%` : "0%", backgroundColor: c.barColor }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Weight {c.weight}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Row 2: Weight Breakdown + Input Evidence */}
          <div className="grid grid-cols-12 gap-6">
            {/* Weight Breakdown */}
            <Card className="col-span-4 p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-sm font-bold text-slate-900">Weight Breakdown</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-md px-3 py-2 mb-4">
                <span className="font-medium">Category: Electronics</span>
                <span className="font-bold text-slate-900">Total 100%</span>
              </div>
              <div className="space-y-4 flex-1">
                {WEIGHT_ROWS.map((row) => (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">{row.label}</span>
                      <span className="text-slate-900 font-bold">{row.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: mounted ? `${row.pct}%` : "0%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Input Evidence */}
            <Card className="col-span-8 p-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 p-5 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Input Evidence</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-bold text-slate-500 uppercase">Source</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase text-right">Items</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase">Status</TableHead>
                    <TableHead className="text-xs font-bold text-slate-500 uppercase">Last Updated</TableHead>
                    <TableHead className="w-8"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVIDENCE_ROWS.map((e, i) => (
                    <TableRow key={i} className="hover:bg-slate-50/80 cursor-pointer">
                      <TableCell className="py-3">
                        <div className="flex items-center gap-2.5">
                          {e.icon}
                          <span className="text-xs font-semibold text-slate-800">{e.source}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-right text-xs font-bold text-slate-700">{e.items}</TableCell>
                      <TableCell className="py-3">
                        <StatusBadge status={e.status} />
                      </TableCell>
                      <TableCell className="py-3 text-xs font-medium text-slate-500">{e.lastUpdated}</TableCell>
                      <TableCell className="py-3 text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Row 3: Score History */}
          <Card className="p-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 p-5 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Score History</h3>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="grid grid-cols-12">
              {/* Chart */}
              <div className="col-span-4 border-r border-slate-100 p-5 flex flex-col justify-center">
                <div className="h-[120px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={SCORE_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="date" hide />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#0066FF" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-medium mt-2 px-2">
                  <span>Apr 19</span>
                  <span>Apr 29</span>
                  <span>May 9</span>
                  <span>May 18</span>
                </div>
              </div>
              {/* Table */}
              <div className="col-span-8 p-0">
                <Table>
                  <TableHeader className="bg-white">
                    <TableRow className="hover:bg-transparent border-b border-slate-100">
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Version</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Score</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Change</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Reason</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Model</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Updated By</TableHead>
                      <TableHead className="text-xs font-bold text-slate-500 uppercase h-10">Updated At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {HISTORY_ROWS.map((row, i) => (
                      <TableRow key={i} className="hover:bg-slate-50/80">
                        <TableCell className="py-3">
                          <span className="font-mono text-xs font-bold text-slate-700">{row.version}</span>
                        </TableCell>
                        <TableCell className="py-3 text-sm font-black text-slate-900">{row.score}</TableCell>
                        <TableCell className="py-3">
                          {row.changeDelta !== null ? (
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 text-xs font-bold",
                                row.changeDelta < 0 ? "text-red-600" : "text-green-600"
                              )}
                            >
                              <span className="text-[10px]">{row.changeDelta < 0 ? "▼" : "▲"}</span>
                              {Math.abs(row.changeDelta)}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-bold">—</span>
                          )}
                        </TableCell>
                        <TableCell className="py-3 text-xs text-slate-600 font-medium max-w-[150px] truncate" title={row.reason}>
                          {row.reason}
                        </TableCell>
                        <TableCell className="py-3 text-xs font-mono font-semibold text-slate-500">{row.model}</TableCell>
                        <TableCell className="py-3 text-xs font-bold text-slate-700">{row.updatedBy}</TableCell>
                        <TableCell className="py-3 text-xs font-medium text-slate-500 whitespace-nowrap">{row.updatedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-3 border-t border-slate-100 flex justify-center bg-slate-50/50">
                  <button className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline">
                    View full score history <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div className="col-span-4 flex flex-col gap-6 sticky top-6 self-start">
          {/* Current Verdict Summary */}
          <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-900">Current Verdict Summary</h3>
            {/* Wait banner */}
            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <StatusBadge status="Wait" />
              <span className="text-xs text-orange-900 font-semibold">
                Not enough confidence for Buy/Don&apos;t Buy.
              </span>
            </div>
            {/* Why Wait */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800">Why Wait?</p>
              <ul className="space-y-1.5">
                {["Price is above 90-day average", "Mixed expert opinions", "Slight decline in Review Trust Score"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* What needs to improve */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-800">What needs to improve?</p>
              <ul className="space-y-1.5">
                {["Lower price or better promotions", "More positive expert reviews", "Increase high-trust review volume"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <button className="text-xs text-blue-600 flex items-center gap-1 hover:underline font-bold mt-2">
              View full explanation <ArrowRight className="w-3 h-3" />
            </button>
          </Card>

          {/* Manual Override */}
          <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Manual Override</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-bold">Override score?</span>
                <button
                  type="button"
                  onClick={() => setOverrideOn(!overrideOn)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    overrideOn ? "bg-blue-600" : "bg-slate-200"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                      overrideOn ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-600 font-bold mb-1.5">New score (0–100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={newScore}
                  disabled={!overrideOn}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="Enter new score"
                  className="w-full h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 font-bold mb-1.5">Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  disabled={!overrideOn}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why you're overriding this score..."
                  maxLength={500}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition font-medium"
                />
                <div className="text-right text-xs text-slate-400 mt-1 font-medium">{reason.length} / 500</div>
              </div>
            </div>

            <div className="flex gap-3 mt-1">
              <Button
                disabled={!overrideOn}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm"
              >
                <Save className="w-4 h-4 mr-2" /> Save Override
              </Button>
              <Button
                variant="outline"
                disabled={!overrideOn}
                className="flex-1 text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700 font-bold shadow-sm disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Remove Override
              </Button>
            </div>
            <p className="text-xs text-slate-400 text-center font-medium mt-1">
              Overrides are logged and visible in score history.
            </p>
          </Card>

          {/* Admin Notes */}
          <Card className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Admin Notes</h3>
                <HelpCircle className="w-4 h-4 text-slate-400" />
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs font-bold text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Note
              </Button>
            </div>
            
            {/* existing note */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">Admin User</span>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-[9px] px-1.5 py-0 uppercase font-bold">
                        Super Admin
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">May 18, 9:25 AM</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium mt-1.5">
                    Price spike likely temporary due to limited stock. Re-check after next price drop.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
