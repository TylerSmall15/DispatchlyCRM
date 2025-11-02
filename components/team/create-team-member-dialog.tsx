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
import { TeamMember } from "@/app/(dashboard)/team/page"

interface NewTeamMember {
  name: string
  role: string
  email: string
  contact: string
  status: "Active" | "Inactive"
  avatar: string
}

interface CreateTeamMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTeamMember: (member: NewTeamMember) => void
}

const ROLE_OPTIONS = [
  "Lead Technician",
  "Field Technician",
  "Dispatcher",
  "Admin",
  "Manager",
]

export function CreateTeamMemberDialog({
  open,
  onOpenChange,
  onCreateTeamMember,
}: CreateTeamMemberDialogProps) {
  const [newMember, setNewMember] = React.useState<NewTeamMember>({
    name: "",
    role: "",
    email: "",
    contact: "",
    status: "Active",
    avatar: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!newMember.name.trim()) {
      toast.error("Please enter a name")
      return
    }
    if (!newMember.role) {
      toast.error("Please select a role")
      return
    }
    if (!newMember.email.trim()) {
      toast.error("Please enter an email address")
      return
    }
    if (!newMember.contact.trim()) {
      toast.error("Please enter a contact number")
      return
    }

    // Generate avatar initials from name
    const nameParts = newMember.name.trim().split(" ")
    const initials =
      nameParts.length >= 2
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : newMember.name.substring(0, 2).toUpperCase()

    onCreateTeamMember({
      ...newMember,
      avatar: initials,
    })
    onOpenChange(false)

    // Reset form
    setNewMember({
      name: "",
      role: "",
      email: "",
      contact: "",
      status: "Active",
      avatar: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setNewMember({
      name: "",
      role: "",
      email: "",
      contact: "",
      status: "Active",
      avatar: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new team member to your organization.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select value={newMember.role} onValueChange={(value) => setNewMember({ ...newMember, role: value })}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@dispatchly.com"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">
              Contact Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              type="tel"
              placeholder="(631) 555-1234"
              value={newMember.contact}
              onChange={(e) => setNewMember({ ...newMember, contact: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={newMember.status}
              onValueChange={(value: "Active" | "Inactive") =>
                setNewMember({ ...newMember, status: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

