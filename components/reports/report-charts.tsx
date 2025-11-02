"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * REPORT CHARTS COMPONENT
 * 
 * Displays data visualizations for business metrics.
 * 
 * Charts included:
 * 1. Revenue by Week (Bar Chart) - Shows weekly revenue trends
 * 2. Job Source Breakdown (Pie Chart) - Shows distribution of job sources
 */

// Mock revenue data with individual colors
const revenueData = [
  { week: "Oct 1-7", revenue: 5400, fill: "hsl(217 91% 60%)" },
  { week: "Oct 8-14", revenue: 7200, fill: "hsl(262 83% 58%)" },
  { week: "Oct 15-21", revenue: 6900, fill: "hsl(142 76% 36%)" },
  { week: "Oct 22-28", revenue: 8400, fill: "hsl(346 77% 49%)" },
]

// Mock job source data
const jobSourceData = [
  { name: "Web", value: 45 },
  { name: "Referral", value: 30 },
  { name: "Phone", value: 25 },
]

// Chart colors - Distinct colors for better differentiation
const CHART_COLORS = {
  primary: "hsl(221.2 83.2% 53.3%)",
  secondary: "hsl(212 95% 68%)",
  tertiary: "hsl(216 92% 60%)",
}

// Pie chart colors - Using distinct hues for clear visual separation
const PIE_COLORS = [
  "hsl(217 91% 60%)",    // Blue - Web
  "hsl(142 76% 36%)",    // Green - Referral
  "hsl(25 95% 53%)",     // Orange - Phone
]

export function ReportCharts() {
  return (
    <div className="px-4 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Week</CardTitle>
            <CardDescription>Weekly revenue performance for October</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <XAxis
                    dataKey="week"
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    className="text-foreground"
                  />
                  <YAxis
                    stroke="currentColor"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                    className="text-foreground"
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted))" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-3 shadow-md">
                            <div className="grid gap-2">
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-foreground">
                                  {payload[0].payload.week}
                                </span>
                                <span className="text-lg font-bold text-foreground">
                                  ${Number(payload[0].value).toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Weekly Revenue
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    radius={[4, 4, 0, 0]}
                    label={{
                      position: "top",
                      fill: "currentColor",
                      fontSize: 12,
                      formatter: (value: number) => `$${(value / 1000).toFixed(1)}k`,
                      className: "fill-foreground",
                    }}
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Job Source Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Job Source Breakdown</CardTitle>
            <CardDescription>Distribution of jobs by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobSourceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  {payload[0].name}
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].value}%
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-sm text-muted-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

