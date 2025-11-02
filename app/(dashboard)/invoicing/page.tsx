/**
 * INVOICING PAGE (COMING SOON)
 * 
 * Purpose:
 * Placeholder page for the upcoming Invoicing module.
 * Will handle invoice generation, payment tracking, and financial reporting.
 * 
 * Planned Features:
 * - Invoice creation and customization
 * - Automatic invoice generation from completed jobs
 * - Payment tracking and reminders
 * - Integration with payment processors
 * - Invoice history and reporting
 * 
 * Status: Under Development
 */

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCurrencyDollar, IconClock } from "@tabler/icons-react"

export default function InvoicingPage() {
  return (
    <>
      <SiteHeader title="Invoicing" />
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <IconCurrencyDollar className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Invoicing Module</CardTitle>
            <CardDescription>This feature is currently under development</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <IconClock className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>
            <p className="text-sm text-muted-foreground">
              We're working on bringing you comprehensive invoicing capabilities including automated 
              invoice generation, payment tracking, and financial reporting. Check back soon!
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
