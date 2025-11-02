"use client"

import * as React from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { IconUpload, IconX } from "@tabler/icons-react"
import type { Job } from "@/app/(dashboard)/jobs/page"

interface JobDetailDialogProps {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (job: Job) => void
}

export function JobDetailDialog({
  job,
  open,
  onOpenChange,
  onSave,
}: JobDetailDialogProps) {
  const [editedJob, setEditedJob] = React.useState<Job>(job)

  React.useEffect(() => {
    setEditedJob(job)
  }, [job])

  const handleSave = () => {
    onSave(editedJob)
  }

  const statusColors = {
    Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Job Details</DialogTitle>
              <DialogDescription>
                {editedJob.id} • View and edit job information
              </DialogDescription>
            </div>
            <Badge
              variant="secondary"
              className={statusColors[editedJob.status]}
            >
              {editedJob.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Client Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Client Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lead">Client Name</Label>
                  <Input
                    id="lead"
                    value={editedJob.lead}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, lead: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedJob.phone}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Service Address</Label>
              <Input
                id="address"
                value={editedJob.address}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, address: e.target.value })
                }
              />
            </div>
          </div>

          <Separator />

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Job Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="technician">Assigned Technician</Label>
                <Select
                  value={editedJob.technician}
                  onValueChange={(value) =>
                    setEditedJob({ ...editedJob, technician: value })
                  }
                >
                  <SelectTrigger id="technician">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mike Torres">Mike Torres</SelectItem>
                    <SelectItem value="James Chen">James Chen</SelectItem>
                    <SelectItem value="Lisa Rodriguez">Lisa Rodriguez</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedJob.status}
                  onValueChange={(value: Job["status"]) =>
                    setEditedJob({ ...editedJob, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={editedJob.date}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  value={editedJob.time}
                  onChange={(e) =>
                    setEditedJob({ ...editedJob, time: e.target.value })
                  }
                  placeholder="e.g., 10:30 AM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={editedJob.description || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, description: e.target.value })
                }
                placeholder="Describe the job requirements..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editedJob.notes || ""}
                onChange={(e) =>
                  setEditedJob({ ...editedJob, notes: e.target.value })
                }
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Job Photos</h3>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IconUpload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or HEIC (MAX. 10MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" multiple accept="image/*" />
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              * Photo upload is currently mocked for UI demonstration
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

