/**
 * BILLING PAGE COMPONENT
 * 
 * Purpose:
 * Subscription and billing management page for viewing plan details, payment methods,
 * invoices, and usage metrics. Handles plan upgrades/downgrades and payment updates.
 * 
 * Key Features:
 * - Current Plan Display: Shows active subscription tier and features
 * - Payment Method Management: Add, update, or remove payment methods
 * - Billing History: View and download past invoices
 * - Usage Metrics: Track usage against plan limits
 * - Plan Comparison: View and upgrade/downgrade plans
 * 
 * Data Flow:
 * - Client-side state management using React hooks
 * - Mock subscription and billing data for development
 * - Ready for payment processor integration (Stripe, etc.)
 * 
 * Integration Points:
 * - Ready for backend API: Replace mock data with billing API
 * - Payment processor integration (Stripe, Paddle, etc.)
 * - Invoice generation and email delivery
 * - Usage tracking and metering
 */

"use client"

import * as React from "react"
import {
  IconCreditCard,
  IconDownload,
  IconCheck,
  IconSparkles,
  IconBuilding,
  IconUsers,
  IconBriefcase,
  IconChartBar,
  IconAlertCircle,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import FadeContent from "@/components/fade-content"

/**
 * INVOICE INTERFACE
 * 
 * Defines the structure for billing invoices.
 */
interface Invoice {
  id: string
  date: string
  amount: number
  status: "Paid" | "Pending" | "Failed"
  downloadUrl: string
}

/**
 * PLAN INTERFACE
 * 
 * Defines subscription plan details.
 */
interface Plan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  popular?: boolean
}

/**
 * USAGE INTERFACE
 * 
 * Tracks usage metrics against plan limits.
 */
interface Usage {
  metric: string
  current: number
  limit: number
  unit: string
}

/**
 * MOCK CURRENT SUBSCRIPTION
 */
const currentSubscription = {
  plan: "Pro",
  price: 499,
  interval: "month" as const,
  status: "Active",
  renewalDate: "2025-12-02",
  seats: 8,
}

/**
 * MOCK PAYMENT METHOD
 */
const paymentMethod = {
  type: "Visa",
  last4: "4242",
  expiry: "12/2026",
}

/**
 * MOCK INVOICES
 */
const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    date: "2025-11-02",
    amount: 499.00,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: "INV-002",
    date: "2025-10-02",
    amount: 499.00,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: "INV-003",
    date: "2025-09-02",
    amount: 499.00,
    status: "Paid",
    downloadUrl: "#",
  },
  {
    id: "INV-004",
    date: "2025-08-02",
    amount: 499.00,
    status: "Paid",
    downloadUrl: "#",
  },
]

/**
 * MOCK USAGE DATA
 */
const mockUsage: Usage[] = [
  { metric: "Team Members", current: 8, limit: 999, unit: "users" },
  { metric: "Jobs This Month", current: 156, limit: 999, unit: "jobs" },
  { metric: "Storage Used", current: 3.7, limit: 100, unit: "GB" },
  { metric: "QuickBooks Syncs", current: 45, limit: 999, unit: "syncs" },
]

/**
 * AVAILABLE PLANS
 */
const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 199,
    interval: "month",
    features: [
      "Job scheduling & dispatch (calendar view)",
      "Customer CRM (basic)",
      "Estimates & invoices",
      "Mobile-friendly technician portal",
      "Online booking form",
      "Email reminders (basic)",
      "1 admin + 2 tech logins",
      "Email support only",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    interval: "month",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "White-glove onboarding (data import, QuickBooks setup)",
      "Unlimited users",
      "QuickBooks integration",
      "Lead-to-job pipeline (CRM funnel)",
      "Dashboard with job/revenue stats",
      "Client & contractor management",
      "Priority phone & chat support",
      "2-hour response SLA",
      "Monthly check-ins / tune-ups",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 799,
    interval: "month",
    features: [
      "Everything in Pro, plus:",
      "Custom automations (review reminders, follow-up emails)",
      "AI job routing & scheduling optimizations",
      "Two-way client texting & call tracking",
      "Employee GPS + time tracking",
      "Commercial client portal access",
      "Advanced reports & job costing",
      "Feature request fast lane",
      "Dedicated success manager",
    ],
  },
]

export default function BillingPage() {
  // ==================== STATE MANAGEMENT ====================

  const [invoices] = React.useState<Invoice[]>(mockInvoices)
  const [usage] = React.useState<Usage[]>(mockUsage)

  // ==================== EVENT HANDLERS ====================

  /**
   * UPDATE PAYMENT METHOD HANDLER
   * 
   * Opens payment method update dialog.
   */
  const handleUpdatePaymentMethod = () => {
    // In production: Open Stripe/payment processor modal
    toast.info("Payment method update coming soon")
  }

  /**
   * DOWNLOAD INVOICE HANDLER
   * 
   * Downloads invoice PDF.
   */
  const handleDownloadInvoice = (invoice: Invoice) => {
    // In production: Fetch and download PDF
    toast.success(`Downloading invoice ${invoice.id}...`)
  }

  /**
   * CHANGE PLAN HANDLER
   * 
   * Initiates plan change workflow.
   */
  const handleChangePlan = (planId: string) => {
    // In production: Show confirmation dialog and process change
    const plan = plans.find((p) => p.id === planId)
    if (plan) {
      toast.info(`Upgrading to ${plan.name} plan...`)
    }
  }

  /**
   * CANCEL SUBSCRIPTION HANDLER
   * 
   * Initiates subscription cancellation.
   */
  const handleCancelSubscription = () => {
    // In production: Show confirmation dialog with cancellation flow
    toast.error("Subscription cancellation requires confirmation")
  }

  /**
   * CALCULATE USAGE PERCENTAGE
   */
  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100)
  }

  /**
   * GET USAGE COLOR
   */
  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600 dark:text-red-400"
    if (percentage >= 75) return "text-yellow-600 dark:text-yellow-400"
    return "text-green-600 dark:text-green-400"
  }

  // ==================== RENDER ====================

  return (
    <>
      {/* PAGE HEADER */}
      <SiteHeader title="Billing" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* PAGE TITLE */}
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your subscription, payment methods, and billing history
              </p>
            </div>

            <div className="px-4 lg:px-6">
              <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
                <div className="grid gap-6 max-w-6xl">
                  
                  {/* CURRENT PLAN CARD */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>Current Plan</CardTitle>
                          <CardDescription>
                            You're currently on the {currentSubscription.plan} plan
                          </CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <IconCheck className="size-3 mr-1" />
                          {currentSubscription.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-6 rounded-lg bg-muted/50">
                        <div>
                          <h3 className="text-2xl font-bold">
                            ${currentSubscription.price}
                            <span className="text-muted-foreground text-base font-normal">
                              /{currentSubscription.interval}
                            </span>
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {currentSubscription.seats} team members
                          </p>
                        </div>
                        <IconSparkles className="size-12 text-primary opacity-20" />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">Billing Cycle</p>
                          <p className="font-medium">Monthly</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground text-sm">Next Billing Date</p>
                          <p className="font-medium">
                            {new Date(currentSubscription.renewalDate).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="flex-1" onClick={() => handleChangePlan("professional")}>
                          Change Plan
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* USAGE METRICS CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage This Month</CardTitle>
                      <CardDescription>
                        Track your usage against plan limits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {usage.map((item) => {
                        const percentage = getUsagePercentage(item.current, item.limit)
                        const colorClass = getUsageColor(percentage)

                        return (
                          <div key={item.metric} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{item.metric}</span>
                              <span className={colorClass}>
                                {item.current} / {item.limit} {item.unit}
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  percentage >= 90
                                    ? "bg-red-500"
                                    : percentage >= 75
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}

                      {usage.some((item) => getUsagePercentage(item.current, item.limit) >= 75) && (
                        <div className="flex items-start gap-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 p-4 mt-4">
                          <IconAlertCircle className="size-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                              Approaching Plan Limits
                            </p>
                            <p className="text-yellow-700 dark:text-yellow-300">
                              You're using over 75% of your plan allocation. Consider upgrading to avoid service interruptions.
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* PAYMENT METHOD CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>
                        Manage your payment information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-muted">
                            <IconCreditCard className="size-6" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {paymentMethod.type} ending in {paymentMethod.last4}
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Expires {paymentMethod.expiry}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleUpdatePaymentMethod}>
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* BILLING HISTORY CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>
                        Download past invoices and view payment history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.id}</TableCell>
                              <TableCell>
                                {new Date(invoice.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </TableCell>
                              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="secondary"
                                  className={
                                    invoice.status === "Paid"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : invoice.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  }
                                >
                                  {invoice.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownloadInvoice(invoice)}
                                >
                                  <IconDownload className="size-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* AVAILABLE PLANS CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Plans</CardTitle>
                      <CardDescription>
                        Upgrade or downgrade your subscription at any time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        {plans.map((plan) => {
                          const isCurrent = plan.name === currentSubscription.plan
                          
                          // Determine badge color
                          const badgeColor = plan.id === "starter" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : plan.id === "pro"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"

                          return (
                            <div
                              key={plan.id}
                              className={`relative rounded-lg border-2 p-6 ${
                                plan.popular
                                  ? "border-primary shadow-lg"
                                  : isCurrent
                                  ? "border-green-500"
                                  : "border-border"
                              }`}
                            >
                              {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-sm">
                                  🔵 Most Popular
                                </Badge>
                              )}

                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                                  <Badge variant="secondary" className={`text-xs ${badgeColor}`}>
                                    {plan.id === "starter" ? "🟢" : plan.id === "pro" ? "🔵" : "🟣"}
                                  </Badge>
                                </div>
                                <div className="mt-2">
                                  <span className="text-3xl font-bold">${plan.price}</span>
                                  <span className="text-muted-foreground">/{plan.interval}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {plan.id === "starter" 
                                    ? "For solo operators or 2-3 tech teams"
                                    : plan.id === "pro"
                                    ? "For 4-15 person teams ready to streamline ops"
                                    : "For growing teams needing automation & customization"
                                  }
                                </p>
                              </div>

                              <Separator className="my-4" />

                              <ul className="space-y-2.5 mb-6 min-h-[320px]">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <IconCheck className="size-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                    <span className={feature.startsWith("Everything in") ? "font-medium" : ""}>
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                disabled={isCurrent}
                                onClick={() => handleChangePlan(plan.id)}
                              >
                                {isCurrent ? "Current Plan" : plan.id === "elite" ? "Contact Sales" : "Select Plan"}
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeContent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

