"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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

interface LeadDetailDialogProps {
  lead: Lead
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveLead: (lead: Lead) => void
}

export function LeadDetailDialog({
  lead,
  open,
  onOpenChange,
  onSaveLead,
}: LeadDetailDialogProps) {
  const [editedLead, setEditedLead] = React.useState<Lead>(lead)

  React.useEffect(() => {
    setEditedLead(lead)
  }, [lead])

  const handleSave = () => {
    // Basic validation
    if (!editedLead.name.trim()) {
      toast.error("Please enter a name")
      return
    }
    if (!editedLead.contact.trim()) {
      toast.error("Please enter contact information")
      return
    }
    if (!editedLead.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onSaveLead(editedLead)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Lead Details: {lead.id}</DialogTitle>
          <DialogDescription>View or edit lead information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editedLead.name}
              onChange={(e) =>
                setEditedLead({ ...editedLead, name: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-contact">
              Email or Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-contact"
              value={editedLead.contact}
              onChange={(e) =>
                setEditedLead({ ...editedLead, contact: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-address"
              value={editedLead.address}
              onChange={(e) =>
                setEditedLead({ ...editedLead, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-client-type">Client Type</Label>
              <Select
                value={editedLead.clientType}
                onValueChange={(value: Lead["clientType"]) =>
                  setEditedLead({ ...editedLead, clientType: value })
                }
              >
                <SelectTrigger id="edit-client-type">
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedLead.status}
                onValueChange={(value: Lead["status"]) =>
                  setEditedLead({ ...editedLead, status: value })
                }
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Quoted">Quoted</SelectItem>
                  <SelectItem value="Closed-Won">Closed-Won</SelectItem>
                  <SelectItem value="Closed-Lost">Closed-Lost</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-stage">Stage</Label>
              <Select
                value={editedLead.stage}
                onValueChange={(value: Lead["stage"]) =>
                  setEditedLead({ ...editedLead, stage: value })
                }
              >
                <SelectTrigger id="edit-stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Quote">Quote</SelectItem>
                  <SelectItem value="Job">Job</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-quote-price">Quote Price</Label>
            <Input
              id="edit-quote-price"
              type="text"
              placeholder="$0.00"
              value={editedLead.quotePrice || ""}
              onChange={(e) =>
                setEditedLead({ ...editedLead, quotePrice: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              rows={4}
              value={editedLead.notes}
              onChange={(e) =>
                setEditedLead({ ...editedLead, notes: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Created</Label>
            <Input
              value={new Date(editedLead.created).toLocaleDateString()}
              disabled
              className="bg-muted"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

