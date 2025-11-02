"use client"

import * as React from "react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

// Team Member interface
export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  contact: string
  status: "Active" | "Inactive"
  avatar: string
  created: string
}

interface TeamMemberDetailDialogProps {
  teamMember: TeamMember
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveTeamMember: (member: TeamMember) => void
}

const ROLE_OPTIONS = [
  "Lead Technician",
  "Field Technician",
  "Dispatcher",
  "Admin",
  "Manager",
]

export function TeamMemberDetailDialog({
  teamMember,
  open,
  onOpenChange,
  onSaveTeamMember,
}: TeamMemberDetailDialogProps) {
  const [editedMember, setEditedMember] = React.useState<TeamMember>(teamMember)

  React.useEffect(() => {
    setEditedMember(teamMember)
  }, [teamMember])

  const handleSave = () => {
    // Basic validation
    if (!editedMember.name.trim()) {
      toast.error("Please enter a name")
      return
    }
    if (!editedMember.role) {
      toast.error("Please select a role")
      return
    }
    if (!editedMember.email.trim()) {
      toast.error("Please enter an email address")
      return
    }
    if (!editedMember.contact.trim()) {
      toast.error("Please enter a contact number")
      return
    }

    // Update avatar initials if name changed
    if (editedMember.name !== teamMember.name) {
      const nameParts = editedMember.name.trim().split(" ")
      const initials =
        nameParts.length >= 2
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
          : editedMember.name.substring(0, 2).toUpperCase()
      
      setEditedMember({ ...editedMember, avatar: initials })
      onSaveTeamMember({ ...editedMember, avatar: initials })
    } else {
      onSaveTeamMember(editedMember)
    }
    
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Team Member Details: {teamMember.id}</DialogTitle>
          <DialogDescription>View or edit team member information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto flex-1 scrollbar-hide">
          {/* Avatar Display */}
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg font-semibold">
                {editedMember.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{editedMember.name}</p>
              <p className="text-muted-foreground text-sm">{editedMember.role}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editedMember.name}
              onChange={(e) =>
                setEditedMember({ ...editedMember, name: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-role">
              Role <span className="text-destructive">*</span>
            </Label>
            <Select
              value={editedMember.role}
              onValueChange={(value) =>
                setEditedMember({ ...editedMember, role: value })
              }
            >
              <SelectTrigger id="edit-role">
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
            <Label htmlFor="edit-email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={editedMember.email}
              onChange={(e) =>
                setEditedMember({ ...editedMember, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-contact">
              Contact Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-contact"
              type="tel"
              value={editedMember.contact}
              onChange={(e) =>
                setEditedMember({ ...editedMember, contact: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-status">
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={editedMember.status}
              onValueChange={(value: "Active" | "Inactive") =>
                setEditedMember({ ...editedMember, status: value })
              }
            >
              <SelectTrigger id="edit-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Member Since</Label>
            <Input
              value={new Date(editedMember.created).toLocaleDateString()}
              disabled
              className="bg-muted"
            />
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

