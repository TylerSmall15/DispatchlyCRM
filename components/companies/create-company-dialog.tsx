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

interface NewCompany {
  name: string
  contact: string
  phone: string
  address: string
  totalJobs: number
  revenue: number
  notes: string
}

interface CreateCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateCompany: (company: NewCompany) => void
}

export function CreateCompanyDialog({
  open,
  onOpenChange,
  onCreateCompany,
}: CreateCompanyDialogProps) {
  const [newCompany, setNewCompany] = React.useState<NewCompany>({
    name: "",
    contact: "",
    phone: "",
    address: "",
    totalJobs: 0,
    revenue: 0,
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!newCompany.name.trim()) {
      toast.error("Please enter a company name")
      return
    }
    if (!newCompany.contact.trim()) {
      toast.error("Please enter email address")
      return
    }
    if (!newCompany.phone.trim()) {
      toast.error("Please enter phone number")
      return
    }
    if (!newCompany.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onCreateCompany(newCompany)
    onOpenChange(false)

    // Reset form
    setNewCompany({
      name: "",
      contact: "",
      phone: "",
      address: "",
      totalJobs: 0,
      revenue: 0,
      notes: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setNewCompany({
      name: "",
      contact: "",
      phone: "",
      address: "",
      totalJobs: 0,
      revenue: 0,
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Fill in the details for the new company. All fields marked with * are
            required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Acme Corporation"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
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
                placeholder="contact@company.com"
                value={newCompany.contact}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, contact: e.target.value })
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
                value={newCompany.phone}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, phone: e.target.value })
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
              placeholder="123 Business St, City, State ZIP"
              value={newCompany.address}
              onChange={(e) =>
                setNewCompany({ ...newCompany, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any relevant notes about this company..."
              rows={4}
              value={newCompany.notes}
              onChange={(e) => setNewCompany({ ...newCompany, notes: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

