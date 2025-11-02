"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { CreateLeadDialog } from "@/components/leads/create-lead-dialog"
import { LeadDetailDialog } from "@/components/leads/lead-detail-dialog"
import { LeadsDataTable } from "@/components/leads/leads-data-table"
import FadeContent from "@/components/fade-content"

// Lead interface
export interface Lead {
  id: string
  name: string
  contact: string
  address: string
  clientType: "Client" | "Company"
  stage: "Lead" | "Quote" | "Job"
  status: "New" | "Contacted" | "Quoted" | "Closed-Won" | "Closed-Lost" | "Not Interested"
  quotePrice?: string
  notes: string
  created: string
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: "L-101",
    name: "James Carter",
    contact: "jamescarter@gmail.com",
    address: "102 Ridge Rd, Babylon, NY",
    clientType: "Client",
    stage: "Lead",
    status: "New",
    notes: "Interested in pipe replacement quote.",
    created: "2025-10-28",
  },
  {
    id: "L-102",
    name: "Rebecca Hughes",
    contact: "rebecca.hughes@gmail.com",
    address: "33 Lake Ave, Patchogue, NY",
    clientType: "Client",
    stage: "Lead",
    status: "Contacted",
    notes: "Left voicemail for follow-up.",
    created: "2025-10-27",
  },
  {
    id: "L-103",
    name: "Michael Stevens",
    contact: "(631) 555-3847",
    address: "78 Oak Street, Huntington, NY",
    clientType: "Client",
    stage: "Quote",
    status: "Quoted",
    quotePrice: "$2,400",
    notes: "Sent quote for water heater installation - $2,400",
    created: "2025-10-26",
  },
  {
    id: "L-104",
    name: "Sarah Johnson",
    contact: "sarah.j@example.com",
    address: "45 Maple Drive, Smithtown, NY",
    clientType: "Client",
    stage: "Job",
    status: "Closed-Won",
    notes: "Converted to job JOB-045. Emergency plumbing repair.",
    created: "2025-10-25",
  },
  {
    id: "L-105",
    name: "David Martinez",
    contact: "(631) 555-9012",
    address: "210 Beach Rd, East Islip, NY",
    clientType: "Company",
    stage: "Quote",
    status: "Closed-Lost",
    quotePrice: "$3,200",
    notes: "Went with competitor - price too high.",
    created: "2025-10-24",
  },
  {
    id: "L-106",
    name: "Emily Thompson",
    contact: "emily.thompson@gmail.com",
    address: "92 Pine Street, Ronkonkoma, NY",
    clientType: "Client",
    stage: "Lead",
    status: "Not Interested",
    notes: "Decided to postpone project.",
    created: "2025-10-23",
  },
  {
    id: "L-107",
    name: "Robert Wilson",
    contact: "(631) 555-7834",
    address: "156 Main Street, Islip, NY",
    clientType: "Client",
    stage: "Lead",
    status: "New",
    notes: "Looking for drain cleaning services.",
    created: "2025-10-29",
  },
  {
    id: "L-108",
    name: "Jennifer Davis",
    contact: "jdavis@example.com",
    address: "88 Harbor Lane, Bay Shore, NY",
    clientType: "Company",
    stage: "Lead",
    status: "Contacted",
    notes: "Scheduled callback for Thursday 2pm.",
    created: "2025-10-28",
  },
  {
    id: "L-109",
    name: "Thomas Anderson",
    contact: "(631) 555-4521",
    address: "34 River Road, Sayville, NY",
    clientType: "Client",
    stage: "Quote",
    status: "Quoted",
    quotePrice: "$8,500",
    notes: "Quote sent for bathroom remodel - $8,500. Waiting for decision.",
    created: "2025-10-27",
  },
  {
    id: "L-110",
    name: "Lisa Brown",
    contact: "lisabrown@gmail.com",
    address: "67 Cedar Ave, Brentwood, NY",
    clientType: "Company",
    stage: "Job",
    status: "Closed-Won",
    notes: "Job scheduled for next week. Kitchen sink replacement.",
    created: "2025-10-26",
  },
  {
    id: "L-111",
    name: "Kevin White",
    contact: "(631) 555-2198",
    address: "123 Elm Street, Hauppauge, NY",
    clientType: "Client",
    stage: "Lead",
    status: "New",
    notes: "Interested in sewer line inspection.",
    created: "2025-10-30",
  },
  {
    id: "L-112",
    name: "Amanda Garcia",
    contact: "amanda.garcia@example.com",
    address: "55 Forest Drive, Deer Park, NY",
    clientType: "Company",
    stage: "Lead",
    status: "Contacted",
    notes: "Discussed water leak issue. Needs site visit.",
    created: "2025-10-29",
  },
]

export default function LeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>(mockLeads)
  const [isCreateLeadDialogOpen, setIsCreateLeadDialogOpen] = React.useState(false)
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
  }

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead)
  }

  const handleDeleteLead = (id: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id))
    toast.success("Lead deleted successfully")
  }

  const handleCreateLead = (newLead: Omit<Lead, "id" | "created">) => {
    const lead: Lead = {
      ...newLead,
      id: `L-${Math.floor(Math.random() * 10000)}`,
      created: new Date().toISOString().split("T")[0],
    }
    setLeads((prevLeads) => [lead, ...prevLeads])
    toast.success("Lead created successfully")
  }

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    )
    toast.success("Lead updated successfully")
  }

  return (
    <>
      <SiteHeader title="Leads" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <LeadsDataTable
                data={leads}
                onViewLead={handleViewLead}
                onEditLead={handleEditLead}
                onDeleteLead={handleDeleteLead}
                onCreateLead={() => setIsCreateLeadDialogOpen(true)}
              />
            </FadeContent>
        </div>
      </div>

      <CreateLeadDialog
        open={isCreateLeadDialogOpen}
        onOpenChange={setIsCreateLeadDialogOpen}
        onCreateLead={handleCreateLead}
      />

      {selectedLead && (
        <LeadDetailDialog
          lead={selectedLead}
          open={!!selectedLead}
          onOpenChange={() => setSelectedLead(null)}
          onSaveLead={handleSaveLead}
        />
      )}
      </div>
    </>
  )
}
