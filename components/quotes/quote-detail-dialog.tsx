"use client"

import * as React from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
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

interface QuoteDetailDialogProps {
  quote: Quote
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveQuote: (quote: Quote) => void
}

export function QuoteDetailDialog({
  quote,
  open,
  onOpenChange,
  onSaveQuote,
}: QuoteDetailDialogProps) {
  const [editedQuote, setEditedQuote] = React.useState<Quote>(quote)

  React.useEffect(() => {
    setEditedQuote(quote)
  }, [quote])

  const handleSave = () => {
    // Basic validation
    if (!editedQuote.client.trim()) {
      toast.error("Please enter a client name")
      return
    }
    if (!editedQuote.contact.trim()) {
      toast.error("Please enter contact information")
      return
    }
    if (!editedQuote.service.trim()) {
      toast.error("Please enter service description")
      return
    }
    if (editedQuote.estimate <= 0) {
      toast.error("Please enter a valid estimate amount")
      return
    }

    onSaveQuote(editedQuote)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Quote Details: {quote.id}</DialogTitle>
          <DialogDescription>View or edit quote information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {editedQuote.status === "Converted" && (
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Converted to Job
                </Badge>
                <span className="text-sm text-muted-foreground">
                  This quote has been converted to a job.
                </span>
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="edit-client">
              Client Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-client"
              value={editedQuote.client}
              onChange={(e) =>
                setEditedQuote({ ...editedQuote, client: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-contact">
              Contact Info <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-contact"
              value={editedQuote.contact}
              onChange={(e) =>
                setEditedQuote({ ...editedQuote, contact: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-service">
              Service Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="edit-service"
              rows={3}
              value={editedQuote.service}
              onChange={(e) =>
                setEditedQuote({ ...editedQuote, service: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-estimate">
                Estimate <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-estimate"
                type="number"
                min="0"
                step="0.01"
                value={editedQuote.estimate}
                onChange={(e) =>
                  setEditedQuote({
                    ...editedQuote,
                    estimate: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={editedQuote.status}
                onValueChange={(value: Quote["status"]) =>
                  setEditedQuote({ ...editedQuote, status: value })
                }
              >
                <SelectTrigger id="edit-status">
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
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              rows={4}
              value={editedQuote.notes}
              onChange={(e) =>
                setEditedQuote({ ...editedQuote, notes: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Created</Label>
            <Input
              value={new Date(editedQuote.created).toLocaleDateString()}
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

