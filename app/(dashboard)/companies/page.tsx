"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { CreateCompanyDialog } from "@/components/companies/create-company-dialog"
import { CompanyDetailDialog } from "@/components/companies/company-detail-dialog"
import { CompaniesDataTable } from "@/components/companies/companies-data-table"
import FadeContent from "@/components/fade-content"

// Company interface
export interface Company {
  id: string
  name: string
  contact: string
  phone: string
  address: string
  totalJobs: number
  revenue: number
  notes: string
  created: string
}

// Mock data
const mockCompanies: Company[] = [
  {
    id: "CO-001",
    name: "Bayview Apartments LLC",
    contact: "maria.gomez@bayviewapts.com",
    phone: "(631) 555-8001",
    address: "12 Harbor Road, Freeport, NY",
    totalJobs: 15,
    revenue: 22400,
    notes: "Monthly maintenance contract. Preferred vendor.",
    created: "2023-06-15",
  },
  {
    id: "CO-002",
    name: "Smith & Sons Construction",
    contact: "mark.smith@smithconstruction.com",
    phone: "(631) 555-8002",
    address: "77 Industrial Park Drive, Hauppauge, NY",
    totalJobs: 8,
    revenue: 11800,
    notes: "Net 30 payment terms. Plumbing subcontractor.",
    created: "2023-11-20",
  },
  {
    id: "CO-003",
    name: "Ocean View Property Management",
    contact: "lisa.chen@oceanviewpm.com",
    phone: "(631) 555-8003",
    address: "45 Shoreline Boulevard, Long Beach, NY",
    totalJobs: 22,
    revenue: 34600,
    notes: "Large portfolio of residential properties. Annual contract.",
    created: "2023-03-10",
  },
  {
    id: "CO-004",
    name: "Green Valley Estates",
    contact: "robert.kim@greenvalley.com",
    phone: "(631) 555-8004",
    address: "88 Valley Road, Smithtown, NY",
    totalJobs: 12,
    revenue: 18900,
    notes: "Gated community. Emergency services 24/7.",
    created: "2023-08-22",
  },
  {
    id: "CO-005",
    name: "Downtown Office Complex",
    contact: "amanda.foster@dtoffice.com",
    phone: "(631) 555-8005",
    address: "123 Business Park, Islip, NY",
    totalJobs: 18,
    revenue: 28500,
    notes: "Commercial building. Quarterly maintenance agreement.",
    created: "2023-05-18",
  },
  {
    id: "CO-006",
    name: "Sunrise Senior Living",
    contact: "david.wilson@sunrisesenior.com",
    phone: "(631) 555-8006",
    address: "56 Elder Care Lane, Bay Shore, NY",
    totalJobs: 10,
    revenue: 15200,
    notes: "Senior living facility. All work requires background checks.",
    created: "2024-01-12",
  },
  {
    id: "CO-007",
    name: "Retail Plaza Associates",
    contact: "jennifer.lee@retailplaza.com",
    phone: "(631) 555-8007",
    address: "234 Shopping Center Drive, Ronkonkoma, NY",
    totalJobs: 14,
    revenue: 21300,
    notes: "Multi-tenant retail property. After-hours work preferred.",
    created: "2023-09-05",
  },
  {
    id: "CO-008",
    name: "Harbor View Hotel Group",
    contact: "thomas.brown@harborview.com",
    phone: "(631) 555-8008",
    address: "789 Waterfront Avenue, Patchogue, NY",
    totalJobs: 25,
    revenue: 42800,
    notes: "Hotel chain. Priority service for guest-facing areas.",
    created: "2023-04-28",
  },
]

export default function CompaniesPage() {
  const [companies, setCompanies] = React.useState<Company[]>(mockCompanies)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortBy, setSortBy] = React.useState<"revenue" | "jobs" | "none">("none")
  const [isCreateCompanyDialogOpen, setIsCreateCompanyDialogOpen] = React.useState(false)
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null)

  const filteredAndSortedCompanies = React.useMemo(() => {
    let result = companies

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.contact.toLowerCase().includes(query) ||
          company.address.toLowerCase().includes(query) ||
          company.id.toLowerCase().includes(query)
      )
    }

    // Sort
    if (sortBy === "revenue") {
      result = [...result].sort((a, b) => b.revenue - a.revenue)
    } else if (sortBy === "jobs") {
      result = [...result].sort((a, b) => b.totalJobs - a.totalJobs)
    }

    return result
  }, [companies, searchQuery, sortBy])

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company)
  }

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company)
  }

  const handleDeleteCompany = (id: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.filter((company) => company.id !== id)
    )
    toast.success("Company deleted successfully")
  }

  const handleCreateCompany = (newCompany: Omit<Company, "id" | "created">) => {
    const company: Company = {
      ...newCompany,
      id: `CO-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`,
      created: new Date().toISOString().split("T")[0],
    }
    setCompanies((prevCompanies) => [company, ...prevCompanies])
    toast.success("Company created successfully")
  }

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    )
    toast.success("Company updated successfully")
  }

  return (
    <>
      <SiteHeader title="Companies" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col gap-4 px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Companies</h1>
                <Button 
                  onClick={() => setIsCreateCompanyDialogOpen(true)} 
                  size="sm"
                  data-create-company
                >
                  <IconPlus className="mr-2 size-4" />
                  Add Company
                </Button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Input
                  type="search"
                  placeholder="Search companies by name, contact, or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Default</SelectItem>
                    <SelectItem value="revenue">Top Revenue</SelectItem>
                    <SelectItem value="jobs">Most Jobs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <CompaniesDataTable
                data={filteredAndSortedCompanies}
                onViewCompany={handleViewCompany}
                onEditCompany={handleEditCompany}
                onDeleteCompany={handleDeleteCompany}
              />
            </FadeContent>
          </div>
        </div>

        <CreateCompanyDialog
          open={isCreateCompanyDialogOpen}
          onOpenChange={setIsCreateCompanyDialogOpen}
          onCreateCompany={handleCreateCompany}
        />

        {selectedCompany && (
          <CompanyDetailDialog
            company={selectedCompany}
            open={!!selectedCompany}
            onOpenChange={() => setSelectedCompany(null)}
            onSaveCompany={handleSaveCompany}
          />
        )}
      </div>
    </>
  )
}
