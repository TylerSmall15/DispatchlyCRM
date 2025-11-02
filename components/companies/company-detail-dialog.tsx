"use client"

import * as React from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { IconChevronDown } from "@tabler/icons-react"

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

interface CompanyDetailDialogProps {
  company: Company
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveCompany: (company: Company) => void
}

// Mock job data for demonstration
const mockCompanyJobs = [
  { id: "JOB-005", date: "2024-10-20", service: "HVAC maintenance - Building A", status: "Completed", amount: "$2,400" },
  { id: "JOB-018", date: "2024-10-10", service: "Emergency plumbing repair", status: "Completed", amount: "$850" },
  { id: "JOB-032", date: "2024-09-25", service: "Quarterly inspection", status: "Completed", amount: "$1,200" },
  { id: "JOB-041", date: "2024-09-15", service: "Water heater installation", status: "Completed", amount: "$3,500" },
  { id: "JOB-056", date: "2024-08-30", service: "Pipe replacement", status: "Completed", amount: "$1,800" },
]

export function CompanyDetailDialog({
  company,
  open,
  onOpenChange,
  onSaveCompany,
}: CompanyDetailDialogProps) {
  const [editedCompany, setEditedCompany] = React.useState<Company>(company)
  const [isJobHistoryOpen, setIsJobHistoryOpen] = React.useState(false)

  React.useEffect(() => {
    setEditedCompany(company)
  }, [company])

  const handleSave = () => {
    // Basic validation
    if (!editedCompany.name.trim()) {
      toast.error("Please enter a company name")
      return
    }
    if (!editedCompany.contact.trim()) {
      toast.error("Please enter email address")
      return
    }
    if (!editedCompany.phone.trim()) {
      toast.error("Please enter phone number")
      return
    }
    if (!editedCompany.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onSaveCompany(editedCompany)
    onOpenChange(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Company Details: {company.id}</DialogTitle>
          <DialogDescription>View or edit company information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto flex-1 scrollbar-hide">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editedCompany.name}
              onChange={(e) =>
                setEditedCompany({ ...editedCompany, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-contact">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-contact"
                type="email"
                placeholder="email@company.com"
                value={editedCompany.contact}
                onChange={(e) =>
                  setEditedCompany({ ...editedCompany, contact: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={editedCompany.phone}
                onChange={(e) =>
                  setEditedCompany({ ...editedCompany, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-address"
              value={editedCompany.address}
              onChange={(e) =>
                setEditedCompany({ ...editedCompany, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              rows={4}
              value={editedCompany.notes}
              onChange={(e) =>
                setEditedCompany({ ...editedCompany, notes: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Account Since</Label>
            <Input
              value={new Date(editedCompany.created).toLocaleDateString()}
              disabled
              className="bg-muted"
            />
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Job History</Label>
            <Collapsible open={isJobHistoryOpen} onOpenChange={setIsJobHistoryOpen}>
              <div className="rounded-lg border">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium">Total Jobs Completed</div>
                      <Badge variant="secondary">{editedCompany.totalJobs} jobs</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Total Revenue</div>
                      <div className="text-sm font-semibold">
                        {formatCurrency(editedCompany.revenue)}
                      </div>
                    </div>
                  </div>
                  <IconChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isJobHistoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="max-h-[300px] overflow-y-auto border-t scrollbar-hide">
                    <div className="space-y-3 p-4">
                      {mockCompanyJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{job.id}</span>
                              <Badge variant="outline" className="text-xs">
                                {job.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {job.service}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {new Date(job.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-sm font-semibold">{job.amount}</div>
                        </div>
                      ))}
                      <p className="text-muted-foreground text-sm">
                        View full job history in the Jobs page.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
        <DialogFooter className="flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

