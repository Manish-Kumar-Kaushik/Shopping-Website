"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  Gauge,
  HeartPulse,
  Link2,
  MoreVertical,
  Plus,
  RefreshCw,
  XCircle,
} from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const metrics = [
  { label: "Active Connectors", value: "6", trend: "↗ 100% of total", Icon: Link2, iconBg: "bg-blue-50 ring-blue-200", iconColor: "text-blue-600", trendColor: "text-emerald-600" },
  { label: "Healthy Connectors", value: "4", trend: "↗ 66.7%", Icon: HeartPulse, iconBg: "bg-emerald-50 ring-emerald-200", iconColor: "text-emerald-600", trendColor: "text-emerald-600" },
  { label: "Warning / Degraded", value: "1", trend: "↗ 16.7%", Icon: AlertTriangle, iconBg: "bg-orange-50 ring-orange-200", iconColor: "text-orange-500", trendColor: "text-orange-500" },
  { label: "Failed Connectors", value: "1", trend: "↗ 16.7%", Icon: XCircle, iconBg: "bg-rose-50 ring-rose-200", iconColor: "text-rose-600", trendColor: "text-rose-600" },
  { label: "Average Response Time", value: "842 ms", trend: "↘ -8.6% vs prev 7d", Icon: Clock3, iconBg: "bg-violet-50 ring-violet-200", iconColor: "text-violet-600", trendColor: "text-emerald-600" },
  { label: "Rate Limit Alerts", value: "3", trend: "↗ 25% vs prev 7d", Icon: Gauge, iconBg: "bg-orange-50 ring-orange-200", iconColor: "text-orange-600", trendColor: "text-rose-600" },
];

const connectors = [
  { retailer: "Amazon", type: "Product API", status: "Healthy", success: "99.71%", error: "0.29%", response: "621 ms", limit: 8745, total: 10000, sync: "May 18, 2025 10:23 AM", lastError: "—", color: "emerald" },
  { retailer: "Walmart", type: "Product API", status: "Warning", success: "97.12%", error: "2.88%", response: "1,204 ms", limit: 1256, total: 10000, sync: "May 18, 2025 10:18 AM", lastError: "Rate limit approaching 10:17 AM", color: "orange" },
  { retailer: "Best Buy", type: "Product API", status: "Healthy", success: "98.68%", error: "1.32%", response: "734 ms", limit: 6432, total: 10000, sync: "May 18, 2025 10:20 AM", lastError: "—", color: "emerald" },
  { retailer: "Target", type: "Feed API", status: "Feed Delay", success: "95.01%", error: "4.99%", response: "1,502 ms", limit: 3215, total: 10000, sync: "May 18, 2025 09:48 AM", lastError: "Feed delay detected 9:49 AM", color: "orange" },
  { retailer: "eBay", type: "Trading API", status: "Healthy", success: "98.34%", error: "1.66%", response: "812 ms", limit: 7890, total: 10000, sync: "May 18, 2025 10:21 AM", lastError: "—", color: "emerald" },
  { retailer: "Newegg", type: "Product API", status: "Failed", success: "71.25%", error: "28.75%", response: "2,345 ms", limit: 0, total: 10000, sync: "May 18, 2025 08:12 AM", lastError: "Authentication failed 8:11 AM", color: "rose" },
];

const trendData = [
  { date: "May 12", response: 1500, plotResponse: 1500, error: 1.50, plotError: 1.50 },
  { date: "May 13", response: 1450, plotResponse: 1450, error: 1.35, plotError: 1.35 },
  { date: "May 14", response: 1410, plotResponse: 1410, error: 1.25, plotError: 1.25 },
  { date: "May 15", response: 1490, plotResponse: 1490, error: 1.45, plotError: 1.45 },
  { date: "May 16", response: 1460, plotResponse: 1460, error: 1.38, plotError: 1.38 },
  { date: "May 17", response: 1390, plotResponse: 1390, error: 1.15, plotError: 1.15 },
  { date: "May 18", response: 1430, plotResponse: 1430, error: 1.28, plotError: 1.28 },
];

const health = [
  { name: "Amazon", value: 99.7, status: "Healthy", color: "bg-emerald-500" },
  { name: "Walmart", value: 97.1, status: "Warning", color: "bg-orange-500" },
  { name: "Best Buy", value: 98.7, status: "Healthy", color: "bg-emerald-500" },
  { name: "Target", value: 95.0, status: "Degraded", color: "bg-orange-500" },
  { name: "eBay", value: 98.3, status: "Healthy", color: "bg-emerald-500" },
  { name: "Newegg", value: 71.3, status: "Failed", color: "bg-rose-500" },
];

const incidents = [
  { Icon: AlertTriangle, bg: "bg-orange-50", icon: "text-orange-500", text: "Walmart API rate-limit spike detected", time: "10:17 AM" },
  { Icon: Clock3, bg: "bg-orange-50", icon: "text-orange-500", text: "Target product feed delay detected", time: "9:49 AM" },
  { Icon: CheckCircle2, bg: "bg-emerald-50", icon: "text-emerald-600", text: "eBay API recovery complete", time: "9:15 AM" },
  { Icon: XCircle, bg: "bg-rose-50", icon: "text-rose-600", text: "Newegg authentication failure", time: "8:11 AM" },
  { Icon: AlertTriangle, bg: "bg-orange-50", icon: "text-orange-500", text: "Best Buy affiliate link timeout", time: "Yesterday, 11:32 PM" },
];

const rateLimits = [
  { name: "Amazon", percent: 87, raw: "8,745 / 10,000" },
  { name: "Walmart", percent: 12, raw: "1,256 / 10,000" },
  { name: "Best Buy", percent: 64, raw: "6,432 / 10,000" },
  { name: "Target", percent: 32, raw: "3,215 / 10,000" },
  { name: "eBay", percent: 79, raw: "7,890 / 10,000" },
];

function RetailerLogo({ name }: { name: string }) {
  switch (name) {
    case "Amazon":
      return (
        <div className="w-6 h-6 rounded bg-[#1a1a1a] flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize="52" fontWeight="900" fill="white" fontFamily="Arial">a</text>
            <path d="M18 72 Q50 84 82 72" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M76 68 L82 72 L76 76" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
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
            <path d="M18 2 L19.5 11 L21 2 L18 2Z M18 34 L19.5 25 L21 34 L18 34Z M2 18 L11 16.5 L2 15 L2 18Z M34 18 L25 16.5 L34 15 L34 18Z M6.5 6.5 L13 13 L14 11 L7.5 4.5 L6.5 6.5Z M29.5 29.5 L23 23 L22 25 L28.5 31.5 L29.5 29.5Z M29.5 6.5 L28.5 4.5 L22 11 L23 13 L29.5 6.5Z M6.5 29.5 L7.5 31.5 L14 25 L13 23 L6.5 29.5Z"/>
          </svg>
        </div>
      );
    case "Target":
      return (
        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#CC0000" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="5.5" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
            <circle cx="12" cy="12" r="2" fill="#CC0000"/>
          </svg>
        </div>
      );
    case "eBay":
      return (
        <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm px-0.5">
          <span className="flex text-[9px] font-extrabold tracking-tighter leading-none">
            <span className="text-[#E53238]">e</span>
            <span className="text-[#0064D2]">b</span>
            <span className="text-[#F5AF02]">a</span>
            <span className="text-[#86B817]">y</span>
          </span>
        </div>
      );
    case "Newegg":
      return (
        <div className="w-6 h-6 rounded bg-[#002B5C] flex items-center justify-center shrink-0 shadow-sm px-0.5">
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
}

function StatusPill({ status }: { status: string }) {
  const failed = status === "Failed";
  const healthy = status === "Healthy";
  const cls = healthy
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : failed
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-orange-200 bg-orange-50 text-orange-700";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-semibold ${cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${healthy ? "bg-emerald-500" : failed ? "bg-rose-500" : "bg-orange-500"}`} />
      {status}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</section>;
}

const renderCustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex items-center justify-center gap-6 text-[13px] font-bold text-slate-600 mb-4 mt-1">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-6 h-3 shrink-0">
            {/* Horizontal line */}
            <div className="w-full h-[1.5px]" style={{ backgroundColor: entry.color }} />
            {/* Circle in the middle */}
            <div className="absolute w-2 h-2 rounded-full border border-white" style={{ backgroundColor: entry.color }} />
          </div>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs">
        <p className="font-bold text-slate-800 mb-1.5">{data.date}, 2025</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-slate-600 font-medium">Avg Response Time:</span>
            <span className="font-bold text-slate-900 ml-auto">{data.response} ms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span className="text-slate-600 font-medium">Error Rate:</span>
            <span className="font-bold text-slate-900 ml-auto">{data.error}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function RetailerConnectors() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">

      <main className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 text-xs text-slate-500">Admin <span className="mx-2 text-slate-300">/</span> Retailer Connectors</div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950">Retailer Connectors</h1>
            <p className="mt-1 text-sm text-slate-500">Monitor retailer API health, sync status, rate limits, and affiliate connectivity.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"><RefreshCw className="h-4 w-4" /> Refresh All</button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"><Activity className="h-4 w-4" /> Run Health Check</button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"><FileText className="h-4 w-4" /> View API Logs</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map(({ Icon, ...m }) => (
            <Card key={m.label} className="p-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ${m.iconBg}`}>
                  <Icon className={`h-6 w-6 ${m.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-600">{m.label}</p>
                  <div className="mt-1 text-2xl font-bold leading-none text-slate-950">{m.value}</div>
                  <p className={`mt-2 text-xs font-semibold ${m.trendColor}`}>{m.trend}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Card className="overflow-hidden">
              <div className="border-b border-slate-200 px-5 py-4">
                <h2 className="text-base font-bold text-slate-950">Connector Status</h2>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      {["Retailer", "Connector Type", "Status", "Success Rate", "Error Rate", "Avg Response Time", "Rate Limit Remaining", "Last Successful Sync", "Last Error", "Actions"].map((h) => (
                        <TableHead key={h} className="whitespace-nowrap px-4 py-3 text-[12px] font-bold text-slate-700">{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connectors.map((row) => {
                      const pct = (row.limit / row.total) * 100;
                      const bar = row.color === "emerald" ? "bg-emerald-500" : row.color === "rose" ? "bg-rose-500" : "bg-orange-500";
                      return (
                        <TableRow key={row.retailer} className="border-slate-200">
                          <TableCell className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-800"><RetailerLogo name={row.retailer} /> {row.retailer}</div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4 text-[13px] text-slate-700">{row.type}</TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4"><StatusPill status={row.status} /></TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4 text-[13px] font-medium text-slate-800">{row.success}</TableCell>
                          <TableCell className={`whitespace-nowrap px-4 py-4 text-[13px] font-medium ${parseFloat(row.error) > 10 ? "text-rose-600" : "text-slate-800"}`}>{row.error}</TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4 text-[13px] text-slate-800">{row.response}</TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4">
                            <div className="w-32">
                              <div className="mb-1 text-[12px] font-semibold text-slate-800">{row.limit.toLocaleString()} / {row.total.toLocaleString()}</div>
                              <Progress value={pct} className="h-1.5 bg-slate-200" indicatorClassName={bar} />
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4 text-[12px] font-medium text-slate-700">{row.sync}</TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4 text-[12px] text-slate-700">{row.lastError}</TableCell>
                          <TableCell className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center gap-3">
                              <Link href="/dashboard/connectors/amazon" className="text-[12px] font-bold text-blue-600 hover:text-blue-700">View Detail</Link>
                              <button className="text-slate-700 hover:text-slate-950"><MoreVertical className="h-4 w-4" /></button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-[13px] text-slate-600 md:flex-row md:items-center md:justify-between">
                <span>Showing 1 to 6 of 6 connectors</span>
                <div className="flex items-center gap-4">
                  <span>Rows per page:</span>
                  <button className="flex h-8 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 font-semibold text-slate-900">10 <ChevronDown className="h-3.5 w-3.5" /></button>
                  <button className="text-slate-400"><ChevronLeft className="h-4 w-4" /></button>
                  <button className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white">1</button>
                  <button className="text-slate-400"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              <Card className="p-6 lg:col-span-3">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-slate-950 flex items-center gap-1.5">
                    API Performance Trend
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full border border-slate-350 text-[10px] font-medium text-slate-400 select-none cursor-help leading-none">i</span>
                  </h2>
                  <div className="flex gap-2">
                    <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-colors">
                      Last 7 days <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                    <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-colors">
                      Daily <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                  </div>
                </div>
                <div className="h-[245px]">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 15, right: 35, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 500 }} padding={{ left: 35, right: 35 }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 500 }} tickMargin={8} domain={[0, 3000]} ticks={[0, 750, 1500, 2250, 3000]} tickFormatter={(v) => v === 3000 ? "3k" : v === 2250 ? "2.25k" : v === 1500 ? "1.5k" : String(v)} width={40} />
                        <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 500 }} tickMargin={12} domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tickFormatter={(v) => `${v}%`} width={35} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderCustomLegend} verticalAlign="top" />
                        <Line yAxisId="left" name="Avg Response Time (ms)" type="linear" dataKey="plotResponse" stroke="#2563eb" strokeWidth={2} dot={{ r: 3, fill: "#2563eb", stroke: "#2563eb" }} activeDot={{ r: 4 }}>
                          <LabelList dataKey="response" position="top" style={{ fill: '#2563eb', fontSize: 10, fontWeight: 'bold' }} offset={8} />
                        </Line>
                        <Line yAxisId="right" name="Error Rate (%)" type="linear" dataKey="plotError" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: "#ef4444", stroke: "#ef4444" }} activeDot={{ r: 4 }}>
                          <LabelList dataKey="error" position="bottom" style={{ fill: '#ef4444', fontSize: 10, fontWeight: 'bold' }} offset={8} formatter={(v: any) => `${v}%`} />
                        </Line>
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[245px] w-full bg-slate-100/50 rounded-lg animate-pulse" />
                  )}
                </div>
              </Card>

              <Card className="flex flex-col p-6 lg:col-span-2">
                <h2 className="mb-5 text-base font-bold text-slate-950">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Add Connector", sub: "Connect a new retailer", Icon: Plus, color: "bg-blue-600" },
                    { label: "Reconnect Affiliate", sub: "Re-auth affiliate links", Icon: Link2, color: "bg-emerald-600" },
                    { label: "Re-run Failed Sync", sub: "Retry failed synchronizations", Icon: RefreshCw, color: "bg-violet-600" },
                    { label: "View Logs", sub: "Access connector logs", Icon: FileText, color: "bg-blue-600" },
                  ].map(({ Icon, ...a }) => (
                    <button key={a.label} className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white py-5 px-3.5 shadow-sm hover:shadow-md hover:bg-slate-50 hover:border-slate-350 transition-all text-left min-w-0 w-full">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${a.color}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-bold text-slate-900 leading-snug">{a.label}</span>
                        <span className="mt-1 block text-[11px] text-slate-500 leading-snug">{a.sub}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <button className="mt-4 text-left text-[13px] font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                  View all actions <span className="text-sm font-semibold">→</span>
                </button>
              </Card>
            </div>
          </div>

          <aside className="flex flex-col gap-6 xl:col-span-1">
            <Card className="p-5">
              <h2 className="mb-4 text-base font-bold text-slate-950">Retailer Health Overview <span className="text-slate-400">ⓘ</span></h2>
              <div className="space-y-4">
                {health.map((item) => (
                  <div key={item.name} className="grid grid-cols-[64px_1fr_46px_78px] items-center gap-3 text-[12px]">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <Progress value={item.value} className="h-2 bg-slate-200" indicatorClassName={item.color} />
                    <span className="text-right font-semibold text-slate-700">{item.value.toFixed(1)}%</span>
                    <span className="flex items-center gap-2 font-medium text-slate-800"><span className={`h-2 w-2 rounded-full ${item.color}`} /> {item.status}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 text-sm font-semibold text-blue-600">View all retailer health →</button>
            </Card>

            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-950">Recent Connector Incidents</h2>
                <button className="text-xs font-semibold text-blue-600">View all</button>
              </div>
              <div className="space-y-4">
                {incidents.map(({ Icon, ...item }) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${item.bg}`}><Icon className={`h-4 w-4 ${item.icon}`} /></span>
                    <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-800">{item.text}</p>
                    <span className="shrink-0 text-[12px] text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-950">Rate Limit Monitor</h2>
                <button className="text-xs font-semibold text-blue-600">View all</button>
              </div>
              <div className="flex justify-between gap-3 border-b border-slate-200 pb-5">
                {rateLimits.map((item) => (
                  <div key={item.name} className="min-w-0 text-center">
                    <div className="mb-2 flex h-7 items-center justify-center"><RetailerLogo name={item.name} /></div>
                    <div className="truncate text-[12px] font-bold text-slate-900">{item.name}</div>
                    <div className="mt-2 text-[14px] font-black text-slate-950">{item.percent}%</div>
                    <div className={`mt-1 whitespace-nowrap text-[10px] font-semibold ${item.percent >= 50 ? "text-emerald-600" : item.percent >= 10 ? "text-orange-500" : "text-rose-600"}`}>{item.raw}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 font-semibold text-rose-600"><span className="h-2 w-2 animate-pulse rounded-full bg-rose-600" /> 3 alerts require attention</span>
                <button className="font-semibold text-blue-600">View rate limit details →</button>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
