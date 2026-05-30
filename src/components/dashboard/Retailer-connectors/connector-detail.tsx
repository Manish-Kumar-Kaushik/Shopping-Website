"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Bell, 
  Activity, 
  FileText, 
  Settings, 
  RefreshCcw, 
  CheckCircle2, 
  Clock3, 
  ArrowUpRight, 
  ArrowDownRight,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

const REQUEST_VOLUME_DATA = [
  { time: "11:00 AM", total: 3000, successful: 2100, failed: 0 },
  { time: "3:00 PM", total: 2200, successful: 1600, failed: 0 },
  { time: "7:00 PM", total: 2800, successful: 1900, failed: 0 },
  { time: "11:00 PM", total: 3700, successful: 2300, failed: 0 },
  { time: "3:00 AM", total: 2800, successful: 1900, failed: 0 },
  { time: "7:00 AM", total: 2000, successful: 1500, failed: 0 },
  { time: "10:00 AM", total: 2500, successful: 1900, failed: 0 },
];

const DONUT_DATA = [
  { name: "Successful", value: 99.23, color: "#22c55e" },
  { name: "Failed", value: 0.49, color: "#eab308" },
  { name: "Timeout", value: 0.28, color: "#ef4444" },
];

const API_ENDPOINTS = [
  { endpoint: "GetItems", requests: "18,452", successRate: "99.45%", avgTime: "420 ms" },
  { endpoint: "ItemSearch", requests: "12,873", successRate: "98.91%", avgTime: "610 ms" },
  { endpoint: "ItemLookup", requests: "8,921", successRate: "99.62%", avgTime: "380 ms" },
  { endpoint: "BrowseNodeLookup", requests: "4,256", successRate: "99.12%", avgTime: "560 ms" },
  { endpoint: "GetItemOffers", requests: "3,121", successRate: "98.23%", avgTime: "720 ms" },
];

const RECENT_ERRORS = [
  { time: "10:31 AM", error: "RequestThrottled", count: "23", lastOccurred: "1 min ago", color: "bg-amber-500" },
  { time: "10:22 AM", error: "InternalServerError", count: "12", lastOccurred: "10 min ago", color: "bg-red-500" },
  { time: "10:15 AM", error: "ItemNotFound", count: "7", lastOccurred: "17 min ago", color: "bg-blue-500" },
  { time: "09:58 AM", error: "AccessDenied", count: "5", lastOccurred: "34 min ago", color: "bg-red-500" },
  { time: "09:42 AM", error: "ServiceUnavailable", count: "3", lastOccurred: "50 min ago", color: "bg-amber-500" },
];

const CONNECTOR_INFO = [
  { label: "Connector Type", value: "Product API + Affiliate" },
  { label: "API Version", value: "2020-09-01" },
  { label: "Region", value: "US" },
  { label: "Rate Limit", value: "10,000 requests / hour" },
  { label: "Timeout", value: "2,000 ms" },
  { label: "Retry Policy", value: "3 retries with exponential backoff" },
  { label: "Created At", value: "Apr 10, 2024 09:15 AM" },
  { label: "Last Updated", value: "May 18, 2024 10:40 AM" },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ConnectorDetail() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full bg-slate-50 font-sans p-8 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Breadcrumb */}
            <div className="flex items-center text-[13px] font-medium text-slate-500 mb-2">
              <Link href="/dashboard/connectors" className="hover:text-slate-900 transition-colors">Retailer Connectors</Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1" />
              <span>Retailer Detail</span>
              <ChevronRight className="w-3.5 h-3.5 mx-1" />
              <span className="text-slate-900">Amazon</span>
            </div>

            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900">Amazon Connector</h1>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-bold text-[11px] px-2.5 py-0.5 rounded">
                    Healthy
                  </Badge>
                </div>
                <div className="text-sm text-slate-500 font-medium mb-1">Product API + Affiliate</div>
                <a href="https://webservices.amazon.com" target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-800 transition-colors">
                  https://webservices.amazon.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 h-9 px-4 rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                    <Activity className="w-4 h-4 text-slate-500" /> Test Connector
                  </button>
                  <button className="flex items-center gap-1.5 h-9 px-4 rounded-md border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                    <FileText className="w-4 h-4 text-slate-500" /> View API Logs
                  </button>
                  <button className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">
                    <Settings className="w-4 h-4" /> Edit Configuration
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Auto refresh: 30s</span>
                  <button className="text-blue-600 flex items-center gap-1 hover:text-blue-800"><RefreshCcw className="w-3.5 h-3.5" /> Refresh Now</button>
                </div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-6 gap-4">
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Status</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-black text-slate-900 leading-none">Healthy</div>
                </div>
                <div className="text-xs text-slate-500 font-medium mt-2">All systems operational</div>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Success Rate (24h)</div>
                <div className="flex justify-between items-end mb-1">
                  <div className="text-xl font-black text-slate-900 leading-none">99.23%</div>
                  <div className="w-16 h-6">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={REQUEST_VOLUME_DATA.slice(0, 4)}>
                          <Line type="monotone" dataKey="successful" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={true} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> 1.12% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Avg Response Time</div>
                <div className="flex justify-between items-end mb-1">
                  <div className="text-xl font-black text-slate-900 leading-none">512 ms</div>
                  <div className="w-16 h-6">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[ {v: 600}, {v: 550}, {v: 580}, {v: 512} ]}>
                          <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={true} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center mt-2">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" /> 48 ms <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Requests (24h)</div>
                <div className="flex justify-between items-end mb-1">
                  <div className="text-xl font-black text-slate-900 leading-none">48,623</div>
                  <div className="w-16 h-6">
                    {mounted && (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={REQUEST_VOLUME_DATA.slice(0, 4)}>
                          <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} dot={false} isAnimationActive={true} />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center mt-2">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12.3% <span className="text-slate-400 font-medium ml-1">vs yesterday</span>
                </div>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Rate Limit Remaining</div>
                <div className="text-xl font-black text-slate-900 leading-none mb-3">72%</div>
                <Progress value={mounted ? 72 : 0} className="h-1.5 bg-slate-100" indicatorClassName="bg-amber-500 transition-all duration-1000 ease-out" />
                <div className="text-[11px] text-slate-500 font-medium mt-2">7,200 / 10,000</div>
              </Card>

              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-4">
                <div className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1">Last Successful Sync <RefreshCcw className="w-3 h-3 ml-auto" /></div>
                <div className="flex items-center gap-1.5 mb-2 mt-1">
                  <Clock3 className="w-5 h-5 text-slate-600" />
                  <div className="text-xl font-black text-slate-900 leading-none">2 min ago</div>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-2">May 18, 2024 10:42 AM</div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 flex gap-6">
              {["Overview", "Performance", "Errors", "Sync Status", "Affiliate", "Configuration", "Activity"].map((tab, idx) => (
                <button 
                  key={idx}
                  className={`pb-3 text-sm font-bold border-b-2 transition-colors ${idx === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Request Volume */}
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-900">Request Volume</h3>
                  <div className="flex items-center gap-1 h-8 px-3 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-sm cursor-pointer hover:bg-slate-50">
                    Last 24 hours <ChevronDown className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
                <div className="flex-1 min-h-[220px]">
                  {mounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REQUEST_VOLUME_DATA} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorFail" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b", fontWeight: 600 }} tickFormatter={(val) => val === 0 ? "0" : `${val/1000}K`} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                        {/* Layer order: Total (back), Success (middle), Failed (front) */}
                        <Area type="linear" dataKey="total" name="Total Requests" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" dot={{ r: 3.5, strokeWidth: 0, fill: "#6366f1" }} activeDot={{ r: 5, strokeWidth: 0, fill: "#6366f1" }} isAnimationActive={true} />
                        <Area type="linear" dataKey="successful" name="Successful Requests" stroke="#22c55e" strokeWidth={2} fillOpacity={0} fill="transparent" dot={{ r: 3.5, strokeWidth: 0, fill: "#22c55e" }} activeDot={{ r: 5, strokeWidth: 0, fill: "#22c55e" }} isAnimationActive={true} />
                        <Area type="linear" dataKey="failed" name="Failed Requests" stroke="#ef4444" strokeWidth={2} fillOpacity={0} fill="transparent" dot={{ r: 3.5, strokeWidth: 0, fill: "#ef4444" }} activeDot={{ r: 5, strokeWidth: 0, fill: "#ef4444" }} isAnimationActive={true} />
                        
                        {/* Custom Legend to match exact order and spacing from screenshot */}
                        <Legend 
                          content={() => (
                            <div className="flex items-center justify-center gap-6 pt-4 text-[11px] font-semibold text-slate-600">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                                <span>Failed Requests</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                                <span>Successful Requests</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#6366f1]"></div>
                                <span>Total Requests</span>
                              </div>
                            </div>
                          )}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Card>

              {/* Performance Summary */}
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-slate-900">Performance Summary</h3>
                  <div className="flex items-center gap-1 h-8 px-3 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 bg-white shadow-sm cursor-pointer hover:bg-slate-50">
                    Last 7 days <ChevronDown className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
                <div className="flex items-center justify-between h-full px-4">
                  <div className="flex flex-col gap-3.5 w-[45%] pl-2">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">Total Requests</span>
                      <span className="font-bold text-slate-900">312,452</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">Successful Requests</span>
                      <span className="font-bold text-slate-900">310,145</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">Failed Requests</span>
                      <span className="font-bold text-slate-900">2,307</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">Timeouts</span>
                      <span className="font-bold text-slate-900">1,024</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">Avg Response Time</span>
                      <span className="font-bold text-slate-900">512 ms</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="font-semibold text-slate-600">P95 Response Time</span>
                      <span className="font-bold text-slate-900">1,850 ms</span>
                    </div>
                  </div>
                  
                  {/* Donut Chart */}
                  <div className="w-[55%] flex items-center justify-center gap-6">
                    <div className="w-[160px] h-[160px] relative flex items-center justify-center shrink-0">
                      {mounted && (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={DONUT_DATA}
                              innerRadius={55}
                              outerRadius={75}
                              paddingAngle={2}
                              dataKey="value"
                              stroke="none"
                              startAngle={90}
                              endAngle={-270}
                              isAnimationActive={true}
                            >
                              {DONUT_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      )}
                      {/* Center Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-slate-900 leading-none">99.23%</span>
                        <span className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wider">Success Rate</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 text-[11px] font-semibold w-24">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Successful</span>
                        <span className="text-slate-500 font-medium">99.23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Failed</span>
                        <span className="text-slate-500 font-medium">0.49%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Timeout</span>
                        <span className="text-slate-500 font-medium">0.28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Row Grid */}
            <div className="grid grid-cols-12 gap-6">
              
              {/* API Endpoints */}
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-0 flex flex-col col-span-5">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">API Endpoints (Top 5)</h3>
                </div>
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Endpoint</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Requests (24h)</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Success Rate</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Avg Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {API_ENDPOINTS.map((row) => (
                      <TableRow key={row.endpoint}>
                        <TableCell className="py-3 text-[12px] font-semibold text-slate-900 whitespace-nowrap">{row.endpoint}</TableCell>
                        <TableCell className="py-3 text-[12px] text-slate-600 whitespace-nowrap">{row.requests}</TableCell>
                        <TableCell className="py-3 text-[12px] font-medium text-emerald-600 whitespace-nowrap">{row.successRate}</TableCell>
                        <TableCell className="py-3 text-[12px] text-slate-600 whitespace-nowrap">{row.avgTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 mt-auto border-t border-slate-100 flex items-center justify-center">
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                    View all endpoints <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>

              {/* Recent Errors */}
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-0 flex flex-col col-span-4">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Errors</h3>
                  <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800">View all logs</button>
                </div>
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Time</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Error</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Count</TableHead>
                      <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Last Occurred</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RECENT_ERRORS.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-3 text-[12px] text-slate-600">{row.time}</TableCell>
                        <TableCell className="py-3 text-[12px] font-semibold text-slate-900 flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${row.color}`}></span>
                          {row.error}
                        </TableCell>
                        <TableCell className="py-3 text-[12px] font-medium text-slate-900">{row.count}</TableCell>
                        <TableCell className="py-3 text-[12px] text-slate-500">{row.lastOccurred}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="p-4 mt-auto border-t border-slate-100 flex items-center justify-center">
                  <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                    View all errors <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>

              {/* Connector Information */}
              <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5 flex flex-col col-span-3">
                <h3 className="text-sm font-bold text-slate-900 mb-6">Connector Information</h3>
                <div className="flex flex-col gap-4">
                  {CONNECTOR_INFO.map((info) => (
                    <div key={info.label} className="flex justify-between items-start gap-4 text-[12px] leading-snug">
                      <div className="font-semibold text-slate-500 shrink-0">{info.label}</div>
                      <div className="font-medium text-slate-900 text-right">{info.value}</div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
    </div>
  );
}
