"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconDotsVertical,
  IconPencil,
  IconPlus,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  Converted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
}

interface QuotesDataTableProps {
  data: Quote[]
  onViewQuote: (quote: Quote) => void
  onEditQuote: (quote: Quote) => void
  onDeleteQuote: (id: string) => void
  onCreateQuote: () => void
}

export function QuotesDataTable({
  data,
  onViewQuote,
  onEditQuote,
  onDeleteQuote,
  onCreateQuote,
}: QuotesDataTableProps) {
  const [filterStatus, setFilterStatus] = React.useState<string>("all")

  const filteredQuotes = React.useMemo(() => {
    if (filterStatus === "all") return data
    return data.filter((quote) => quote.status === filterStatus)
  }, [data, filterStatus])

  const getStatusCount = (status: string) => {
    if (status === "all") return data.length
    return data.filter((quote) => quote.status === status).length
  }

  const handleViewQuote = (quote: Quote) => {
    onViewQuote(quote)
  }

  const handleDeleteQuote = (id: string) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      onDeleteQuote(id)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="relative flex flex-col gap-4">
      <Tabs
        value={filterStatus}
        onValueChange={setFilterStatus}
        className="w-full"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Quotes</h1>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="@4xl/main:hidden" size="sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({getStatusCount("all")})</SelectItem>
                <SelectItem value="Pending">
                  Pending ({getStatusCount("Pending")})
                </SelectItem>
                <SelectItem value="Approved">
                  Approved ({getStatusCount("Approved")})
                </SelectItem>
                <SelectItem value="Rejected">
                  Rejected ({getStatusCount("Rejected")})
                </SelectItem>
                <SelectItem value="Converted">
                  Converted ({getStatusCount("Converted")})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onCreateQuote} size="sm">
            <IconPlus className="mr-2 size-4" />
            Create Quote
          </Button>
        </div>
        <div className="px-4 lg:px-6">
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="all">
              All <Badge variant="secondary">{getStatusCount("all")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Pending">
              Pending <Badge variant="secondary">{getStatusCount("Pending")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Approved">
              Approved <Badge variant="secondary">{getStatusCount("Approved")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Rejected">
              Rejected <Badge variant="secondary">{getStatusCount("Rejected")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Converted">
              Converted{" "}
              <Badge variant="secondary">{getStatusCount("Converted")}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Quote ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Estimate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote) => (
                <TableRow
                  key={quote.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleViewQuote(quote)}
                >
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>{quote.client}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {quote.contact}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">{quote.service}</div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(quote.estimate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[quote.status]}>
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(quote.created).toLocaleDateString()}
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
                        <DropdownMenuItem onClick={() => handleViewQuote(quote)}>
                          <IconPencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteQuote(quote.id)
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
                <TableCell colSpan={8} className="h-24 text-center">
                  No quotes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

