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

interface CompaniesDataTableProps {
  data: Company[]
  onViewCompany: (company: Company) => void
  onEditCompany: (company: Company) => void
  onDeleteCompany: (id: string) => void
}

export function CompaniesDataTable({
  data,
  onViewCompany,
  onEditCompany,
  onDeleteCompany,
}: CompaniesDataTableProps) {
  const handleViewCompany = (company: Company) => {
    onViewCompany(company)
  }

  const handleDeleteCompany = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      onDeleteCompany(id)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Company ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden lg:table-cell">Address</TableHead>
            <TableHead>Total Jobs</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((company) => (
              <TableRow
                key={company.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewCompany(company)}
              >
                <TableCell className="font-medium">{company.id}</TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="max-w-[200px] truncate">{company.contact}</div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="max-w-[250px] truncate">{company.address}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{company.totalJobs} jobs</Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(company.revenue)}
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
                      <DropdownMenuItem onClick={() => handleViewCompany(company)}>
                        <IconPencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteCompany(company.id)
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
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

