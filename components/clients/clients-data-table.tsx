"use client"

import * as React from "react"
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

interface ClientsDataTableProps {
  data: Client[]
  onViewClient: (client: Client) => void
  onEditClient: (client: Client) => void
  onDeleteClient: (id: string) => void
}

export function ClientsDataTable({
  data,
  onViewClient,
  onEditClient,
  onDeleteClient,
}: ClientsDataTableProps) {
  const handleViewClient = (client: Client) => {
    onViewClient(client)
  }

  const handleDeleteClient = (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      onDeleteClient(id)
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Client ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden lg:table-cell">Address</TableHead>
            <TableHead>Recent Jobs</TableHead>
            <TableHead className="hidden xl:table-cell">Notes</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((client) => (
              <TableRow
                key={client.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewClient(client)}
              >
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {client.contact}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="max-w-[250px] truncate">{client.address}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.jobs} jobs</Badge>
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <div className="max-w-[200px] truncate text-muted-foreground">
                    {client.notes}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <IconDotsVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewClient(client)}>
                        <IconPencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClient(client.id)
                        }}
                      >
                        <IconTrash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No clients found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

