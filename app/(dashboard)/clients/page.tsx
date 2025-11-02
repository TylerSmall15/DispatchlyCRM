"use client"

import * as React from "react"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { CreateClientDialog } from "@/components/clients/create-client-dialog"
import { ClientDetailDialog } from "@/components/clients/client-detail-dialog"
import { ClientsDataTable } from "@/components/clients/clients-data-table"
import FadeContent from "@/components/fade-content"

// Client interface
export interface Client {
  id: string
  name: string
  contact: string
  phone: string
  address: string
  jobs: number
  notes: string
  created: string
}

// Mock data
const mockClients: Client[] = [
  {
    id: "C-001",
    name: "John Peterson",
    contact: "john.peterson@gmail.com",
    phone: "(631) 555-1234",
    address: "45 Bay Avenue, Islip, NY",
    jobs: 3,
    notes: "Requested annual maintenance plan.",
    created: "2024-08-15",
  },
  {
    id: "C-002",
    name: "Lisa Kim",
    contact: "lisa.kim@yahoo.com",
    phone: "(631) 555-5678",
    address: "19 Ocean Blvd, Long Beach, NY",
    jobs: 1,
    notes: "Requested quote for bathroom remodel.",
    created: "2024-09-22",
  },
  {
    id: "C-003",
    name: "Robert Johnson",
    contact: "rjohnson@example.com",
    phone: "(631) 555-4321",
    address: "88 Maple Street, Huntington, NY",
    jobs: 5,
    notes: "Preferred customer. Always pays on time.",
    created: "2023-12-10",
  },
  {
    id: "C-004",
    name: "Maria Garcia",
    contact: "maria.g@example.com",
    phone: "(631) 555-9876",
    address: "156 Pine Road, Bay Shore, NY",
    jobs: 2,
    notes: "Prefers morning appointments only.",
    created: "2024-06-18",
  },
  {
    id: "C-005",
    name: "David Chen",
    contact: "dchen@gmail.com",
    phone: "(631) 555-7890",
    address: "22 Oak Lane, Smithtown, NY",
    jobs: 4,
    notes: "Commercial property owner with multiple locations.",
    created: "2024-03-05",
  },
  {
    id: "C-006",
    name: "Jennifer Martinez",
    contact: "j.martinez@live.com",
    phone: "(631) 555-3456",
    address: "99 Elm Street, Patchogue, NY",
    jobs: 1,
    notes: "New customer from referral.",
    created: "2024-10-12",
  },
  {
    id: "C-007",
    name: "Michael Williams",
    contact: "mwilliams@example.com",
    phone: "(631) 555-2468",
    address: "67 Cedar Avenue, Ronkonkoma, NY",
    jobs: 6,
    notes: "Regular maintenance contract customer.",
    created: "2023-09-30",
  },
  {
    id: "C-008",
    name: "Sarah Thompson",
    contact: "sarah.t@gmail.com",
    phone: "(631) 555-7531",
    address: "134 Birch Drive, Hauppauge, NY",
    jobs: 2,
    notes: "Emergency service only.",
    created: "2024-07-25",
  },
  {
    id: "C-009",
    name: "James Anderson",
    contact: "janderson@live.com",
    phone: "(631) 555-8765",
    address: "45 Walnut Court, Deer Park, NY",
    jobs: 3,
    notes: "Prefers email communication.",
    created: "2024-05-14",
  },
  {
    id: "C-010",
    name: "Emily Davis",
    contact: "emily.davis@example.com",
    phone: "(631) 555-2109",
    address: "78 Spruce Lane, Brentwood, NY",
    jobs: 1,
    notes: "First-time customer.",
    created: "2024-10-28",
  },
]

export default function ClientsPage() {
  const [clients, setClients] = React.useState<Client[]>(mockClients)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] = React.useState(false)
  const [selectedClient, setSelectedClient] = React.useState<Client | null>(null)

  const filteredClients = React.useMemo(() => {
    if (!searchQuery) return clients

    const query = searchQuery.toLowerCase()
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.contact.toLowerCase().includes(query) ||
        client.address.toLowerCase().includes(query) ||
        client.id.toLowerCase().includes(query)
    )
  }, [clients, searchQuery])

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
  }

  const handleEditClient = (client: Client) => {
    setSelectedClient(client)
  }

  const handleDeleteClient = (id: string) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id))
    toast.success("Client deleted successfully")
  }

  const handleCreateClient = (newClient: Omit<Client, "id" | "created">) => {
    const client: Client = {
      ...newClient,
      id: `C-${String(Math.floor(Math.random() * 10000)).padStart(3, "0")}`,
      created: new Date().toISOString().split("T")[0],
    }
    setClients((prevClients) => [client, ...prevClients])
    toast.success("Client created successfully")
  }

  const handleSaveClient = (updatedClient: Client) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    )
    toast.success("Client updated successfully")
  }

  return (
    <>
      <SiteHeader title="Clients" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col gap-4 px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Clients</h1>
                <Button 
                  onClick={() => setIsCreateClientDialogOpen(true)} 
                  size="sm"
                  data-create-client
                >
                  <IconPlus className="mr-2 size-4" />
                  Add Client
                </Button>
              </div>
              <Input
                type="search"
                placeholder="Search clients by name, contact, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <ClientsDataTable
                data={filteredClients}
                onViewClient={handleViewClient}
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
              />
            </FadeContent>
          </div>
        </div>

        <CreateClientDialog
          open={isCreateClientDialogOpen}
          onOpenChange={setIsCreateClientDialogOpen}
          onCreateClient={handleCreateClient}
        />

        {selectedClient && (
          <ClientDetailDialog
            client={selectedClient}
            open={!!selectedClient}
            onOpenChange={() => setSelectedClient(null)}
            onSaveClient={handleSaveClient}
          />
        )}
      </div>
    </>
  )
}
