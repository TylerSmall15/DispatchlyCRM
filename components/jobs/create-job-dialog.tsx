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
import { Separator } from "@/components/ui/separator"
import { IconUpload } from "@tabler/icons-react"
import type { Job } from "@/app/(dashboard)/jobs/page"

interface CreateJobDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateJob: (job: Omit<Job, "id">) => void
  technicians: string[]
}

export function CreateJobDialog({
  open,
  onOpenChange,
  onCreateJob,
  technicians,
}: CreateJobDialogProps) {
  const [formData, setFormData] = React.useState<Omit<Job, "id">>({
    lead: "",
    phone: "",
    address: "",
    technician: "",
    date: "",
    time: "",
    status: "Scheduled",
    description: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.lead ||
      !formData.phone ||
      !formData.address ||
      !formData.technician ||
      !formData.date ||
      !formData.time
    ) {
      alert("Please fill in all required fields")
      return
    }
    onCreateJob(formData)
    // Reset form
    setFormData({
      lead: "",
      phone: "",
      address: "",
      technician: "",
      date: "",
      time: "",
      status: "Scheduled",
      description: "",
      notes: "",
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    // Reset form
    setFormData({
      lead: "",
      phone: "",
      address: "",
      technician: "",
      date: "",
      time: "",
      status: "Scheduled",
      description: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new service job
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Client Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Client Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="create-lead">
                      Client Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="create-lead"
                      value={formData.lead}
                      onChange={(e) =>
                        setFormData({ ...formData, lead: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="create-phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="631-555-0000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-address">
                  Service Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="create-address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="123 Main Street, City, State"
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Job Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Job Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="create-technician">
                    Assign Technician <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.technician}
                    onValueChange={(value) =>
                      setFormData({ ...formData, technician: value })
                    }
                    required
                  >
                    <SelectTrigger id="create-technician">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mike Torres">Mike Torres</SelectItem>
                      <SelectItem value="James Chen">James Chen</SelectItem>
                      <SelectItem value="Lisa Rodriguez">
                        Lisa Rodriguez
                      </SelectItem>
                      <SelectItem value="Sarah Johnson">
                        Sarah Johnson
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: Job["status"]) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger id="create-status">
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
                  <Label htmlFor="create-date">
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="create-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-time">
                    Time <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="create-time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    placeholder="10:30 AM"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-description">Job Description</Label>
                <Textarea
                  id="create-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the job requirements..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-notes">Notes</Label>
                <Textarea
                  id="create-notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add any additional notes..."
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Photo Upload Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Job Photos (Optional)</h3>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="create-dropzone-file"
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
                  <input
                    id="create-dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                * Photo upload is currently mocked for UI demonstration
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 mt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

