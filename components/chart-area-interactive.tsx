"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", clients: 222, companies: 150 },
  { date: "2024-04-02", clients: 97, companies: 180 },
  { date: "2024-04-03", clients: 167, companies: 120 },
  { date: "2024-04-04", clients: 242, companies: 260 },
  { date: "2024-04-05", clients: 373, companies: 290 },
  { date: "2024-04-06", clients: 301, companies: 340 },
  { date: "2024-04-07", clients: 245, companies: 180 },
  { date: "2024-04-08", clients: 409, companies: 320 },
  { date: "2024-04-09", clients: 59, companies: 110 },
  { date: "2024-04-10", clients: 261, companies: 190 },
  { date: "2024-04-11", clients: 327, companies: 350 },
  { date: "2024-04-12", clients: 292, companies: 210 },
  { date: "2024-04-13", clients: 342, companies: 380 },
  { date: "2024-04-14", clients: 137, companies: 220 },
  { date: "2024-04-15", clients: 120, companies: 170 },
  { date: "2024-04-16", clients: 138, companies: 190 },
  { date: "2024-04-17", clients: 446, companies: 360 },
  { date: "2024-04-18", clients: 364, companies: 410 },
  { date: "2024-04-19", clients: 243, companies: 180 },
  { date: "2024-04-20", clients: 89, companies: 150 },
  { date: "2024-04-21", clients: 137, companies: 200 },
  { date: "2024-04-22", clients: 224, companies: 170 },
  { date: "2024-04-23", clients: 138, companies: 230 },
  { date: "2024-04-24", clients: 387, companies: 290 },
  { date: "2024-04-25", clients: 215, companies: 250 },
  { date: "2024-04-26", clients: 75, companies: 130 },
  { date: "2024-04-27", clients: 383, companies: 420 },
  { date: "2024-04-28", clients: 122, companies: 180 },
  { date: "2024-04-29", clients: 315, companies: 240 },
  { date: "2024-04-30", clients: 454, companies: 380 },
  { date: "2024-05-01", clients: 165, companies: 220 },
  { date: "2024-05-02", clients: 293, companies: 310 },
  { date: "2024-05-03", clients: 247, companies: 190 },
  { date: "2024-05-04", clients: 385, companies: 420 },
  { date: "2024-05-05", clients: 481, companies: 390 },
  { date: "2024-05-06", clients: 498, companies: 520 },
  { date: "2024-05-07", clients: 388, companies: 300 },
  { date: "2024-05-08", clients: 149, companies: 210 },
  { date: "2024-05-09", clients: 227, companies: 180 },
  { date: "2024-05-10", clients: 293, companies: 330 },
  { date: "2024-05-11", clients: 335, companies: 270 },
  { date: "2024-05-12", clients: 197, companies: 240 },
  { date: "2024-05-13", clients: 197, companies: 160 },
  { date: "2024-05-14", clients: 448, companies: 490 },
  { date: "2024-05-15", clients: 473, companies: 380 },
  { date: "2024-05-16", clients: 338, companies: 400 },
  { date: "2024-05-17", clients: 499, companies: 420 },
  { date: "2024-05-18", clients: 315, companies: 350 },
  { date: "2024-05-19", clients: 235, companies: 180 },
  { date: "2024-05-20", clients: 177, companies: 230 },
  { date: "2024-05-21", clients: 82, companies: 140 },
  { date: "2024-05-22", clients: 81, companies: 120 },
  { date: "2024-05-23", clients: 252, companies: 290 },
  { date: "2024-05-24", clients: 294, companies: 220 },
  { date: "2024-05-25", clients: 201, companies: 250 },
  { date: "2024-05-26", clients: 213, companies: 170 },
  { date: "2024-05-27", clients: 420, companies: 460 },
  { date: "2024-05-28", clients: 233, companies: 190 },
  { date: "2024-05-29", clients: 78, companies: 130 },
  { date: "2024-05-30", clients: 340, companies: 280 },
  { date: "2024-05-31", clients: 178, companies: 230 },
  { date: "2024-06-01", clients: 178, companies: 200 },
  { date: "2024-06-02", clients: 470, companies: 410 },
  { date: "2024-06-03", clients: 103, companies: 160 },
  { date: "2024-06-04", clients: 439, companies: 380 },
  { date: "2024-06-05", clients: 88, companies: 140 },
  { date: "2024-06-06", clients: 294, companies: 250 },
  { date: "2024-06-07", clients: 323, companies: 370 },
  { date: "2024-06-08", clients: 385, companies: 320 },
  { date: "2024-06-09", clients: 438, companies: 480 },
  { date: "2024-06-10", clients: 155, companies: 200 },
  { date: "2024-06-11", clients: 92, companies: 150 },
  { date: "2024-06-12", clients: 492, companies: 420 },
  { date: "2024-06-13", clients: 81, companies: 130 },
  { date: "2024-06-14", clients: 426, companies: 380 },
  { date: "2024-06-15", clients: 307, companies: 350 },
  { date: "2024-06-16", clients: 371, companies: 310 },
  { date: "2024-06-17", clients: 475, companies: 520 },
  { date: "2024-06-18", clients: 107, companies: 170 },
  { date: "2024-06-19", clients: 341, companies: 290 },
  { date: "2024-06-20", clients: 408, companies: 450 },
  { date: "2024-06-21", clients: 169, companies: 210 },
  { date: "2024-06-22", clients: 317, companies: 270 },
  { date: "2024-06-23", clients: 480, companies: 530 },
  { date: "2024-06-24", clients: 132, companies: 180 },
  { date: "2024-06-25", clients: 141, companies: 190 },
  { date: "2024-06-26", clients: 434, companies: 380 },
  { date: "2024-06-27", clients: 448, companies: 490 },
  { date: "2024-06-28", clients: 149, companies: 200 },
  { date: "2024-06-29", clients: 103, companies: 160 },
  { date: "2024-06-30", clients: 446, companies: 400 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  clients: {
    label: "Clients",
    color: "var(--primary)",
  },
  companies: {
    label: "Companies",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Weekly Revenue</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Revenue from clients and companies
          </span>
          <span className="@[540px]/card:hidden">Client & Company Revenue</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillClients" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clients)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clients)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompanies" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-companies)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-companies)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="companies"
              type="natural"
              fill="url(#fillCompanies)"
              stroke="var(--color-companies)"
              stackId="a"
            />
            <Area
              dataKey="clients"
              type="natural"
              fill="url(#fillClients)"
              stroke="var(--color-clients)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
