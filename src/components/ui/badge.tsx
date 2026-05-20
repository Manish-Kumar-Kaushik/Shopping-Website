import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({ className, variant = "default", ...props }: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" | "destructive" }) {
  const variants = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-100 text-slate-700",
    outline: "border border-slate-200 bg-white text-slate-600",
    destructive: "bg-rose-100 text-rose-700",
  }

  return (
    <span
      data-slot="badge"
      className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", variants[variant], className)}
      {...props}
    />
  )
}

export { Badge }