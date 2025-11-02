"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { CreateQuoteDialog } from "@/components/quotes/create-quote-dialog"
import { QuoteDetailDialog } from "@/components/quotes/quote-detail-dialog"
import { QuotesDataTable } from "@/components/quotes/quotes-data-table"
import FadeContent from "@/components/fade-content"

// Quote interface
export interface Quote {
  id: string
  client: string
  contact: string
  service: string
  estimate: number
  status: "Pending" | "Approved" | "Rejected" | "Converted"
  notes: string
  created: string
}

// Mock data
const mockQuotes: Quote[] = [
  {
    id: "Q-001",
    client: "Michael Brown",
    contact: "michael.brown@gmail.com",
    service: "Water Heater Replacement",
    estimate: 1350,
    status: "Pending",
    notes: "Customer requested quote for 50-gallon gas water heater installation.",
    created: "2025-10-25",
  },
  {
    id: "Q-002",
    client: "Sarah Lopez",
    contact: "slopez@live.com",
    service: "Drain Cleaning",
    estimate: 275,
    status: "Approved",
    notes: "Main line drain cleaning approved. Scheduled for next week.",
    created: "2025-10-29",
  },
  {
    id: "Q-003",
    client: "Robert Chen",
    contact: "(631) 555-8901",
    service: "Bathroom Remodel",
    estimate: 8500,
    status: "Pending",
    notes: "Complete bathroom renovation including fixtures and tile work.",
    created: "2025-10-28",
  },
  {
    id: "Q-004",
    client: "Jessica Martinez",
    contact: "j.martinez@example.com",
    service: "Leak Repair",
    estimate: 450,
    status: "Converted",
    notes: "Quote approved and converted to Job JOB-052.",
    created: "2025-10-27",
  },
  {
    id: "Q-005",
    client: "David Park",
    contact: "(631) 555-3421",
    service: "Sewer Line Replacement",
    estimate: 5200,
    status: "Rejected",
    notes: "Customer decided to postpone project due to budget constraints.",
    created: "2025-10-26",
  },
  {
    id: "Q-006",
    client: "Amanda Foster",
    contact: "amanda.foster@gmail.com",
    service: "Kitchen Sink Installation",
    estimate: 890,
    status: "Approved",
    notes: "New undermount sink with garbage disposal. Customer approved estimate.",
    created: "2025-10-30",
  },
  {
    id: "Q-007",
    client: "Thomas Wright",
    contact: "(631) 555-7623",
    service: "Pipe Insulation",
    estimate: 650,
    status: "Pending",
    notes: "Insulate exposed pipes in basement to prevent freezing.",
    created: "2025-10-29",
  },
  {
    id: "Q-008",
    client: "Lisa Thompson",
    contact: "lisa.t@example.com",
    service: "Tankless Water Heater",
    estimate: 3200,
    status: "Converted",
    notes: "Converted to job. Installation scheduled for 11/15.",
    created: "2025-10-24",
  },
  {
    id: "Q-009",
    client: "Kevin Anderson",
    contact: "k.anderson@live.com",
    service: "Faucet Replacement",
    estimate: 320,
    status: "Approved",
    notes: "Replace all bathroom faucets - 3 total.",
    created: "2025-10-28",
  },
  {
    id: "Q-010",
    client: "Maria Garcia",
    contact: "(631) 555-9087",
    service: "Water Line Repair",
    estimate: 1800,
    status: "Rejected",
    notes: "Customer chose competitor with lower price.",
    created: "2025-10-23",
  },
]

export default function QuotesPage() {
  const [quotes, setQuotes] = React.useState<Quote[]>(mockQuotes)
  const [isCreateQuoteDialogOpen, setIsCreateQuoteDialogOpen] = React.useState(false)
  const [selectedQuote, setSelectedQuote] = React.useState<Quote | null>(null)

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote)
  }

  const handleEditQuote = (quote: Quote) => {
    setSelectedQuote(quote)
  }

  const handleDeleteQuote = (id: string) => {
    setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id))
    toast.success("Quote deleted successfully")
  }

  const handleCreateQuote = (newQuote: Omit<Quote, "id" | "created">) => {
    const quote: Quote = {
      ...newQuote,
      id: `Q-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`,
      created: new Date().toISOString().split("T")[0],
    }
    setQuotes((prevQuotes) => [quote, ...prevQuotes])
    toast.success("Quote created successfully")
  }

  const handleSaveQuote = (updatedQuote: Quote) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => (quote.id === updatedQuote.id ? updatedQuote : quote))
    )
    toast.success("Quote updated successfully")
  }

  return (
    <>
      <SiteHeader title="Quotes" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <QuotesDataTable
                data={quotes}
                onViewQuote={handleViewQuote}
                onEditQuote={handleEditQuote}
                onDeleteQuote={handleDeleteQuote}
                onCreateQuote={() => setIsCreateQuoteDialogOpen(true)}
              />
            </FadeContent>
          </div>
        </div>

        <CreateQuoteDialog
          open={isCreateQuoteDialogOpen}
          onOpenChange={setIsCreateQuoteDialogOpen}
          onCreateQuote={handleCreateQuote}
        />

        {selectedQuote && (
          <QuoteDetailDialog
            quote={selectedQuote}
            open={!!selectedQuote}
            onOpenChange={() => setSelectedQuote(null)}
            onSaveQuote={handleSaveQuote}
          />
        )}
      </div>
    </>
  )
}
