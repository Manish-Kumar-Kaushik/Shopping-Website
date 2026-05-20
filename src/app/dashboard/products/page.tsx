"use client"

import { Download, FileUp, Merge, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Product = {
  id: string
  image: string
  name: string
  brand: string
  category: string
  verdict: string
  buyScore: number
  confidence: string
  retailers: string[]
  bestPrice: number
  reviewTrust: string
  status: string
  lastUpdated: string
}

const products: Product[] = [
  {
    id: "1",
    image: "🎧",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Electronics > Headphones",
    verdict: "Wait",
    buyScore: 76,
    confidence: "High",
    retailers: ["amazon", "bestbuy", "walmart"],
    bestPrice: 299,
    reviewTrust: "High",
    status: "Active",
    lastUpdated: "2h ago",
  },
  {
    id: "2",
    image: "🎵",
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "Electronics > Audio",
    verdict: "Buy",
    buyScore: 88,
    confidence: "High",
    retailers: ["amazon", "bestbuy", "target"],
    bestPrice: 189,
    reviewTrust: "High",
    status: "Active",
    lastUpdated: "3h ago",
  },
  {
    id: "3",
    image: "🍳",
    name: "Ninja Air Fryer XL",
    brand: "Ninja",
    category: "Home & Kitchen > Small Appliances",
    verdict: "Buy",
    buyScore: 82,
    confidence: "High",
    retailers: ["amazon", "target", "walmart"],
    bestPrice: 129,
    reviewTrust: "Medium",
    status: "Active",
    lastUpdated: "5h ago",
  },
  {
    id: "4",
    image: "💧",
    name: "CeraVe Moisturizing Cream",
    brand: "CeraVe",
    category: "Health & Beauty > Skincare",
    verdict: "Buy",
    buyScore: 84,
    confidence: "High",
    retailers: ["amazon", "target", "walmart"],
    bestPrice: 15.49,
    reviewTrust: "High",
    status: "Active",
    lastUpdated: "6h ago",
  },
  {
    id: "5",
    image: "🎧",
    name: "Bose QuietComfort Ultra Headphones",
    brand: "Bose",
    category: "Electronics > Headphones",
    verdict: "Wait",
    buyScore: 73,
    confidence: "Medium",
    retailers: ["amazon", "bestbuy"],
    bestPrice: 379,
    reviewTrust: "High",
    status: "Needs Review",
    lastUpdated: "1d ago",
  },
  {
    id: "6",
    image: "💊",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    category: "Health & Beauty > Skincare",
    verdict: "Better Alternative",
    buyScore: 61,
    confidence: "Medium",
    retailers: ["amazon", "target"],
    bestPrice: 6.7,
    reviewTrust: "Medium",
    status: "Active",
    lastUpdated: "1d ago",
  },
  {
    id: "7",
    image: "💻",
    name: "Apple iPad (10th Gen, 64GB)",
    brand: "Apple",
    category: "Electronics > Tablets",
    verdict: "Avoid",
    buyScore: 45,
    confidence: "High",
    retailers: ["amazon", "bestbuy", "walmart"],
    bestPrice: 329,
    reviewTrust: "Low",
    status: "Needs Review",
    lastUpdated: "2d ago",
  },
  {
    id: "8",
    image: "🤖",
    name: "iRobot Roomba j7+",
    brand: "iRobot",
    category: "Home & Kitchen > Vacuum Cleaners",
    verdict: "Wait",
    buyScore: 69,
    confidence: "Medium",
    retailers: ["amazon", "bestbuy"],
    bestPrice: 599,
    reviewTrust: "Medium",
    status: "Draft",
    lastUpdated: "3d ago",
  },
]

const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "Buy":
      return "bg-emerald-50 text-emerald-700 border-emerald-100"
    case "Wait":
      return "bg-amber-50 text-amber-700 border-amber-100"
    case "Avoid":
      return "bg-red-50 text-red-700 border-red-100"
    case "Better Alternative":
      return "bg-purple-50 text-purple-700 border-purple-100"
    default:
      return "bg-gray-50 text-gray-700 border-gray-100"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700"
    case "Needs Review":
      return "bg-amber-50 text-amber-700"
    case "Draft":
      return "bg-blue-50 text-blue-700"
    default:
      return "bg-gray-50 text-gray-700"
  }
}

const RetailerIcon = ({ retailer }: { retailer: string }) => {
  const iconMap: { [key: string]: string } = {
    amazon: "🟠",
    bestbuy: "🔵",
    target: "🔴",
    walmart: "🟡",
  }
  return <span className="text-lg">{iconMap[retailer] || "🔘"}</span>
}

export default function ProductsPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage canonical products, retailer mappings, scores, and review status.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="h-10 rounded-lg bg-blue-600 px-4 text-white hover:bg-blue-700">
            <Plus className="mr-2 size-4" />
            Add Product Manually
          </Button>
          <Button variant="outline" className="h-10 rounded-lg border-slate-300 bg-white px-4 text-slate-600 shadow-none">
            <FileUp className="mr-2 size-4" />
            Import Products
          </Button>
          <Button variant="outline" className="h-10 rounded-lg border-slate-300 bg-white px-4 text-slate-600 shadow-none">
            <Merge className="mr-2 size-4" />
            Merge Duplicates
          </Button>
          <Button variant="outline" className="h-10 rounded-lg border-slate-300 bg-white px-4 text-slate-600 shadow-none">
            <Download className="mr-2 size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-4">
          <div className="space-y-4">
            <div className="flex w-full gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search product name, brand, model, UPC, GTIN, ASIN, SKU..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {["Category", "Retailer", "Verdict", "AI Buy Score", "Match Confidence", "Status", "Has Affiliate Link", "Has Price History", "Needs Review"].map((filter) => (
                <button
                  key={filter}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                >
                  {filter}
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              ))}
              <button className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="pl-6 w-48 min-w-48">Product</TableHead>
                  <TableHead className="w-24 min-w-24">Brand</TableHead>
                  <TableHead className="w-40 min-w-40">Category</TableHead>
                  <TableHead className="w-32 min-w-32">AI Verdict</TableHead>
                  <TableHead className="w-24 min-w-24 text-center">AI Buy Score</TableHead>
                  <TableHead className="w-24 min-w-24">Confidence</TableHead>
                  <TableHead className="w-32 min-w-32">Retailer Mappings</TableHead>
                  <TableHead className="w-28 min-w-28">Best Price</TableHead>
                  <TableHead className="w-24 min-w-24">Review Trust</TableHead>
                  <TableHead className="w-24 min-w-24">Status</TableHead>
                  <TableHead className="w-20 min-w-20">Last Updated</TableHead>
                  <TableHead className="pr-6 w-40 min-w-40">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-slate-200">
                    <TableCell className="pl-6 w-48 min-w-48">
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-lg shrink-0">{product.image}</div>
                        <span className="font-medium text-slate-900 truncate">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-24 min-w-24 text-slate-700 whitespace-nowrap">{product.brand}</TableCell>
                    <TableCell className="w-40 min-w-40 text-slate-600 whitespace-nowrap">{product.category}</TableCell>
                    <TableCell className="w-32 min-w-32">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
                          getVerdictColor(product.verdict),
                        )}
                      >
                        {product.verdict}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-24 min-w-24 text-center font-semibold text-slate-900 whitespace-nowrap">{product.buyScore}</TableCell>
                    <TableCell className="w-24 min-w-24">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
                          product.confidence === "High"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-amber-100 bg-amber-50 text-amber-700",
                        )}
                      >
                        {product.confidence}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-32 min-w-32">
                      <div className="flex gap-1 whitespace-nowrap">
                        {product.retailers.map((retailer) => (
                          <RetailerIcon key={retailer} retailer={retailer} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="w-28 min-w-28 font-medium text-slate-900 whitespace-nowrap">${product.bestPrice.toFixed(2)}</TableCell>
                    <TableCell className="w-24 min-w-24">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
                          product.reviewTrust === "High"
                            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                            : "border-amber-100 bg-amber-50 text-amber-700",
                        )}
                      >
                        {product.reviewTrust}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-24 min-w-24">
                      <Badge
                        className={cn(
                          "border px-2.5 py-1 text-xs font-semibold whitespace-nowrap",
                          getStatusColor(product.status),
                        )}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="w-20 min-w-20 text-slate-500 whitespace-nowrap">{product.lastUpdated}</TableCell>
                    <TableCell className="pr-6 w-40 min-w-40">
                      <div className="flex items-center gap-1 whitespace-nowrap justify-end">
                        <button className="text-blue-600 hover:underline text-sm font-medium">View</button>
                        <span className="text-slate-300">|</span>
                        <button className="text-blue-600 hover:underline text-sm font-medium">Audit</button>
                        <span className="text-slate-300">|</span>
                        <button className="text-blue-600 hover:underline text-sm font-medium">Edit</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <div className="text-sm text-slate-500">Showing 1-8 of 248 products</div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={cn(
                    "inline-flex items-center justify-center h-8 w-8 rounded-lg border text-sm font-medium",
                    page === 1
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="text-sm text-slate-500">...</span>
              <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium text-sm">
                31
              </button>
              <button className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
                </svg>
              </button>
              <select className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <option>10 / page</option>
                <option>20 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
