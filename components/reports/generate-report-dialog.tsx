"use client"

import * as React from "react"
import { format as formatDate } from "date-fns"
import { IconCalendar } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Report } from "@/app/(dashboard)/reports/page"
import { cn } from "@/lib/utils"

interface GenerateReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerateReport: (report: Omit<Report, "id">) => void
}

const AVAILABLE_METRICS = [
  "Revenue",
  "Jobs Completed",
  "Leads Converted",
  "Average Job Value",
  "Time-to-Completion",
  "Job Source Breakdown",
  "Top Technician",
  "Customer Ratings",
]

export function GenerateReportDialog({
  open,
  onOpenChange,
  onGenerateReport,
}: GenerateReportDialogProps) {
  const [reportName, setReportName] = React.useState("")
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([])
  const [dateRange, setDateRange] = React.useState<{ from: Date; to?: Date }>({
    from: new Date(),
  })
  const [format, setFormat] = React.useState<"PDF" | "CSV" | "Visual">("PDF")
  const [frequency, setFrequency] = React.useState<"One-Time" | "Weekly" | "Monthly">("One-Time")

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!reportName.trim()) {
      toast.error("Please enter a report name")
      return
    }
    if (selectedMetrics.length === 0) {
      toast.error("Please select at least one metric")
      return
    }

    onGenerateReport({
      name: reportName,
      date: new Date().toISOString().split("T")[0],
      metrics: selectedMetrics,
      format,
      frequency,
    })

    onOpenChange(false)

    // Reset form
    setReportName("")
    setSelectedMetrics([])
    setDateRange({ from: new Date() })
    setFormat("PDF")
    setFrequency("One-Time")
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setReportName("")
    setSelectedMetrics([])
    setDateRange({ from: new Date() })
    setFormat("PDF")
    setFrequency("One-Time")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Generate New Report</DialogTitle>
          <DialogDescription>
            Configure your custom report with selected metrics and export options.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 scrollbar-hide">
          <div className="grid gap-4 py-4">
            {/* Report Name */}
            <div className="grid gap-2">
              <Label htmlFor="report-name">
                Report Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="report-name"
                placeholder="e.g., October Revenue Summary"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                required
              />
            </div>

            {/* Select Metrics */}
            <div className="grid gap-2">
              <Label>
                Select Metrics <span className="text-destructive">*</span>
              </Label>
              <div className="rounded-lg border p-4 space-y-3 max-h-[200px] overflow-y-auto scrollbar-hide">
                {AVAILABLE_METRICS.map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={metric}
                      checked={selectedMetrics.includes(metric)}
                      onCheckedChange={() => handleMetricToggle(metric)}
                    />
                    <label
                      htmlFor={metric}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {metric}
                    </label>
                  </div>
                ))}
              </div>
              {selectedMetrics.length > 0 && (
                <p className="text-muted-foreground text-xs">
                  {selectedMetrics.length} metric(s) selected
                </p>
              )}
            </div>

            {/* Date Range */}
            <div className="grid gap-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <IconCalendar className="mr-2 size-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {formatDate(dateRange.from, "LLL dd, y")} -{" "}
                          {formatDate(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        formatDate(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => {
                      if (range?.from) {
                        setDateRange({ from: range.from, to: range.to })
                      }
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Output Format */}
            <div className="grid gap-2">
              <Label htmlFor="format">
                Output Format <span className="text-destructive">*</span>
              </Label>
              <Select
                value={format}
                onValueChange={(value: "PDF" | "CSV" | "Visual") =>
                  setFormat(value)
                }
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF Document</SelectItem>
                  <SelectItem value="CSV">CSV Spreadsheet</SelectItem>
                  <SelectItem value="Visual">In-App View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Frequency */}
            <div className="grid gap-2">
              <Label htmlFor="frequency">
                Frequency <span className="text-destructive">*</span>
              </Label>
              <Select
                value={frequency}
                onValueChange={(value: "One-Time" | "Weekly" | "Monthly") =>
                  setFrequency(value)
                }
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="One-Time">One-Time</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <DialogFooter className="flex-shrink-0">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

