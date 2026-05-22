"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  Download,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  Plus,
  BarChart2,
  Tag,
  Star,
  Users,
  TrendingDown,
  Shield,
  AlertCircle,
  Check,
  PlayCircle,
  BarChart,
  Info,
} from "lucide-react";


// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface ScoreComponent {
  label: string;
  score: number | null;
  color: string;
  barColor: string;
  trackColor: string;
  weight: number;
  weightLabel: string;
}

interface EvidenceRow {
  icon: React.ReactNode;
  source: string;
  items: number | string;
  status: "Fresh" | "Stale" | "OK";
  lastUpdated: string;
}

interface HistoryRow {
  version: string;
  score: number;
  change: string;
  changeDelta: number | null;
  reason: string;
  model: string;
  updatedBy: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────

const SCORE_COMPONENTS: ScoreComponent[] = [
  {
    label: "Value Score",
    score: 74,
    color: "text-amber-600",
    barColor: "bg-amber-400",
    trackColor: "bg-amber-100",
    weight: 25,
    weightLabel: "Weight 25%",
  },
  {
    label: "Quality Score",
    score: 88,
    color: "text-emerald-600",
    barColor: "bg-emerald-500",
    trackColor: "bg-emerald-100",
    weight: 25,
    weightLabel: "Weight 25%",
  },
  {
    label: "Review Trust Score",
    score: 81,
    color: "text-blue-600",
    barColor: "bg-blue-500",
    trackColor: "bg-blue-100",
    weight: 20,
    weightLabel: "Weight 20%",
  },
  {
    label: "Price Score",
    score: 62,
    color: "text-orange-500",
    barColor: "bg-orange-400",
    trackColor: "bg-orange-100",
    weight: 20,
    weightLabel: "Weight 20%",
  },
  {
    label: "Health / Safety Score",
    score: null,
    color: "text-slate-400",
    barColor: "bg-slate-200",
    trackColor: "bg-slate-100",
    weight: 0,
    weightLabel: "Weight 0%",
  },
  {
    label: "Expert / YouTube Evidence Score",
    score: 70,
    color: "text-violet-600",
    barColor: "bg-violet-500",
    trackColor: "bg-violet-100",
    weight: 10,
    weightLabel: "Weight 10%",
  },
];

const WEIGHT_ROWS = [
  { label: "Value Score", pct: 25, barColor: "bg-amber-400" },
  { label: "Quality Score", pct: 25, barColor: "bg-emerald-500" },
  { label: "Review Trust Score", pct: 20, barColor: "bg-blue-500" },
  { label: "Price Score", pct: 20, barColor: "bg-orange-400" },
  { label: "Expert / YouTube Evidence", pct: 10, barColor: "bg-violet-500" },
];

const EVIDENCE_ROWS: EvidenceRow[] = [
  {
    icon: <Tag className="w-3.5 h-3.5 text-blue-500" />,
    source: "Retailer Prices",
    items: 12,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:45 AM",
  },
  {
    icon: <Star className="w-3.5 h-3.5 text-amber-500" />,
    source: "Review Clusters",
    items: "1,842",
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:12 AM",
  },
  {
    icon: <PlayCircle className="w-3.5 h-3.5 text-red-500" />,
    source: "YouTube Reviews",
    items: 38,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 6:10 AM",
  },
  {
    icon: <Users className="w-3.5 h-3.5 text-violet-500" />,
    source: "Expert Reviews",
    items: 14,
    status: "Stale",
    lastUpdated: "May 17, 2024, 11:20 PM",
  },
  {
    icon: <BarChart className="w-3.5 h-3.5 text-teal-500" />,
    source: "Price History (90d)",
    items: 90,
    status: "Fresh",
    lastUpdated: "May 18, 2024, 8:40 AM",
  },
  {
    icon: <Shield className="w-3.5 h-3.5 text-slate-400" />,
    source: "User Reports",
    items: 6,
    status: "OK",
    lastUpdated: "May 18, 2024, 6:15 AM",
  },
];

const HISTORY_ROWS: HistoryRow[] = [
  {
    version: "electronics-v1.2",
    score: 76,
    change: "-6",
    changeDelta: -6,
    reason: "Price increased above 90-day average",
    model: "v1.2",
    updatedBy: "Scoring Engine",
    updatedAt: "May 18, 2024, 9:23 AM",
  },
  {
    version: "electronics-v1.1",
    score: 82,
    change: "-4",
    changeDelta: -4,
    reason: "Lower Review Trust Score",
    model: "v1.1",
    updatedBy: "Scoring Engine",
    updatedAt: "May 16, 2024, 8:12 AM",
  },
  {
    version: "electronics-v1.0",
    score: 86,
    change: "—",
    changeDelta: null,
    reason: "Initial score",
    model: "v1.0",
    updatedBy: "Scoring Engine",
    updatedAt: "May 10, 2024, 10:05 AM",
  },
];

// ─────────────────────────────────────────────────────────────
// HELPER: Status Badge
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "Fresh" | "Stale" | "OK" }) {
  const styles = {
    Fresh: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Stale: "bg-amber-50 text-amber-700 border border-amber-200",
    OK: "bg-slate-100 text-slate-600 border border-slate-200",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: Radial Score Ring (SVG)
// ─────────────────────────────────────────────────────────────

function RadialScore({ score }: { score: number }) {
  const r = 52;
  const cx = 68;
  const cy = 68;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const gap = 0;

  return (
    <svg width="136" height="136" viewBox="0 0 136 136">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="11"
      />
      {/* Progress */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeDasharray={`${filled - gap} ${circ - filled + gap}`}
        transform="rotate(-90 68 68)"
      />
      {/* Score number */}
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="#1e293b"
        fontFamily="Inter, sans-serif"
      >
        {score}
      </text>
      {/* /100 */}
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fontSize="13"
        fill="#94a3b8"
        fontFamily="Inter, sans-serif"
      >
        /100
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// HELPER: Area Sparkline (SVG)
// ─────────────────────────────────────────────────────────────

function ScoreSparkline() {
  const data = [86, 85, 84, 83, 82, 82, 80, 79, 78, 77, 76, 76];
  const W = 220;
  const H = 90;
  const padX = 8;
  const padY = 10;
  const minVal = 70;
  const maxVal = 92;

  const toX = (i: number) => padX + (i / (data.length - 1)) * (W - padX * 2);
  const toY = (v: number) =>
    H - padY - ((v - minVal) / (maxVal - minVal)) * (H - padY * 2);

  const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
  const areaBase = toY(minVal);
  const area = `${toX(0)},${areaBase} ${pts} ${toX(data.length - 1)},${areaBase}`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {/* Y-axis labels */}
      {[100, 75, 50, 25].map((v) => (
        <text
          key={v}
          x={0}
          y={toY(v) + 4}
          fontSize="9"
          fill="#94a3b8"
          fontFamily="Inter, sans-serif"
        >
          {v}
        </text>
      ))}
      {/* Area fill */}
      <polygon points={area} fill="url(#areaGrad)" />
      {/* Line */}
      <polyline
        points={pts}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last dot */}
      <circle
        cx={toX(data.length - 1)}
        cy={toY(data[data.length - 1])}
        r="4"
        fill="#3b82f6"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function ScoreBreakdownDetail() {
  const router = useRouter();
  const [overrideEnabled, setOverrideEnabled] = useState(false);
  const [newScore, setNewScore] = useState("");
  const [reason, setReason] = useState("");
  const [adminNote, setAdminNote] = useState("");

  return (
    <div className="flex h-full bg-[#f8fafc] min-h-0">
      {/* ════════════════════════════════════════════
          SCROLLABLE MAIN AREA
      ════════════════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto min-w-0">
        <div className="px-6 py-5 max-w-[1100px]">

          {/* ── Breadcrumb + Actions ── */}
          <div className="flex items-center justify-between mb-1">
            <nav className="flex items-center gap-1 text-[12px]">
              <button
                onClick={() => router.push("/dashboard/audit")}
                className="text-blue-600 hover:underline font-medium"
              >
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => router.push("/dashboard/audit")}
                className="text-blue-600 hover:underline font-medium"
              >
                Score Audit
              </button>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-500">Sony WH-1000XM5</span>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/dashboard/audit")}
                className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Score Audit
              </button>
              <button className="flex items-center gap-1.5 h-8 px-3 text-[12px] font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <Download className="w-3.5 h-3.5" />
                Export
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>

          {/* ── Page Title ── */}
          <div className="mb-4">
            <h1 className="text-[22px] font-bold text-slate-800 leading-tight">
              Score Breakdown Detail
            </h1>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Review score components, evidence, version history, and manual
              overrides.
            </p>
          </div>

          {/* ── Product Hero Card ── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Product Image */}
              <div className="w-[72px] h-[72px] rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-4xl">
                🎧
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-start gap-1.5">
                  <h2 className="text-[15px] font-bold text-slate-800 leading-snug">
                    Sony WH-1000XM5 Wireless Headphones
                  </h2>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0 cursor-pointer" />
                </div>
                <p className="text-[12px] text-slate-500 mt-0.5">
                  Electronics &gt; Headphones
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] text-slate-400 font-medium">
                    ASIN
                  </span>
                  <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    B09X57JWHH
                  </span>
                </div>
              </div>

              {/* KPI strip */}
              <div className="flex items-center gap-0 divide-x divide-slate-100 ml-auto">
                {/* AI Verdict */}
                <div className="px-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1.5">
                    AI Verdict
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-[12px] font-bold">
                    Wait
                  </span>
                </div>

                {/* Overall Score */}
                <div className="px-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">
                    Overall AI Buy Score
                  </p>
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="text-[32px] font-extrabold text-slate-800 leading-none">
                      76
                    </span>
                    <span className="text-[14px] text-slate-400 font-medium">
                      /100
                    </span>
                  </div>
                </div>

                {/* Confidence */}
                <div className="px-4 text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-1.5">
                    Confidence
                  </p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[12px] font-semibold">
                    <BarChart2 className="w-3 h-3" />
                    High
                  </span>
                </div>

                {/* Version + Updated */}
                <div className="px-4 space-y-1.5">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">
                      Score Version
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-mono font-semibold">
                      electronics-v1.2
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide font-semibold mb-0.5">
                      Last Updated
                    </p>
                    <p className="text-[12px] text-slate-700 font-semibold">
                      May 18, 2024, 9:23 AM
                    </p>
                    <p className="text-[10px] text-slate-400">
                      by Scoring Engine
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Score Overview Row ── */}
          <div className="grid grid-cols-12 gap-4 mb-4">

            {/* LEFT: Overall Radial + Meta */}
            <div className="col-span-12 lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col items-center">
              <div className="self-start mb-3">
                <span className="text-[13px] font-bold text-slate-800">
                  Overall AI Buy Score
                </span>
              </div>

              <RadialScore score={76} />

              <div className="mt-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                  <BarChart2 className="w-3 h-3" />
                  High Confidence
                </span>
              </div>

              {/* Meta KVs */}
              <div className="w-full border-t border-slate-100 pt-3 space-y-2">
                {[
                  { k: "Model", v: "electronics-v1.2", mono: true },
                  { k: "Calculated", v: "May 18, 2024, 9:23 AM", mono: false },
                  { k: "Category", v: "Electronics", mono: false },
                  { k: "Data Freshness", v: "Up to date", green: true },
                ].map(({ k, v, mono, green }) => (
                  <div key={k} className="flex justify-between items-start gap-2">
                    <span className="text-[11px] text-slate-500 shrink-0">{k}</span>
                    <span
                      className={`text-[11px] text-right leading-snug ${
                        mono
                          ? "font-mono text-slate-700"
                          : green
                          ? "text-emerald-600 font-semibold"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-[11px] text-blue-600 hover:underline font-medium flex items-center gap-1">
                <Info className="w-3 h-3" />
                View score-explanation
              </button>
            </div>

            {/* RIGHT: Score Components + Weight + Evidence */}
            <div className="col-span-12 lg:col-span-9 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col gap-4">

              {/* Score Components Grid */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[13px] font-bold text-slate-800">
                    Score Components
                  </span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {SCORE_COMPONENTS.map((c) => (
                    <div key={c.label} className="flex flex-col items-center text-center">
                      <p className="text-[10px] text-slate-500 font-medium leading-tight mb-2 min-h-[28px] flex items-center justify-center">
                        {c.label}
                      </p>
                      {c.score === null ? (
                        <div className="flex items-baseline gap-0.5 mb-2">
                          <span className="text-[22px] font-extrabold text-slate-400">
                            N/A
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-0.5 mb-2">
                          <span className={`text-[22px] font-extrabold ${c.color}`}>
                            {c.score}
                          </span>
                          <span className="text-[11px] text-slate-400">/100</span>
                        </div>
                      )}
                      {/* Progress bar */}
                      <div className={`w-full h-1.5 ${c.trackColor} rounded-full overflow-hidden`}>
                        <div
                          className={`h-full rounded-full ${c.barColor} transition-all`}
                          style={{ width: c.score === null ? "0%" : `${c.score}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {c.weightLabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Weight + Evidence side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Weight Breakdown */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[12px] font-bold text-slate-800">
                      Weight Breakdown
                    </span>
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                    <span className="font-semibold">Category: Electronics</span>
                    <span className="font-semibold">Total 100%</span>
                  </div>
                  <div className="space-y-2.5">
                    {WEIGHT_ROWS.map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-slate-600">{row.label}</span>
                          <span className="text-slate-500 font-semibold">
                            {row.pct}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${row.barColor}`}
                            style={{ width: `${row.pct * 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input Evidence */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[12px] font-bold text-slate-800">
                      Input Evidence
                    </span>
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="space-y-0.5">
                    {/* Header */}
                    <div className="grid grid-cols-[1fr_48px_64px_auto] gap-1 px-1 pb-1 border-b border-slate-100">
                      {["Source", "Items", "Status", "Last Updated"].map((h) => (
                        <span
                          key={h}
                          className="text-[9px] font-bold text-slate-400 uppercase tracking-wide"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    {EVIDENCE_ROWS.map((e) => (
                      <div
                        key={e.source}
                        className="grid grid-cols-[1fr_48px_64px_auto] gap-1 items-center px-1 py-1 rounded hover:bg-slate-50 cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          {e.icon}
                          <span className="text-[11px] text-slate-700 font-medium truncate">
                            {e.source}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 text-right pr-2">
                          {e.items}
                        </span>
                        <div>
                          <StatusBadge status={e.status} />
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap text-right">
                          {e.lastUpdated}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Score History ── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-[13px] font-bold text-slate-800">
                Score History
              </span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="grid grid-cols-12 gap-5">
              {/* Sparkline */}
              <div className="col-span-12 md:col-span-4">
                <ScoreSparkline />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 px-2">
                  <span>Apr 19</span>
                  <span>Apr 29</span>
                  <span>May 9</span>
                  <span>May 18</span>
                </div>
              </div>

              {/* History Table */}
              <div className="col-span-12 md:col-span-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {[
                        "Version",
                        "Score",
                        "Change",
                        "Reason",
                        "Model",
                        "Updated By",
                        "Updated At",
                      ].map((h) => (
                        <th
                          key={h}
                          className="pb-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wide pr-3 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HISTORY_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-2 pr-3">
                          <span className="inline-block font-mono text-blue-700 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap font-semibold">
                            {row.version}
                          </span>
                        </td>
                        <td className="py-2 pr-3 text-[13px] font-bold text-slate-800">
                          {row.score}
                        </td>
                        <td className="py-2 pr-3">
                          {row.changeDelta !== null ? (
                            <span
                              className={`text-[12px] font-bold flex items-center gap-0.5 ${
                                row.changeDelta < 0
                                  ? "text-red-500"
                                  : "text-emerald-600"
                              }`}
                            >
                              {row.changeDelta < 0 && (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {row.change}
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[12px]">—</span>
                          )}
                        </td>
                        <td className="py-2 pr-3 text-[11px] text-slate-600 max-w-[180px]">
                          {row.reason}
                        </td>
                        <td className="py-2 pr-3 text-[11px] font-mono text-slate-500">
                          {row.model}
                        </td>
                        <td className="py-2 pr-3 text-[11px] text-slate-600 whitespace-nowrap">
                          {row.updatedBy}
                        </td>
                        <td className="py-2 text-[11px] text-slate-400 whitespace-nowrap">
                          {row.updatedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 flex justify-center">
                  <button className="text-[12px] text-blue-600 hover:underline font-semibold flex items-center gap-1">
                    View full score history
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* bottom padding */}
          <div className="h-4" />
        </div>
      </div>

      {/* ════════════════════════════════════════════
          RIGHT PANEL
      ════════════════════════════════════════════ */}
      <div className="w-[280px] xl:w-[296px] shrink-0 border-l border-slate-200 bg-white overflow-y-auto">
        <div className="p-4 space-y-5">

          {/* ── Card 1: Current Verdict Summary ── */}
          <div>
            <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-3">
              Current Verdict Summary
            </h3>

            {/* Wait banner */}
            <div className="flex items-center gap-2 mb-3 p-2 bg-amber-50 border border-amber-100 rounded-lg">
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-[11px] font-bold">
                Wait
              </span>
              <span className="text-[11px] text-slate-500 leading-tight">
                Not enough confidence for Buy/Don&apos;t Buy.
              </span>
            </div>

            {/* Why Wait */}
            <div className="mb-3">
              <p className="text-[11px] font-bold text-slate-700 mb-1.5">
                Why Wait?
              </p>
              <ul className="space-y-1.5">
                {[
                  "Price is above 90-day average",
                  "Mixed expert opinions",
                  "Slight decline in Review Trust Score",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-[11px] text-slate-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What needs to improve */}
            <div className="mb-2">
              <p className="text-[11px] font-bold text-slate-700 mb-1.5">
                What needs to improve?
              </p>
              <ul className="space-y-1.5">
                {[
                  "Lower price or better promotions",
                  "More positive expert reviews",
                  "Increase high-trust review volume",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-[11px] text-slate-600"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-1 text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-0.5">
              View full explanation
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <hr className="border-slate-100" />

          {/* ── Card 2: Manual Override ── */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                Manual Override
              </h3>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Toggle row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] text-slate-600 font-medium">
                Override score?
              </span>
              <button
                onClick={() => setOverrideEnabled(!overrideEnabled)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${
                  overrideEnabled ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                    overrideEnabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* New Score */}
            <div className="mb-2">
              <label className="block text-[11px] text-slate-500 font-medium mb-1">
                New score (0–100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                placeholder="Enter new score..."
                className="w-full h-8 px-2.5 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>

            {/* Reason */}
            <div className="mb-3">
              <label className="block text-[11px] text-slate-500 font-medium mb-1">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why you're overriding this score..."
                rows={3}
                maxLength={500}
                className="w-full px-2.5 py-2 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none transition-all"
              />
              <div className="text-right text-[10px] text-slate-400 mt-0.5">
                {reason.length} / 500
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 h-8 text-[12px] font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 shadow-sm">
                <Check className="w-3.5 h-3.5" />
                Save Override
              </button>
              <button className="flex-1 h-8 text-[12px] font-bold bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Remove Override
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 text-center leading-snug">
              Overrides are logged and visible in score history.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* ── Card 3: Admin Notes ── */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <h3 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
                  Admin Notes
                </h3>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <button className="flex items-center gap-1 text-[11px] text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md font-semibold transition-colors">
                <Plus className="w-3 h-3" />
                Add Note
              </button>
            </div>

            {/* Existing Note */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-3">
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm">
                  AU
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="text-[11px] font-bold text-slate-800">
                      Admin User
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                      Super Admin
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">
                      May 18, 2024, 9:23 AM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Price spike likely temporary due to limited stock. Re-check
                    after next price drop.
                  </p>
                </div>
              </div>
            </div>

            {/* New Note Input */}
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Add a note..."
              rows={2}
              className="w-full px-2.5 py-2 text-[12px] border border-slate-200 rounded-lg bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
