"use client";

import React from "react";
import Link from "next/link";
import {
  Copy,
  RefreshCw,
  Sparkles,
  Send,
  Ban,
  Edit,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Store,
  Check,
  Target,
  Info,
  ChevronDown
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ProductView() {
  const tabs = [
    "Overview",
    "Mappings",
    "Offers",
    "Scores",
    "Reviews",
    "AI Verdict",
    "Alternatives",
    "Sources",
    "History",
    "Admin Notes",
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      {/* Top Breadcrumb & Actions */}
      <div className="px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 shrink-0">
        <div className="text-sm text-slate-500 flex items-center flex-wrap gap-2">
          <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Admin</Link>
          <span>/</span>
          <Link href="/dashboard/products" className="hover:text-slate-900 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Sony WH-1000XM5</span>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <Button variant="outline" className="h-9 text-slate-700 bg-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Product
          </Button>
          <Button variant="outline" className="h-9 text-slate-700 bg-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Run AI Re-score
          </Button>
          <Button variant="outline" className="h-9 text-slate-700 bg-white">
            <Send className="w-4 h-4 mr-2" />
            Send to Review
          </Button>
          <Button variant="outline" className="h-9 text-red-600 hover:text-red-700 hover:bg-red-50 bg-white border-red-200">
            <Ban className="w-4 h-4 mr-2" />
            Disable Product
          </Button>
          <Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Main Container */}
      <div className="px-6 pb-6 flex flex-col gap-6">
        {/* Header Card */}
        <Card className="p-6">
          <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
            <div className="flex flex-col sm:flex-row gap-6 w-full xl:w-auto">
              <div className="w-full sm:w-40 h-48 sm:h-40 rounded-lg border border-slate-200 p-2 bg-white flex items-center justify-center shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&q=80"
                  alt="Sony WH-1000XM5"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-950">Sony WH-1000XM5 Wireless Headphones</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 mt-6">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Brand</div>
                    <div className="font-medium text-slate-950">Sony</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Model</div>
                    <div className="font-medium text-slate-950">WH-1000XM5</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Category</div>
                    <div className="font-medium text-slate-950">Electronics &gt; Headphones</div>
                  </div>
                  <div className="col-span-3 pt-2">
                    <div className="text-sm text-slate-500 mb-1">Canonical Product ID</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-950 text-base">PRD-001482</span>
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-100 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white flex flex-row w-full xl:w-[480px] shrink-0">
              {/* Left Column - 2x2 Grid */}
              <div className="flex flex-col flex-1 border-r border-slate-200">
                {/* Top Row */}
                <div className="flex flex-1 border-b border-slate-200">
                  <div className="p-4 flex-1 border-r border-slate-200 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="font-semibold text-green-700 text-sm">Active</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">AI Verdict</div>
                    <div className="flex items-center">
                      <span className="font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 text-xs">Wait</span>
                    </div>
                  </div>
                </div>
                {/* Bottom Row */}
                <div className="flex flex-1">
                  <div className="p-4 flex-1 border-r border-slate-200 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Confidence Score</div>
                    <div className="flex items-center">
                      <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 text-xs">High</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Last Refreshed</div>
                    <div className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700 text-sm">12 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column - Score */}
              <div className="p-6 w-36 sm:w-44 flex flex-col justify-center items-center text-center shrink-0">
                <div className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">AI Buy Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-amber-500 tracking-tight leading-none">76</span>
                  <span className="text-slate-400 font-medium text-sm">/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 sm:gap-8 border-b border-slate-200 mt-8 overflow-x-auto whitespace-nowrap">
            {tabs.map((tab) => {
              const isActive = tab === "Overview";
              const href = tab === "Mappings" ? "/dashboard/products/action/mapping" : "/dashboard/products/action/view";

              return (
                <Link
                  href={href}
                  key={tab}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Row 1: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Product Summary */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <InfoIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Product Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Sony's industry-leading noise canceling headphones with exceptional sound quality, comfort, and smart features. Ideal for frequent travelers, remote workers, and audiophiles seeking premium wireless performance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-green-100 text-green-600 rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                  <div className="text-sm"><span className="font-medium text-slate-900">Category fit:</span> <span className="text-slate-600">Core match for Wireless Headphones</span></div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-green-100 text-green-600 rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                  <div className="text-sm"><span className="font-medium text-slate-900">Market position:</span> <span className="text-slate-600">Premium tier • Top 5 in category</span></div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-green-100 text-green-600 rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                  <div className="text-sm"><span className="font-medium text-slate-900">Review summary:</span> <span className="text-slate-600">4.4★ from 18,742 reviews</span></div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 bg-green-100 text-green-600 rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                  <div className="text-sm"><span className="font-medium text-slate-900">Demand trend:</span> <span className="text-slate-600 inline-flex items-center gap-1">Stable <TrendingUp className="w-3 h-3 text-blue-500" /></span></div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Canonical Identifiers */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <BarcodeIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Canonical Identifiers</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="space-y-4">
                {[
                  { label: "UPC", value: "027242915725" },
                  { label: "GTIN", value: "00027242915725" },
                  { label: "ASIN", value: "B09XS7JWHH" },
                  { label: "Walmart Item ID", value: "419577912" },
                  { label: "Best Buy SKU", value: "6495307" },
                  { label: "Target Product ID", value: "83741678" },
                  { label: "eBay Item ID", value: "295742133469" },
                  { label: "MPN", value: "WH1000XM5/B" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between group gap-2">
                    <span className="text-sm font-medium text-slate-900 truncate shrink-0">{item.label}</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm text-slate-500 font-mono truncate">{item.value}</span>
                      <button className="text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <ImageIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4 flex flex-col gap-4">
              <div className="w-full h-48 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center p-4">
                <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80" alt="Main" className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <div className="w-14 h-14 rounded border-2 border-blue-500 p-1 shrink-0 bg-white">
                  <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                </div>
                <div className="w-14 h-14 rounded border border-slate-200 p-1 shrink-0 bg-white hover:border-slate-300 transition-colors">
                  <div className="w-full h-full bg-slate-800 rounded-sm" />
                </div>
                <div className="w-14 h-14 rounded border border-slate-200 p-1 shrink-0 bg-white hover:border-slate-300 transition-colors">
                  <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80" className="w-full h-full object-contain mix-blend-multiply scale-x-[-1]" alt="thumb" />
                </div>
                <div className="w-14 h-14 rounded border border-slate-200 p-1 shrink-0 bg-white hover:border-slate-300 transition-colors">
                  <div className="w-full h-full bg-slate-100 rounded-sm flex items-center justify-center">
                    <span className="text-xs font-medium text-slate-500">+3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Path */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <FoldersIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Category Path</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4 flex flex-col items-center justify-center min-h-[220px]">
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm font-medium text-slate-600">Electronics</div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
                <div className="text-sm font-medium text-slate-600">Audio</div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
                <div className="text-sm font-medium text-slate-600">Headphones</div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
                <div className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-md border border-blue-100 mt-1">
                  Wireless Headphones
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Current Best Offer */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <TagIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Current Best Offer</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-6">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Best Retailer</div>
                  <div className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                    <span className="text-amber-500">amazon</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Price</div>
                  <div className="text-2xl font-bold text-slate-900">$299<span className="text-sm text-slate-500 align-super">00</span></div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-1">Stock</div>
                  <div className="text-sm font-semibold text-green-600">In Stock</div>
                  <div className="text-xs text-slate-500 mt-1">Shipping <span className="text-green-600 font-medium">FREE</span></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs text-slate-500 font-medium mb-3">Other Retailers</div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-blue-600 mb-1">Best Buy</div>
                    <div className="text-sm font-medium text-slate-900">$299.99</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-blue-500 mb-1">Walmart</div>
                    <div className="text-sm font-medium text-slate-900">$329.00</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-red-600 mb-1">Target</div>
                    <div className="text-sm font-medium text-slate-900">$329.99</div>
                  </div>
                  <div className="text-center">
                    <button className="text-sm font-medium text-blue-600 hover:underline">View all (12)</button>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium mb-2">Price vs 30-day average</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-green-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-semibold">$21.00 <span className="font-normal">(6.5% lower)</span></span>
                  </div>
                  <div className="w-24 h-8 bg-blue-50/50 rounded flex items-center justify-center">
                    {/* Placeholder for trend chart */}
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-blue-500 stroke-2 fill-none stroke-[1.5px]">
                      <path d="M0,25 L10,20 L20,28 L30,15 L40,22 L50,10 L60,18 L70,5 L80,12 L90,8 L100,2" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Verdict Summary */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <BrainIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">AI Verdict Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4 flex flex-col h-[calc(100%-53px)]">
              <div className="flex gap-4 mb-6">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-2">Verdict</div>
                  <Badge className="bg-amber-50 text-amber-600 border border-amber-200 text-lg px-4 py-1 font-semibold hover:bg-amber-50 shadow-none">Wait</Badge>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900 mb-1">Why Wait?</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Current price is above the recent 30-day average. There may be better value alternatives available.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-between items-start py-4 border-y border-slate-100 mb-4">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium mb-1 tracking-wide">Price vs 30-day avg</div>
                  <div className="text-sm font-semibold text-red-500">+6.5% higher</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium mb-1 tracking-wide">Recent low</div>
                  <div className="text-sm font-semibold text-slate-900">$278.00</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-medium mb-1 tracking-wide">Potential savings</div>
                  <div className="text-sm font-semibold text-green-600">-$21.00</div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-xs font-semibold text-slate-900 mb-1">Recommended action</div>
                <p className="text-xs text-slate-600">Monitor price and alternatives. Re-evaluate in 3-5 days.</p>
              </div>
            </CardContent>
          </Card>

          {/* Score Snapshot */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center gap-2 px-5 py-4">
              <ActivityIcon className="w-4 h-4 text-slate-500" />
              <CardTitle className="text-sm font-semibold">Score Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="space-y-4">
                <ScoreRow label="AI Buy Score" score={76} color="bg-amber-500" valueColor="text-amber-600" />
                <ScoreRow label="Value Score" score={72} color="bg-amber-500" valueColor="text-amber-600" />
                <ScoreRow label="Quality Score" score={85} color="bg-green-500" valueColor="text-green-600" />
                <ScoreRow label="Review Trust" score={88} color="bg-green-500" valueColor="text-green-600" />
                <ScoreRow label="Price Score" score={63} color="bg-amber-500" valueColor="text-amber-600" />
                
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                  <span className="text-sm font-medium text-slate-700">Confidence</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 shadow-none">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2">
                <EditIcon className="w-4 h-4 text-slate-500" />
                <CardTitle className="text-sm font-semibold">Admin Notes</CardTitle>
              </div>
              <button className="text-xs font-medium text-blue-600 hover:underline">Add Note</button>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">Internal Note</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-1">
                    Launch week pricing still elevated. Keep monitoring for holiday promo windows.
                  </p>
                  <div className="text-[10px] text-slate-400">— Admin, May 13, 2026 • 10:42 AM</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">Reviewer Comment</div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">JR</div>
                    <div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-1">
                        Excellent noise canceling and call quality. Battery life is outstanding.
                      </p>
                      <div className="text-[10px] text-slate-400">— James R., May 14, 2026 • 9:15 AM</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-3">Status Timeline</div>
                  <div className="relative border-l border-slate-200 ml-2 space-y-4">
                    <div className="relative ml-4">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white"></span>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900">Active</h3>
                        <p className="text-[10px] text-slate-500">May 10, 2026 • 8:24 AM</p>
                      </div>
                    </div>
                    <div className="relative ml-4">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white"></span>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900">Created</h3>
                        <p className="text-[10px] text-slate-500">May 10, 2026 • 8:20 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Icon Components for headers
const InfoIcon = (props: any) => <Info {...props} />;
const BarcodeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 5v14"/><path d="M8 5v14"/><path d="M12 5v14"/><path d="M17 5v14"/><path d="M21 5v14"/></svg>
);
const ImageIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);
const FoldersIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
);
const TagIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>;
const BrainIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4 4.5 4.5 0 0 1-3-4"/></svg>;
const ActivityIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const EditIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;


// Score Row Component
const ScoreRow = ({ label, score, color, valueColor }: { label: string, score: number, color: string, valueColor: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-700 font-medium w-28 shrink-0">{label}</span>
    <div className="flex-1 mx-3 h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${score}%` }} />
    </div>
    <div className="w-12 text-right">
      <span className={`font-bold ${valueColor}`}>{score}</span>
      <span className="text-slate-400 text-xs">/100</span>
    </div>
  </div>
);
