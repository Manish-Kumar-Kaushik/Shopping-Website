"use client"

import {
  ArrowUpRight,
  Bell,
  FileWarning,
  Flag,
  LayoutDashboard,
  Link2,
  LucideIcon,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  MessageSquareWarning,
  Sparkles,
} from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

type Metric = {
  label: string
  value: string
  delta: string
  deltaTone: string
  icon: LucideIcon
  iconBg: string
  iconTone: string
}

type QueueItem = {
  priority: "HIGH" | "MED" | "LOW"
  type: string
  product: string
  issue: string
  age: string
  status: "Pending" | "Warning" | "Review" | "Open" | "Assigned"
}

type RetailerHealth = {
  name: string
  value: number
  tone: "Healthy" | "Warning" | "Feed Delay"
  colorClass: string
}

type ActivityItem = {
  title: string
  detail: string
  time: string
  icon: LucideIcon
  iconClass: string
}

const metrics: Metric[] = [
  { label: "Today's Searches", value: "28,651", delta: "+ 14.6% vs last 7 days", deltaTone: "text-emerald-500", icon: Search, iconBg: "bg-blue-50", iconTone: "text-blue-500" },
  { label: "AI Reviews Pending", value: "186", delta: "31 high priority", deltaTone: "text-amber-500", icon: LayoutDashboard, iconBg: "bg-amber-50", iconTone: "text-amber-500" },
  { label: "Low Confidence Verdicts", value: "42", delta: "Needs review", deltaTone: "text-rose-500", icon: FileWarning, iconBg: "bg-rose-50", iconTone: "text-rose-500" },
  { label: "Connector Errors", value: "9", delta: "3 needing attention", deltaTone: "text-orange-500", icon: Link2, iconBg: "bg-orange-50", iconTone: "text-orange-500" },
  { label: "Affiliate Clicks", value: "5,318", delta: "+ 11.2% vs last 7 days", deltaTone: "text-emerald-500", icon: ArrowUpRight, iconBg: "bg-emerald-50", iconTone: "text-emerald-500" },
  { label: "User Reports", value: "37", delta: "8 safety concerns", deltaTone: "text-violet-500", icon: Flag, iconBg: "bg-violet-50", iconTone: "text-violet-500" },
]

const queueItems: QueueItem[] = [
  { priority: "HIGH", type: "AI Verdict", product: "CeraVe Moisturizing Cream", issue: "Health/safety claim needs approval", age: "42m", status: "Pending" },
  { priority: "HIGH", type: "Connector", product: "Walmart API", issue: "Error rate above threshold (6.2%)", age: "1h", status: "Warning" },
  { priority: "MED", type: "Product Match", product: "Sony WH-1000XM5", issue: "Duplicate mapping confidence conflict", age: "2h", status: "Review" },
  { priority: "MED", type: "Affiliate", product: "Best Buy links", issue: "Disclosure coverage check failed", age: "3h", status: "Open" },
  { priority: "LOW", type: "User Report", product: "Ninja Air Fryer", issue: "Incorrect price report", age: "5h", status: "Assigned" },
]

const retailerHealth: RetailerHealth[] = [
  { name: "Amazon", value: 96, tone: "Healthy", colorClass: "bg-emerald-500" },
  { name: "Walmart", value: 74, tone: "Warning", colorClass: "bg-amber-500" },
  { name: "Best Buy", value: 91, tone: "Healthy", colorClass: "bg-emerald-500" },
  { name: "Target", value: 68, tone: "Feed Delay", colorClass: "bg-amber-500" },
  { name: "eBay", value: 88, tone: "Healthy", colorClass: "bg-emerald-500" },
]

const activityItems: ActivityItem[] = [
  { title: "AI verdict approved", detail: "Admin Lee approved CeraVe Moisturizing Cream", time: "12m ago", icon: ShieldCheck, iconClass: "bg-blue-100 text-blue-600" },
  { title: "Connector issue acknowledged", detail: "Walmart API error acknowledged by system", time: "34m ago", icon: MessageSquareWarning, iconClass: "bg-amber-100 text-amber-600" },
  { title: "User report reviewed", detail: "Incorrect price report for Ninja Air Fryer", time: "1h ago", icon: Sparkles, iconClass: "bg-violet-100 text-violet-600" },
  { title: "Affiliate disclosure updated", detail: "Best Buy affiliate program disclosure updated", time: "2h ago", icon: Bell, iconClass: "bg-emerald-100 text-emerald-600" },
  { title: "New user registered", detail: "editorjane@example.com", time: "3h ago", icon: UserRound, iconClass: "bg-blue-100 text-blue-600" },
]

const trendData = [
  { day: "May 11", searches: 28500, clicks: 1900 },
  { day: "May 12", searches: 29500, clicks: 2300 },
  { day: "May 13", searches: 31200, clicks: 2500 },
  { day: "May 14", searches: 30100, clicks: 2400 },
  { day: "May 15", searches: 38900, clicks: 3000 },
  { day: "May 16", searches: 34000, clicks: 2700 },
  { day: "May 17", searches: 37800, clicks: 3400 },
]

function priorityClasses(priority: QueueItem["priority"]) {
  if (priority === "HIGH") return "bg-rose-50 text-rose-600 border-rose-100"
  if (priority === "MED") return "bg-amber-50 text-amber-600 border-amber-100"
  return "bg-blue-50 text-blue-600 border-blue-100"
}

function statusClasses(status: QueueItem["status"]) {
  if (status === "Pending") return "bg-amber-50 text-amber-600 border-amber-100"
  if (status === "Warning") return "bg-orange-50 text-orange-600 border-orange-100"
  if (status === "Review") return "bg-blue-50 text-blue-600 border-blue-100"
  if (status === "Open") return "bg-sky-50 text-sky-600 border-sky-100"
  return "bg-emerald-50 text-emerald-600 border-emerald-100"
}

export default function OverviewPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admin Overview</h1>
          <p className="mt-1 text-sm text-slate-500">Real-time platform health, AI review operations, and actionable intelligence.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white px-4 text-slate-700 shadow-none">
            <ArrowUpRight className="mr-2 size-4" />
            Refresh Data
          </Button>
          <Button className="h-10 rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700">
            <ShieldCheck className="mr-2 size-4" />
            View Critical Queue
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={cn("flex size-12 items-center justify-center rounded-full", metric.iconBg)}>
                  <metric.icon className={cn("size-5", metric.iconTone)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-500">{metric.label}</div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{metric.value}</div>
                  <div className={cn("mt-1 text-xs font-medium", metric.deltaTone)}>{metric.delta}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="items-start pb-4">
            <div>
              <CardTitle>Critical Action Queue</CardTitle>
              <CardDescription className="mt-1">
                High Priority <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">Unassigned</span>
              </CardDescription>
            </div>
            <Button variant="outline" className="h-9 rounded-lg border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-none">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="pl-4">Priority</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Product / Source</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead className="pr-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queueItems.map((item) => (
                    <TableRow key={`${item.product}-${item.type}`}>
                      <TableCell className="pl-4">
                        <Badge variant="outline" className={cn("border px-2.5 py-1 text-[11px] font-semibold", priorityClasses(item.priority))}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                          <Link2 className="size-3.5 text-slate-400" />
                          {item.type}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">{item.product}</TableCell>
                      <TableCell>{item.issue}</TableCell>
                      <TableCell className="text-slate-500">{item.age}</TableCell>
                      <TableCell className="pr-4">
                        <Badge variant="outline" className={cn("border px-2.5 py-1 text-[11px] font-semibold", statusClasses(item.status))}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <div>Showing 1-5 of 18</div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-lg border-slate-200 bg-white text-slate-500">
                  <ArrowUpRight className="size-4 rotate-90" />
                </Button>
                {[1, 2, 3, 4].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    className={cn(
                      "h-8 w-8 rounded-lg px-0 text-sm shadow-none",
                      page === 1 ? "bg-blue-600 text-white hover:bg-blue-700" : "border-slate-200 bg-white text-slate-600",
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-lg border-slate-200 bg-white text-slate-500">
                  <ArrowUpRight className="size-4 -rotate-90" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div>
              <CardTitle>Retailer Health</CardTitle>
            </div>
            <Button variant="outline" className="h-9 rounded-lg border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-none">
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {retailerHealth.map((retailer) => (
              <div key={retailer.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-semibold text-slate-900">{retailer.name}</div>
                  <div className={cn("font-medium", retailer.tone === "Healthy" ? "text-emerald-500" : "text-amber-500")}>{retailer.tone}</div>
                </div>
                <Progress value={retailer.value} indicatorClassName={retailer.colorClass} />
                <div className="text-right text-xs text-slate-400">{retailer.value}%</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-4">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-4">
            <div>
              <CardTitle>Search / Click Trend</CardTitle>
            </div>
            <Button variant="outline" className="h-9 rounded-lg border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-none">
              Last 7 days
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-62.5 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)" }} />
                  <Line type="monotone" dataKey="searches" stroke="#2563eb" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="clicks" stroke="#16a34a" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Search className="size-4 text-blue-500" /> Total Searches
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-xl font-semibold text-slate-900">182,463</div>
                  <div className="text-sm font-medium text-emerald-500">↑ 12.8%</div>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ArrowUpRight className="size-4 text-emerald-500" /> Total Clicks
                </div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="text-xl font-semibold text-slate-900">32,719</div>
                  <div className="text-sm font-medium text-emerald-500">↑ 9.4%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="pb-4">
            <div>
              <CardTitle>Top Flagged Products</CardTitle>
            </div>
            <Button variant="outline" className="h-9 rounded-lg border-slate-200 bg-white px-3 text-xs text-slate-700 shadow-none">
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              { rank: 1, title: "CeraVe Moisturizing Cream", subtitle: "Health claim unverified", tone: "High" },
              { rank: 2, title: "Sony WH-1000XM5", subtitle: "Duplicate mapping conflict", tone: "Med" },
              { rank: 3, title: "Ninja Air Fryer XL", subtitle: "Price discrepancy reported", tone: "Med" },
              { rank: 4, title: "Apple AirPods Pro (2nd Gen)", subtitle: "Source authentication conflict", tone: "Low" },
              { rank: 5, title: "The Ordinary Niacinamide 10%", subtitle: "Ingredient concentration claim", tone: "Low" },
            ].map((product) => (
              <div key={product.rank} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-slate-50">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-[11px] font-semibold text-white">{product.rank}</div>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                  <ShoppingBag className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900">{product.title}</div>
                  <div className="truncate text-xs text-slate-500">{product.subtitle}</div>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "border px-2.5 py-1 text-[11px] font-semibold",
                    product.tone === "High" && "border-rose-100 bg-rose-50 text-rose-600",
                    product.tone === "Med" && "border-amber-100 bg-amber-50 text-amber-600",
                    product.tone === "Low" && "border-blue-100 bg-blue-50 text-blue-600",
                  )}
                >
                  {product.tone}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="pb-4">
            <div>
              <CardTitle>Recent Admin Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityItems.map((activity) => (
              <div key={activity.title} className="flex gap-3">
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", activity.iconClass)}>
                  <activity.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-900">{activity.title}</div>
                  <div className="text-sm text-slate-500">{activity.detail}</div>
                </div>
                <div className="whitespace-nowrap text-xs text-slate-400">{activity.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
