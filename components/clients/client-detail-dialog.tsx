"use client"

import * as React from "react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { IconChevronDown } from "@tabler/icons-react"

// Client interface
export interface Client {
  id: string
  name: string
  contact: string
  phone: string
  address: string
  jobs: number
  notes: string
  created: string
}

interface ClientDetailDialogProps {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaveClient: (client: Client) => void
}

// Mock job data for demonstration
const mockClientJobs = [
  { id: "JOB-012", date: "2024-10-15", service: "Water heater installation", status: "Completed", amount: "$1,200" },
  { id: "JOB-028", date: "2024-09-03", service: "Leak repair", status: "Completed", amount: "$350" },
  { id: "JOB-045", date: "2024-07-22", service: "Annual maintenance", status: "Completed", amount: "$180" },
]

export function ClientDetailDialog({
  client,
  open,
  onOpenChange,
  onSaveClient,
}: ClientDetailDialogProps) {
  const [editedClient, setEditedClient] = React.useState<Client>(client)
  const [isJobHistoryOpen, setIsJobHistoryOpen] = React.useState(false)

  React.useEffect(() => {
    setEditedClient(client)
  }, [client])

  const handleSave = () => {
    // Basic validation
    if (!editedClient.name.trim()) {
      toast.error("Please enter a client name")
      return
    }
    if (!editedClient.contact.trim()) {
      toast.error("Please enter email address")
      return
    }
    if (!editedClient.phone.trim()) {
      toast.error("Please enter phone number")
      return
    }
    if (!editedClient.address.trim()) {
      toast.error("Please enter an address")
      return
    }

    onSaveClient(editedClient)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Client Details: {client.id}</DialogTitle>
          <DialogDescription>View or edit client information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto flex-1 scrollbar-hide">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editedClient.name}
              onChange={(e) =>
                setEditedClient({ ...editedClient, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-contact">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-contact"
                type="email"
                placeholder="email@example.com"
                value={editedClient.contact}
                onChange={(e) =>
                  setEditedClient({ ...editedClient, contact: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={editedClient.phone}
                onChange={(e) =>
                  setEditedClient({ ...editedClient, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-address">
              Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-address"
              value={editedClient.address}
              onChange={(e) =>
                setEditedClient({ ...editedClient, address: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-notes">Notes</Label>
            <Textarea
              id="edit-notes"
              rows={4}
              value={editedClient.notes}
              onChange={(e) =>
                setEditedClient({ ...editedClient, notes: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label>Client Since</Label>
            <Input
              value={new Date(editedClient.created).toLocaleDateString()}
              disabled
              className="bg-muted"
            />
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label>Job History</Label>
            <Collapsible open={isJobHistoryOpen} onOpenChange={setIsJobHistoryOpen}>
              <div className="rounded-lg border">
                <CollapsibleTrigger className="flex w-full items-center justify-between p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">Total Jobs Completed</div>
                    <Badge variant="secondary">{editedClient.jobs} jobs</Badge>
                  </div>
                  <IconChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isJobHistoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden">
                  <div className="max-h-[300px] overflow-y-auto border-t scrollbar-hide">
                    <div className="space-y-3 p-4">
                      {mockClientJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center justify-between rounded-md border p-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{job.id}</span>
                              <Badge variant="outline" className="text-xs">
                                {job.status}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {job.service}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {new Date(job.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-sm font-semibold">{job.amount}</div>
                        </div>
                      ))}
                      <p className="text-muted-foreground text-sm">
                        View full job history in the Jobs page.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
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

