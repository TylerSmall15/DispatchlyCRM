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

interface NewLead {
  name: string
  contact: string
  address: string
  clientType: "Client" | "Company"
  stage: "Lead" | "Quote" | "Job"
  status: "New" | "Contacted" | "Quoted" | "Closed-Won" | "Closed-Lost" | "Not Interested"
  quotePrice?: string
  notes: string
}

interface CreateLeadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateLead: (lead: NewLead) => void
}

export function CreateLeadDialog({
  open,
  onOpenChange,
  onCreateLead,
}: CreateLeadDialogProps) {
  const [newLead, setNewLead] = React.useState<NewLead>({
    name: "",
    contact: "",
    address: "",
    clientType: "Client",
    stage: "Lead",
    status: "New",
    quotePrice: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!newLead.name.trim()) {
      toast.error("Please enter a name")
      return
    }
    if (!newLead.contact.trim()) {
      toast.error("Please enter contact information")
      return
    }
    if (!newLead.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onCreateLead(newLead)
    onOpenChange(false)

    // Reset form
    setNewLead({
      name: "",
      contact: "",
      address: "",
      clientType: "Client",
      stage: "Lead",
      status: "New",
      quotePrice: "",
      notes: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setNewLead({
      name: "",
      contact: "",
      address: "",
      clientType: "Client",
      stage: "Lead",
      status: "New",
      quotePrice: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Fill in the details for the new lead. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">
              Email or Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              placeholder="john@example.com or (555) 123-4567"
              value={newLead.contact}
              onChange={(e) =>
                setNewLead({ ...newLead, contact: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State ZIP"
              value={newLead.address}
              onChange={(e) =>
                setNewLead({ ...newLead, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="client-type">Client Type</Label>
              <Select
                value={newLead.clientType}
                onValueChange={(value: NewLead["clientType"]) =>
                  setNewLead({ ...newLead, clientType: value })
                }
              >
                <SelectTrigger id="client-type">
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Client">Client</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newLead.status}
                onValueChange={(value: NewLead["status"]) =>
                  setNewLead({ ...newLead, status: value })
                }
              >
                <SelectTrigger id="status">
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
              <Label htmlFor="stage">Stage</Label>
              <Select
                value={newLead.stage}
                onValueChange={(value: NewLead["stage"]) =>
                  setNewLead({ ...newLead, stage: value })
                }
              >
                <SelectTrigger id="stage">
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
            <Label htmlFor="quote-price">Quote Price</Label>
            <Input
              id="quote-price"
              type="text"
              placeholder="$0.00"
              value={newLead.quotePrice || ""}
              onChange={(e) =>
                setNewLead({ ...newLead, quotePrice: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this lead..."
              rows={4}
              value={newLead.notes}
              onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

