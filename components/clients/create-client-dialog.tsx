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
import { Textarea } from "@/components/ui/textarea"

interface NewClient {
  name: string
  contact: string
  phone: string
  address: string
  jobs: number
  notes: string
}

interface CreateClientDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateClient: (client: NewClient) => void
}

export function CreateClientDialog({
  open,
  onOpenChange,
  onCreateClient,
}: CreateClientDialogProps) {
  const [newClient, setNewClient] = React.useState<NewClient>({
    name: "",
    contact: "",
    phone: "",
    address: "",
    jobs: 0,
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!newClient.name.trim()) {
      toast.error("Please enter a client name")
      return
    }
    if (!newClient.contact.trim()) {
      toast.error("Please enter email address")
      return
    }
    if (!newClient.phone.trim()) {
      toast.error("Please enter phone number")
      return
    }
    if (!newClient.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onCreateClient(newClient)
    onOpenChange(false)

    // Reset form
    setNewClient({
      name: "",
      contact: "",
      phone: "",
      address: "",
      jobs: 0,
      notes: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setNewClient({
      name: "",
      contact: "",
      phone: "",
      address: "",
      jobs: 0,
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Fill in the details for the new client. All fields marked with * are
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
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="contact">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contact"
                type="email"
                placeholder="john@example.com"
                value={newClient.contact}
                onChange={(e) =>
                  setNewClient({ ...newClient, contact: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({ ...newClient, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State ZIP"
              value={newClient.address}
              onChange={(e) =>
                setNewClient({ ...newClient, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this client..."
              rows={4}
              value={newClient.notes}
              onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

