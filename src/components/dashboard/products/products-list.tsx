"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Plus,
  Upload,
  Link as LinkIcon,
  Download,
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShoppingCart,
  Store,
  Target,
  LayoutGrid,
  List,
  Columns3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// -- MOCK DATA & TYPES --
export type Product = {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  verdict: "Buy" | "Wait" | "Avoid" | "Better Alternative";
  score: number;
  confidence: "High" | "Medium" | "Low";
  retailers: ("Amazon" | "Walmart" | "Target" | "Best Buy")[];
  price: number;
  trust: "High" | "Medium" | "Low";
  status: "Active" | "Needs Review" | "Draft";
  lastUpdated: string;
};

const data: Product[] = [
  {
    id: "1",
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&q=80",
    brand: "Sony",
    category: "Electronics > Headphones",
    verdict: "Wait",
    score: 76,
    confidence: "High",
    retailers: ["Amazon", "Best Buy", "Walmart"],
    price: 299,
    trust: "High",
    status: "Active",
    lastUpdated: "2h ago",
  },
  {
    id: "2",
    name: "Apple AirPods Pro (2nd Gen)",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=100&q=80",
    brand: "Apple",
    category: "Electronics > Audio",
    verdict: "Buy",
    score: 88,
    confidence: "High",
    retailers: ["Amazon", "Best Buy", "Walmart", "Target"],
    price: 189,
    trust: "High",
    status: "Active",
    lastUpdated: "3h ago",
  },
  {
    id: "3",
    name: "Ninja Air Fryer XL",
    image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=100&q=80",
    brand: "Ninja",
    category: "Home & Kitchen > Small Appliances",
    verdict: "Buy",
    score: 82,
    confidence: "High",
    retailers: ["Amazon", "Walmart", "Target"],
    price: 129,
    trust: "Medium",
    status: "Active",
    lastUpdated: "5h ago",
  },
  {
    id: "4",
    name: "CeraVe Moisturizing Cream",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=100&q=80",
    brand: "CeraVe",
    category: "Health & Beauty > Skincare",
    verdict: "Buy",
    score: 84,
    confidence: "High",
    retailers: ["Amazon", "Walmart", "Target"],
    price: 15.49,
    trust: "High",
    status: "Active",
    lastUpdated: "6h ago",
  },
  {
    id: "5",
    name: "Bose QuietComfort Ultra Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&q=80",
    brand: "Bose",
    category: "Electronics > Headphones",
    verdict: "Wait",
    score: 73,
    confidence: "Medium",
    retailers: ["Amazon", "Best Buy"],
    price: 379,
    trust: "High",
    status: "Needs Review",
    lastUpdated: "1d ago",
  },
  {
    id: "6",
    name: "The Ordinary Niacinamide 10% + Zinc 1%",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&q=80",
    brand: "The Ordinary",
    category: "Health & Beauty > Skincare",
    verdict: "Better Alternative",
    score: 61,
    confidence: "Medium",
    retailers: ["Amazon", "Walmart"],
    price: 6.7,
    trust: "Medium",
    status: "Active",
    lastUpdated: "1d ago",
  },
  {
    id: "7",
    name: "Apple iPad (10th Gen, 64GB)",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&q=80",
    brand: "Apple",
    category: "Electronics > Tablets",
    verdict: "Avoid",
    score: 45,
    confidence: "High",
    retailers: ["Amazon", "Best Buy", "Walmart"],
    price: 329,
    trust: "Low",
    status: "Needs Review",
    lastUpdated: "2d ago",
  },
  {
    id: "8",
    name: "iRobot Roomba j7+",
    image: "https://images.unsplash.com/photo-1589802772590-7f2a1b920406?w=100&q=80",
    brand: "iRobot",
    category: "Home & Kitchen > Vacuum Cleaners",
    verdict: "Wait",
    score: 69,
    confidence: "Medium",
    retailers: ["Amazon", "Best Buy"],
    price: 599,
    trust: "Medium",
    status: "Draft",
    lastUpdated: "3d ago",
  },
];

// -- HELPER FUNCTIONS --
const getVerdictColor = (verdict: string) => {
  switch (verdict) {
    case "Buy":
      return "bg-green-100 text-green-700 hover:bg-green-100/80";
    case "Wait":
      return "bg-amber-100 text-amber-700 hover:bg-amber-100/80";
    case "Avoid":
      return "bg-red-100 text-red-700 hover:bg-red-100/80";
    case "Better Alternative":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100/80";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600 border border-emerald-200";
    case "Needs Review":
      return "bg-orange-50 text-orange-600 border border-orange-200";
    case "Draft":
      return "bg-slate-50 text-slate-600 border border-slate-200";
    default:
      return "bg-slate-50 text-slate-600 border border-slate-200";
  }
};

const getConfidenceTrustColor = (level: string) => {
  switch (level) {
    case "High":
      return "bg-green-50 text-green-600 border border-green-200";
    case "Medium":
      return "bg-blue-50 text-blue-600 border border-blue-200";
    case "Low":
      return "bg-red-50 text-red-600 border border-red-200";
    default:
      return "bg-slate-50 text-slate-600";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 65) return "text-amber-500";
  return "text-red-500";
};

const RetailerIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Amazon":
      return <div className="w-6 h-6 rounded-md bg-[#FF9900]/10 flex items-center justify-center text-[#FF9900]" title="Amazon"><ShoppingCart className="w-3.5 h-3.5" /></div>;
    case "Walmart":
      return <div className="w-6 h-6 rounded-md bg-[#0071CE]/10 flex items-center justify-center text-[#0071CE]" title="Walmart"><Store className="w-3.5 h-3.5" /></div>;
    case "Target":
      return <div className="w-6 h-6 rounded-md bg-[#CC0000]/10 flex items-center justify-center text-[#CC0000]" title="Target"><Target className="w-3.5 h-3.5" /></div>;
    case "Best Buy":
      return <div className="w-6 h-6 rounded-md bg-[#0046BE]/10 flex items-center justify-center text-[#0046BE]" title="Best Buy"><ShoppingCart className="w-3.5 h-3.5" /></div>;
    default:
      return <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500" title={name}><Store className="w-3.5 h-3.5" /></div>;
  }
};

// -- COLUMN DEFINITIONS --
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Product
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3 w-[250px]">
        <div className="h-10 w-10 rounded-md border border-slate-200 overflow-hidden bg-white shrink-0 flex items-center justify-center">
          {/* Using a generic icon if image fails, but using provided unsplash URL */}
          <img src={row.original.image} alt={row.original.name} className="h-full w-full object-cover" />
        </div>
        <span className="font-medium text-slate-900 truncate">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Brand
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-slate-600">{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Category
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      const parts = category.split(" > ");
      return (
        <div className="flex flex-col text-xs">
          <span className="text-slate-500">{parts[0]} &gt;</span>
          <span className="text-slate-900 font-medium">{parts[1] || ""}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "verdict",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          AI Verdict
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const verdict = row.getValue("verdict") as string;
      return (
        <Badge className={`font-medium border-0 shadow-none ${getVerdictColor(verdict)}`}>
          {verdict}
        </Badge>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          AI Buy Score
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const score = row.getValue("score") as number;
      return <div className={`font-bold text-base ${getScoreColor(score)}`}>{score}</div>;
    },
  },
  {
    accessorKey: "confidence",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Confidence
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const confidence = row.getValue("confidence") as string;
      return (
        <Badge variant="outline" className={`font-medium ${getConfidenceTrustColor(confidence)}`}>
          {confidence}
        </Badge>
      );
    },
  },
  {
    accessorKey: "retailers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Retailer Mappings
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const retailers = row.getValue("retailers") as string[];
      return (
        <div className="flex gap-1.5">
          {retailers.map((r) => (
            <RetailerIcon key={r} name={r} />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Current Best Price
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="text-slate-700 font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "trust",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Review Trust
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const trust = row.getValue("trust") as string;
      return (
        <Badge variant="outline" className={`font-medium ${getConfidenceTrustColor(trust)}`}>
          {trust}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Status
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className={`font-medium ${getStatusColor(status)}`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 h-auto font-semibold hover:bg-transparent text-slate-600"
        >
          Last Updated
          <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-slate-500">{row.getValue("lastUpdated")}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard/products/action/view" className="text-blue-600 hover:text-blue-800 font-medium">View</Link>
          <span className="text-slate-300">|</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Audit</button>
          <span className="text-slate-300">|</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
        </div>
      );
    },
  },
];

const FilterDropdown = ({ label }: { label: string }) => (
  <div className="relative inline-block">
    <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-2 pl-3 pr-8 rounded-md text-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px] cursor-pointer">
      <option value="">{label}</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

export default function Products() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header Area */}
      <div className="px-8 py-6 flex flex-col gap-6 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Products</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage canonical products, retailer mappings, scores, and review status.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-medium h-10 px-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Product Manually
            </Button>
            <Button variant="outline" className="h-10 text-slate-700 border-slate-200">
              <Upload className="w-4 h-4 mr-2" />
              Import Products
            </Button>
            <Button variant="outline" className="h-10 text-slate-700 border-slate-200">
              <LinkIcon className="w-4 h-4 mr-2" />
              Merge Duplicates
            </Button>
            <Button variant="outline" className="h-10 text-slate-700 border-slate-200">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product name, brand, model, UPC, GTIN, ASIN, SKU..."
              className="w-full h-10 pl-9 pr-4 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <FilterDropdown label="Category" />
              <FilterDropdown label="Retailer" />
              <FilterDropdown label="Verdict" />
              <FilterDropdown label="AI Buy Score" />
              <FilterDropdown label="Match Confidence" />
              <FilterDropdown label="Status" />
              <FilterDropdown label="Has Affiliate Link" />
              <FilterDropdown label="Has Price History" />
              <FilterDropdown label="Needs Review" />
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 whitespace-nowrap px-3 py-2 rounded-md hover:bg-slate-100 transition-colors">
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 p-8 overflow-hidden flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Table Toolbar */}
          <div className="px-4 py-3 border-b border-slate-200 flex justify-end items-center gap-3">
             <Button variant="outline" size="sm" className="h-8 text-slate-600 flex items-center gap-2 border-slate-200">
               <Columns3 className="w-4 h-4" />
               Columns
               <ChevronDown className="w-3 h-3 ml-1" />
             </Button>
             <div className="flex items-center bg-slate-100 rounded-md p-0.5">
               <button className="p-1.5 rounded bg-white shadow-sm text-blue-600"><List className="w-4 h-4" /></button>
               <button className="p-1.5 rounded text-slate-500 hover:text-slate-700"><LayoutGrid className="w-4 h-4" /></button>
             </div>
             <Button variant="outline" size="icon" className="h-8 w-8 text-slate-600 border-slate-200">
               <Download className="w-4 h-4" />
             </Button>
          </div>

          {/* Actual Table */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-[0_1px_0_0_#e2e8f0]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b-0 hover:bg-transparent">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="py-3 whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-900">1-8</span> of <span className="font-medium text-slate-900">248</span> products
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1 mx-2 text-sm font-medium">
                  <button className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">1</button>
                  <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">2</button>
                  <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">3</button>
                  <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">4</button>
                  <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">5</button>
                  <span className="text-slate-400">...</span>
                  <button className="w-8 h-8 rounded hover:bg-slate-100 text-slate-600 flex items-center justify-center">31</button>
                </div>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select className="appearance-none bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-md text-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer h-8">
                    <option value="10">10 / page</option>
                    <option value="20">20 / page</option>
                    <option value="50">50 / page</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
