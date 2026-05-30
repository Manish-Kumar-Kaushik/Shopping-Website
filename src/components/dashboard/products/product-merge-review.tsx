"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Info,
  X,
  HelpCircle,
  Merge,
  ExternalLink,
  Type,
  Tag,
  Box,
  FolderTree,
  Barcode,
  Image as ImageIcon,
  ShoppingCart,
  DollarSign,
  Star,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ─────────────────────────────────────────────────────────────
// COMPONENT HELPERS
// ─────────────────────────────────────────────────────────────
function RadialScore({ score, label, sublabel }: { score: number; label: string; sublabel: string }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const r = 58;
  const size = 160;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  const scoreArcLength = mounted ? circ * (score / 100) : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="#22C55E"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${scoreArcLength} ${circ}`}
            style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
          <span className="text-[40px] font-black text-slate-800 leading-none tracking-tight">{score}%</span>
          <span className="text-xs text-green-600 font-bold mt-1">{sublabel}</span>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  label,
  title,
  brand,
  model,
  canonicalId,
  status,
  created,
  lastUpdated,
}: {
  label: string;
  title: string;
  brand: string;
  model: string;
  canonicalId: string;
  status: string;
  created: string;
  lastUpdated: string;
}) {
  return (
    <Card className="flex-1 p-6 bg-white border border-slate-200 rounded-xl shadow-sm relative overflow-hidden flex flex-col">
      <div className="absolute top-4 left-4">
        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 font-bold rounded-md px-2.5 py-0.5 text-[10px]">
          {label}
        </Badge>
      </div>
      
      <div className="flex gap-6 mt-6 flex-1">
        <div className="w-[120px] shrink-0">
          <div className="w-full aspect-square rounded-lg flex items-center justify-center p-2">
            <img src="/images/sony_headphones.png" alt="Product" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <h2 className="text-sm font-bold text-slate-900 leading-snug mb-3 pr-4">{title}</h2>
          
          <div className="grid grid-cols-[80px_1fr] gap-y-2 mb-4">
            <span className="text-xs font-semibold text-slate-500">Brand</span>
            <span className="text-xs font-semibold text-slate-800">{brand}</span>
            <span className="text-xs font-semibold text-slate-500">Model</span>
            <span className="text-xs font-semibold text-slate-800">{model}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline" className="bg-indigo-50/50 text-indigo-700 border-indigo-200 px-3 py-1 font-mono text-[11px] gap-2 rounded-md">
              Canonical ID: <span className="font-bold">{canonicalId}</span>
              <Copy className="w-3.5 h-3.5 text-indigo-400 cursor-pointer hover:text-indigo-600" />
            </Badge>
          </div>

          <div className="mt-auto grid grid-cols-[90px_1fr] gap-y-2.5">
            <span className="text-[11px] font-semibold text-slate-500">Status:</span>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-transparent text-[10px] font-bold px-2 py-0">
                {status}
              </Badge>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">Created:</span>
            <span className="text-[11px] font-bold text-slate-800">{created}</span>
            <span className="text-[11px] font-semibold text-slate-500">Last Updated:</span>
            <span className="text-[11px] font-bold text-slate-800">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function ProductMergeReview() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-slate-50 pb-28 min-w-[1200px] flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      
      {/* ══ HEADER ══ */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div>
          <nav className="flex items-center text-xs text-slate-500 mb-2 font-medium">
            <span className="hover:text-slate-700 cursor-pointer">Products</span>
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-300" />
            <span className="hover:text-slate-700 cursor-pointer">Product Merge Review</span>
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-slate-300" />
            <span className="text-slate-900">Review Merge</span>
          </nav>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Product Merge Review</h1>
              <p className="text-[13px] text-slate-500 mt-1 font-medium">
                Review and confirm whether these products should be merged into a single canonical product.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 text-xs font-bold text-slate-700 border-slate-200 shadow-sm rounded-lg" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Merge List
          </Button>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-6">
        
        {/* ══ TOP ROW: PRODUCTS & SIMILARITY ══ */}
        <div className="flex gap-6 h-[340px]">
          <ProductCard
            label="Product A"
            title="Sony WH-1000XM5 Wireless Noise Canceling Headphones"
            brand="Sony"
            model="WH-1000XM5"
            canonicalId="PROD-8J72K9"
            status="Active"
            created="May 10, 2024"
            lastUpdated="2 hours ago"
          />

          <Card className="w-[300px] shrink-0 p-6 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-[15px] font-bold text-slate-900 mb-6 tracking-tight">Overall Similarity</h3>
            
            <RadialScore score={92} label="92%" sublabel="High Match" />

            <div className="mt-8 w-full flex flex-col gap-3 px-2">
              {[
                { text: "Strong match" },
                { text: "Likely same product" },
                { text: "Safe to merge" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500/80" />
                    <span className="text-[12px] font-semibold text-slate-600">{item.text}</span>
                  </div>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                </div>
              ))}
            </div>
          </Card>

          <ProductCard
            label="Product B"
            title="Sony WH1000XM5 Over-Ear Wireless Headphones (Black)"
            brand="Sony"
            model="WH-1000XM5"
            canonicalId="PROD-KL91M2"
            status="Active"
            created="May 12, 2024"
            lastUpdated="3 hours ago"
          />
        </div>

        {/* ══ MIDDLE ROW: SIGNALS & IDENTIFIERS ══ */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Matching Signals */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 mb-5">Matching Signals</h3>
            
            <div className="flex-1 flex flex-col gap-0.5">
              {[
                { icon: Type, label: "Title Similarity", val: "94%", badge: "Very High", bColor: "bg-green-100 text-green-700" },
                { icon: Tag, label: "Brand", val: "Sony", badge: "Exact Match", bColor: "bg-green-100 text-green-700" },
                { icon: Box, label: "Model", val: "WH-1000XM5", badge: "Exact Match", bColor: "bg-green-100 text-green-700" },
                { icon: FolderTree, label: "Category", val: "Electronics > Headphones", badge: "Exact Match", bColor: "bg-green-100 text-green-700" },
                { icon: Barcode, label: "UPC", val: "027242915872", badge: "Exact Match", bColor: "bg-green-100 text-green-700" },
                { icon: Barcode, label: "GTIN", val: "00027242915872", badge: "Exact Match", bColor: "bg-green-100 text-green-700" },
                { icon: ImageIcon, label: "Images Similarity", val: "96%", badge: "Very High", bColor: "bg-green-100 text-green-700" },
                { icon: ShoppingCart, label: "Retailer Overlap", val: "5 / 5", badge: "Very High", bColor: "bg-green-100 text-green-700" },
                { icon: DollarSign, label: "Price Similarity", val: "$349.99 vs $349.00", badge: "High", bColor: "bg-green-50 text-green-600 border-green-100" },
                { icon: Star, label: "Reviews Overlap", val: "87%", badge: "High", bColor: "bg-green-50 text-green-600 border-green-100" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-md px-2 -mx-2 transition-colors">
                  <div className="flex items-center gap-2.5 w-[35%]">
                    <item.icon className="w-4 h-4 text-slate-500" />
                    <span className="text-[12px] font-semibold text-slate-700">{item.label}</span>
                  </div>
                  <div className="w-[45%] text-[12px] font-bold text-slate-900 truncate pr-4">
                    {item.val}
                  </div>
                  <div className="w-[20%] text-right">
                    <Badge variant="outline" className={cn("text-[10px] font-bold px-2 py-0 border-transparent rounded", item.bColor)}>
                      {item.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 py-2 hover:bg-indigo-50 rounded-lg transition-colors">
              View detailed match analysis <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </Card>

          {/* Identifier Comparison */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-sm p-0 overflow-hidden flex flex-col">
            <div className="p-6 pb-4">
              <h3 className="text-sm font-bold text-slate-900">Identifier Comparison</h3>
            </div>
            <Table>
              <TableHeader className="bg-transparent">
                <TableRow className="hover:bg-transparent border-slate-100 border-y">
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10 px-6">Identifier Type</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Product A</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10">Product B</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase h-10 text-right px-6">Match</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { type: "UPC", a: "027242915872", b: "027242915872" },
                  { type: "GTIN", a: "00027242915872", b: "00027242915872" },
                  { type: "ASIN (Amazon)", a: "B09XS7JWHH", b: "B09XS7JWHH" },
                  { type: "Walmart Item ID", a: "955744846", b: "955744846" },
                  { type: "Best Buy SKU", a: "6495300", b: "6495300" },
                  { type: "Target Product ID", a: "82447890", b: "82447890" },
                  { type: "eBay Item ID", a: "304566220317", b: "304566220317" },
                  { type: "MPN", a: "WH1000XM5/B", b: "WH1000XM5/B" },
                ].map((row, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/80 border-slate-100">
                    <TableCell className="text-[12px] font-semibold text-slate-700 py-3.5 px-6">{row.type}</TableCell>
                    <TableCell className="text-[12px] font-mono font-bold text-slate-900 py-3.5">{row.a}</TableCell>
                    <TableCell className="text-[12px] font-mono font-bold text-slate-900 py-3.5">{row.b}</TableCell>
                    <TableCell className="py-3.5 text-right px-6">
                      <div className="flex justify-end">
                        <div className="w-5 h-5 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* ══ BOTTOM ROW: OVERLAP & DIFFERENCES ══ */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Retailer Overlap */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 mb-5">Retailer Overlap (5 / 5)</h3>
            <div className="grid grid-cols-5 gap-3 h-full">
              {[
                { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", label: "ASIN Match" },
                { name: "Best Buy", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Best_Buy_Logo.svg", label: "SKU Match" },
                { name: "Walmart", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg", label: "Item ID Match" },
                { name: "Target", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg", label: "Product ID Match" },
                { name: "eBay", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg", label: "Item ID Match" },
              ].map((store, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-3 bg-white shadow-sm h-full">
                  <div className="h-6 flex items-center justify-center opacity-90 grayscale hover:grayscale-0 transition-all cursor-pointer">
                    <img src={store.logo} alt={store.name} className="max-h-full max-w-[60px] object-contain" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 mt-auto">
                    <span className="text-[10px] font-bold text-slate-500 text-center">{store.label}</span>
                    <div className="w-4 h-4 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Key Differences */}
          <Card className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 mb-5">Key Differences</h3>
            <ul className="space-y-3.5 mt-2 flex-1">
              {[
                "Title wording is slightly different",
                "One product has color in title, the other does not",
                "Descriptions have minor formatting differences",
                "No meaningful data differences detected",
              ].map((diff, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0 mt-1.5" />
                  <span className="text-xs font-semibold text-slate-700 leading-relaxed">{diff}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

      </div>

      {/* ══ FOOTER STICKY ACTION BAR ══ */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 p-5 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-bold text-slate-900">Recommendation:</span>
          <span className="text-sm font-bold text-green-600">Merge these products</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-5 text-xs font-bold text-slate-700 border-slate-200 shadow-sm rounded-lg hover:bg-slate-50">
            <HelpCircle className="w-4 h-4 mr-2 text-slate-400" /> Request More Evidence
          </Button>
          <Button variant="outline" className="h-10 px-5 text-xs font-bold text-slate-700 border-slate-200 shadow-sm rounded-lg hover:bg-slate-50">
            <X className="w-4 h-4 mr-2 text-slate-400" /> Keep Separate
          </Button>
          <Button className="h-10 px-6 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm rounded-lg">
            <Merge className="w-4 h-4 mr-2" /> Merge Products
          </Button>
        </div>
      </div>
      
    </div>
  );
}
