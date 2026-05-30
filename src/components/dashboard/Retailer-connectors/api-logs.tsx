"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  FileText, 
  RefreshCcw, 
  CheckCircle2, 
  XCircle,
  Clock3, 
  Gauge,
  Search,
  Calendar,
  ChevronDown,
  Eye,
  Settings2,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// MOCK DATA
const METRICS = [
  {
    id: "total",
    label: "Total Requests",
    value: "48,623",
    subtext: "",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    id: "success",
    label: "Successful",
    value: "46,023",
    subtext: "(94.7%)",
    subtextColor: "text-slate-500",
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-500"
  },
  {
    id: "failed",
    label: "Failed",
    value: "2,307",
    subtext: "(4.7%)",
    subtextColor: "text-slate-500",
    valueColor: "text-rose-500",
    icon: <XCircle className="w-5 h-5 text-rose-500" />,
    bgColor: "bg-rose-50",
    iconColor: "text-rose-500"
  },
  {
    id: "avg-time",
    label: "Average Response Time",
    value: "512 ms",
    subtext: "",
    icon: <Clock3 className="w-5 h-5 text-purple-500" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    id: "slow",
    label: "Slow Requests (>2s)",
    value: "312",
    subtext: "(0.64%)",
    subtextColor: "text-slate-500",
    icon: <Gauge className="w-5 h-5 text-amber-500" />,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500"
  }
];

const LOGS_DATA = [
  {
    id: "7f3a1c...e9d2",
    time: "May 18, 2024 10:42:31 AM",
    retailer: "Amazon",
    retailerIconColor: "bg-slate-900",
    retailerIconText: "a",
    requestType: "Get Product by ASIN",
    productQuery: "B09XS7JWVN (Sony WH-1000XM5)",
    status: "200 OK",
    statusCode: 200,
    responseTime: "412 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "2ab91d...c4f7",
    time: "May 18, 2024 10:42:28 AM",
    retailer: "Walmart",
    retailerIconColor: "bg-blue-600",
    retailerIconText: "W",
    requestType: "Search Products",
    productQuery: "air fryer ninja",
    status: "200 OK",
    statusCode: 200,
    responseTime: "689 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "c11d7e...a6b3",
    time: "May 18, 2024 10:42:25 AM",
    retailer: "Best Buy",
    retailerIconColor: "bg-yellow-400",
    retailerIconText: "B",
    retailerIconTextColor: "text-slate-900",
    requestType: "Get Product by SKU",
    productQuery: "6495300",
    status: "200 OK",
    statusCode: 200,
    responseTime: "356 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "9e2f1b...d7a1",
    time: "May 18, 2024 10:42:22 AM",
    retailer: "Target",
    retailerIconColor: "bg-red-600 text-white rounded-full",
    retailerIconText: "T",
    requestType: "Get Product by ID",
    productQuery: "82447890",
    status: "200 OK",
    statusCode: 200,
    responseTime: "557 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "ab98f2...b1e4",
    time: "May 18, 2024 10:42:18 AM",
    retailer: "Amazon",
    retailerIconColor: "bg-slate-900",
    retailerIconText: "a",
    requestType: "Get Offers",
    productQuery: "B09XS7JWVN",
    status: "429 Too Many Requests",
    statusCode: 429,
    responseTime: "1,245 ms",
    errorCode: "RateLimitExceeded",
    retryCount: 1
  },
  {
    id: "45ac7d...f3b8",
    time: "May 18, 2024 10:42:15 AM",
    retailer: "Walmart",
    retailerIconColor: "bg-blue-600",
    retailerIconText: "W",
    requestType: "Get Price",
    productQuery: "955744846",
    status: "200 OK",
    statusCode: 200,
    responseTime: "478 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "d2b8c3...f9a0",
    time: "May 18, 2024 10:42:12 AM",
    retailer: "eBay",
    retailerIconColor: "bg-white border border-slate-200",
    retailerIconText: "e",
    retailerIconTextColor: "text-blue-600 font-serif font-black tracking-tighter",
    requestType: "Search Items",
    productQuery: "macbook pro m3",
    status: "500 Internal Server Error",
    statusCode: 500,
    responseTime: "2,153 ms",
    errorCode: "InternalServerError",
    retryCount: 2
  },
  {
    id: "1a9e6f...b2d7",
    time: "May 18, 2024 10:42:08 AM",
    retailer: "Best Buy",
    retailerIconColor: "bg-yellow-400",
    retailerIconText: "B",
    retailerIconTextColor: "text-slate-900",
    requestType: "Get Product by SKU",
    productQuery: "6420946",
    status: "200 OK",
    statusCode: 200,
    responseTime: "321 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "6c77a1...d8e9",
    time: "May 18, 2024 10:42:04 AM",
    retailer: "Amazon",
    retailerIconColor: "bg-slate-900",
    retailerIconText: "a",
    requestType: "Search Products",
    productQuery: "soundbar samsung",
    status: "200 OK",
    statusCode: 200,
    responseTime: "602 ms",
    errorCode: "-",
    retryCount: 0
  },
  {
    id: "ff12e9...a7c1",
    time: "May 18, 2024 10:42:01 AM",
    retailer: "Target",
    retailerIconColor: "bg-red-600 text-white rounded-full",
    retailerIconText: "T",
    requestType: "Get Offers",
    productQuery: "32478459",
    status: "404 Not Found",
    statusCode: 404,
    responseTime: "210 ms",
    errorCode: "ItemNotFound",
    retryCount: 0
  }
];

export default function ApiLogs() {
  const [search, setSearch] = useState("");

  const getStatusBadge = (statusCode: number, statusText: string) => {
    if (statusCode === 200) {
      return (
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold px-2.5 py-0.5 rounded-sm">
          {statusText}
        </Badge>
      );
    } else if (statusCode === 429 || statusCode === 404) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-semibold px-2.5 py-0.5 rounded-sm">
          {statusText}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 font-semibold px-2.5 py-0.5 rounded-sm">
          {statusText}
        </Badge>
      );
    }
  };

  return (
    <div className="w-full h-full bg-slate-50 font-sans p-8 overflow-y-auto">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] font-medium text-slate-500 mb-2">
          <Link href="/dashboard/connectors" className="hover:text-slate-900 transition-colors">Retailer Connectors</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1" />
          <span className="text-slate-900">API Logs</span>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-slate-950 tracking-tight">API Logs</h1>
            <p className="text-sm text-slate-500 mt-1">View and monitor all API requests made to retailer connectors.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <FileText className="w-4 h-4 text-slate-500" />
              Export Logs
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <RefreshCcw className="w-4 h-4 text-slate-500" />
              Refresh
            </button>
            <button className="flex items-center gap-2 h-10 px-4 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
              <XCircle className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Filters Card */}
        <Card className="bg-white border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex flex-col gap-5">
            {/* Top Row Dropdowns */}
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Retailer</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>All Retailers</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Status</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>All Statuses</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Request Type</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>All Types</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Error Code</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>Select error code</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Time Range</label>
                <div className="relative">
                  <div className="w-full flex items-center justify-between h-9 px-3 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 cursor-pointer hover:bg-slate-50">
                    <span>May 17, 2024 - May 18, 2024</span>
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row Filters */}
            <div className="grid grid-cols-5 gap-4 items-end">
              <div className="flex flex-col gap-1.5 col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by product, query, SKU, ASIN..."
                    className="w-full h-9 pl-9 pr-4 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Slow Requests</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>All</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Retry Count</label>
                <div className="relative">
                  <select className="w-full h-9 pl-3 pr-8 appearance-none bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer">
                    <option>All</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 col-span-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase">More Filters</label>
                <button className="w-full h-9 px-4 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
                  <span className="text-lg leading-none mb-0.5">+</span> Add Filter
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-5 gap-4">
          {METRICS.map((metric) => (
            <Card key={metric.id} className="bg-white border-slate-200 rounded-xl shadow-sm p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${metric.bgColor}`}>
                {metric.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-slate-500">{metric.label}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-xl font-bold ${metric.valueColor || "text-slate-900"}`}>{metric.value}</span>
                  {metric.subtext && (
                    <span className={`text-xs font-semibold ${metric.subtextColor || "text-slate-500"}`}>{metric.subtext}</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Table Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 font-medium">
              Showing <span className="font-bold text-slate-900">1 to 20</span> of <span className="font-bold text-slate-900">48,623</span> results
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <Settings2 className="w-4 h-4 text-slate-500" />
                Columns <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button className="flex items-center gap-2 h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                20 per page <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              
              {/* Pagination */}
              <div className="flex items-center gap-1 ml-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-100 font-bold text-sm">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-100 font-bold text-sm">
                  3
                </button>
                <span className="text-slate-400 font-bold mx-1">...</span>
                <button className="w-auto px-2 h-8 flex items-center justify-center rounded-lg border border-transparent text-slate-600 hover:bg-slate-100 font-bold text-sm">
                  2,432
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <Card className="bg-white border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11 cursor-pointer select-none">
                    <div className="flex items-center gap-1">
                      Time
                      <div className="flex flex-col">
                        <ChevronDown className="w-2.5 h-2.5 rotate-180 -mb-1 text-slate-300" />
                        <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
                      </div>
                    </div>
                  </TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Retailer</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Request Type</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Product / Query</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Status</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Response Time</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Error Code</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Retry Count</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11">Trace ID</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-11 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LOGS_DATA.map((row, idx) => (
                  <TableRow key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-4 text-[13px] font-semibold text-slate-900 whitespace-nowrap">
                      {row.time}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-xs ${row.retailerIconColor} ${row.retailerIconTextColor || "text-white"}`}>
                          {row.retailerIconText}
                        </div>
                        <span className="text-[13px] font-semibold text-slate-900">{row.retailer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-[13px] font-medium text-slate-900 whitespace-nowrap">
                      {row.requestType}
                    </TableCell>
                    <TableCell className="py-4 text-[13px] text-slate-600 font-medium">
                      {row.productQuery}
                    </TableCell>
                    <TableCell className="py-4 whitespace-nowrap">
                      {getStatusBadge(row.statusCode, row.status)}
                    </TableCell>
                    <TableCell className="py-4 text-[13px] font-semibold text-slate-900">
                      {row.responseTime}
                    </TableCell>
                    <TableCell className="py-4 text-[13px] text-slate-600 font-medium">
                      {row.errorCode}
                    </TableCell>
                    <TableCell className="py-4 text-[13px] text-slate-600 font-medium text-center">
                      {row.retryCount}
                    </TableCell>
                    <TableCell className="py-4 text-[13px] text-slate-500 font-mono">
                      {row.id}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Bottom Bar */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[13px] font-medium text-slate-500">Note: Logs are stored for 90 days</span>
            <button className="flex items-center gap-2 h-9 px-4 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm">
              View Log Details <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
