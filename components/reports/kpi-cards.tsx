"use client"

import * as React from "react"
import { IconArrowUpRight, IconArrowDownRight, IconCurrencyDollar, IconChecklist, IconRoute, IconTrendingUp } from "@tabler/icons-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * KPI CARDS COMPONENT
 * 
 * Displays key performance indicators in card format.
 * Shows current values with trend indicators comparing to previous period.
 * 
 * Mock data includes:
 * - Total Revenue
 * - Jobs Completed
 * - Leads Converted
 * - Average Job Value
 */

const kpiData = [
  {
    title: "Total Revenue",
    value: "$28,450",
    change: "+12.5%",
    trend: "up",
    icon: IconCurrencyDollar,
  },
  {
    title: "Jobs Completed",
    value: "142",
    change: "+8.2%",
    trend: "up",
    icon: IconChecklist,
  },
  {
    title: "Leads Converted",
    value: "67",
    change: "+15.3%",
    trend: "up",
    icon: IconRoute,
  },
  {
    title: "Avg. Job Value",
    value: "$200",
    change: "-3.1%",
    trend: "down",
    icon: IconTrendingUp,
  },
]

export function KpiCards() {
  return (
    <div className="px-4 lg:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Icon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {kpi.trend === "up" ? (
                    <IconArrowUpRight className="size-3 text-green-600" />
                  ) : (
                    <IconArrowDownRight className="size-3 text-red-600" />
                  )}
                  <span
                    className={
                      kpi.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

