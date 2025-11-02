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

interface NewQuote {
  client: string
  contact: string
  service: string
  estimate: number
  status: "Pending" | "Approved" | "Rejected" | "Converted"
  notes: string
}

interface CreateQuoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateQuote: (quote: NewQuote) => void
}

export function CreateQuoteDialog({
  open,
  onOpenChange,
  onCreateQuote,
}: CreateQuoteDialogProps) {
  const [newQuote, setNewQuote] = React.useState<NewQuote>({
    client: "",
    contact: "",
    service: "",
    estimate: 0,
    status: "Pending",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!newQuote.client.trim()) {
      toast.error("Please enter a client name")
      return
    }
    if (!newQuote.contact.trim()) {
      toast.error("Please enter contact information")
      return
    }
    if (!newQuote.service.trim()) {
      toast.error("Please enter service description")
      return
    }
    if (newQuote.estimate <= 0) {
      toast.error("Please enter a valid estimate amount")
      return
    }

    onCreateQuote(newQuote)
    onOpenChange(false)

    // Reset form
    setNewQuote({
      client: "",
      contact: "",
      service: "",
      estimate: 0,
      status: "Pending",
      notes: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setNewQuote({
      client: "",
      contact: "",
      service: "",
      estimate: 0,
      status: "Pending",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Quote</DialogTitle>
          <DialogDescription>
            Fill in the details for the new quote. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="client">
              Client Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="client"
              placeholder="John Doe"
              value={newQuote.client}
              onChange={(e) => setNewQuote({ ...newQuote, client: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">
              Contact Info <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              placeholder="john@example.com or (555) 123-4567"
              value={newQuote.contact}
              onChange={(e) =>
                setNewQuote({ ...newQuote, contact: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service">
              Service Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="service"
              placeholder="Describe the service or work to be performed..."
              rows={3}
              value={newQuote.service}
              onChange={(e) => setNewQuote({ ...newQuote, service: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="estimate">
                Estimate <span className="text-destructive">*</span>
              </Label>
              <Input
                id="estimate"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={newQuote.estimate || ""}
                onChange={(e) =>
                  setNewQuote({ ...newQuote, estimate: parseFloat(e.target.value) || 0 })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newQuote.status}
                onValueChange={(value: NewQuote["status"]) =>
                  setNewQuote({ ...newQuote, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or comments..."
              rows={4}
              value={newQuote.notes}
              onChange={(e) => setNewQuote({ ...newQuote, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Quote</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

