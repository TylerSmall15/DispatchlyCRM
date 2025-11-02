"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconDotsVertical,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { useDynamicPageSize } from "@/hooks/use-dynamic-page-size"
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
import { DataTablePagination } from "@/components/data-table-pagination"

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

const statusColors = {
  New: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  Quoted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Closed-Won": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "Closed-Lost": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  "Not Interested": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
}

interface LeadsDataTableProps {
  data: Lead[]
  onViewLead: (lead: Lead) => void
  onEditLead: (lead: Lead) => void
  onDeleteLead: (id: string) => void
  onCreateLead: () => void
}

export function LeadsDataTable({
  data,
  onViewLead,
  onEditLead,
  onDeleteLead,
  onCreateLead,
}: LeadsDataTableProps) {
  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const dynamicPageSize = useDynamicPageSize()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: dynamicPageSize,
  })

  // Update pageSize when dynamicPageSize changes
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize: dynamicPageSize }))
  }, [dynamicPageSize])

  const filteredLeads = React.useMemo(() => {
    if (filterStatus === "all") return data
    return data.filter((lead) => lead.status === filterStatus)
  }, [data, filterStatus])

  const getStatusCount = (status: string) => {
    if (status === "all") return data.length
    return data.filter((lead) => lead.status === status).length
  }

  const handleViewLead = (lead: Lead) => {
    onViewLead(lead)
  }

  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      onDeleteLead(id)
    }
  }

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: "id",
      header: "Lead ID",
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => <div>{row.original.contact}</div>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <div>{row.original.address}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary" className={statusColors[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.original.notes}</div>
      ),
    },
    {
      accessorKey: "created",
      header: "Created",
      cell: ({ row }) => (
        <div>{new Date(row.original.created).toLocaleDateString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <IconDotsVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewLead(row.original)}>
              <IconPencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteLead(row.original.id)
              }}
            >
              <IconTrash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredLeads,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="relative flex flex-col gap-4">
      <Tabs
        value={filterStatus}
        onValueChange={setFilterStatus}
        className="w-full"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Leads</h1>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="@4xl/main:hidden" size="sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ({getStatusCount("all")})</SelectItem>
                <SelectItem value="New">New ({getStatusCount("New")})</SelectItem>
                <SelectItem value="Contacted">
                  Contacted ({getStatusCount("Contacted")})
                </SelectItem>
                <SelectItem value="Quoted">
                  Quoted ({getStatusCount("Quoted")})
                </SelectItem>
                <SelectItem value="Closed-Won">
                  Closed-Won ({getStatusCount("Closed-Won")})
                </SelectItem>
                <SelectItem value="Closed-Lost">
                  Closed-Lost ({getStatusCount("Closed-Lost")})
                </SelectItem>
                <SelectItem value="Not Interested">
                  Not Interested ({getStatusCount("Not Interested")})
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onCreateLead} size="sm" data-create-lead>
            <IconPlus className="mr-2 size-4" />
            Create Lead
          </Button>
        </div>
        <div className="px-4 lg:px-6">
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="all">
              All <Badge variant="secondary">{getStatusCount("all")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="New">
              New <Badge variant="secondary">{getStatusCount("New")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Contacted">
              Contacted <Badge variant="secondary">{getStatusCount("Contacted")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Quoted">
              Quoted <Badge variant="secondary">{getStatusCount("Quoted")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Closed-Won">
              Closed-Won <Badge variant="secondary">{getStatusCount("Closed-Won")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Closed-Lost">
              Closed-Lost <Badge variant="secondary">{getStatusCount("Closed-Lost")}</Badge>
            </TabsTrigger>
            <TabsTrigger value="Not Interested">
              Not Interested{" "}
              <Badge variant="secondary">{getStatusCount("Not Interested")}</Badge>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id === "address"
                          ? "hidden md:table-cell"
                          : header.column.id === "notes"
                            ? "hidden lg:table-cell"
                            : header.column.id === "created"
                              ? "hidden sm:table-cell"
                              : header.column.id === "actions"
                                ? "w-[50px]"
                                : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted/50"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => handleViewLead(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "address"
                          ? "hidden md:table-cell"
                          : cell.column.id === "notes"
                            ? "hidden lg:table-cell"
                            : cell.column.id === "created"
                              ? "hidden sm:table-cell"
                              : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <DataTablePagination table={table} />
    </div>
  )
}

