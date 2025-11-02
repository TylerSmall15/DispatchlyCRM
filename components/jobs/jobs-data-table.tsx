"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconDotsVertical,
  IconLayoutColumns,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { JobDetailDialog } from "./job-detail-dialog"
import type { Job } from "@/app/(dashboard)/jobs/page"

interface JobsDataTableProps {
  jobs: Job[]
  onUpdateJob: (job: Job) => void
  onDeleteJob: (jobId: string) => void
  onCreateJob: () => void
}

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
}

export function JobsDataTable({
  jobs,
  onUpdateJob,
  onDeleteJob,
  onCreateJob,
}: JobsDataTableProps) {
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = React.useState(false)

  // Filter jobs by status for each tab
  const scheduledJobs = jobs.filter((job) => job.status === "Scheduled")
  const inProgressJobs = jobs.filter((job) => job.status === "In Progress")
  const completedJobs = jobs.filter((job) => job.status === "Completed")

  const handleViewJob = (job: Job) => {
    setSelectedJob(job)
    setDetailDialogOpen(true)
  }

  const handleSaveJob = (updatedJob: Job) => {
    onUpdateJob(updatedJob)
    setDetailDialogOpen(false)
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      onDeleteJob(jobId)
    }
  }

  const renderJobTable = (jobList: Job[]) => (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="hidden md:table-cell">Address</TableHead>
            <TableHead className="hidden lg:table-cell">Technician</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            jobList.map((job) => (
              <TableRow
                key={job.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewJob(job)}
              >
                <TableCell className="font-medium">{job.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{job.lead}</div>
                    <div className="text-sm text-muted-foreground">
                      {job.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="max-w-[200px] truncate" title={job.address}>
                    {job.address}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {job.technician}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {new Date(job.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {job.time}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusColors[job.status]}
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <IconDotsVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewJob(job)}>
                        <IconPencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteJob(job.id)
                        }}
                      >
                        <IconTrash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <>
      <Tabs
        defaultValue="scheduled"
        className="w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between px-4 lg:px-6">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select defaultValue="scheduled">
            <SelectTrigger
              className="flex w-fit @4xl/main:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
            <TabsTrigger value="scheduled">
              Scheduled <Badge variant="secondary">{scheduledJobs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress <Badge variant="secondary">{inProgressJobs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed <Badge variant="secondary">{completedJobs.length}</Badge>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onCreateJob} data-create-job>
              <IconPlus />
              <span className="hidden lg:inline">Create Job</span>
            </Button>
          </div>
        </div>

        <TabsContent
          value="scheduled"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          {renderJobTable(scheduledJobs)}
        </TabsContent>

        <TabsContent
          value="in-progress"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          {renderJobTable(inProgressJobs)}
        </TabsContent>

        <TabsContent
          value="completed"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          {renderJobTable(completedJobs)}
        </TabsContent>
      </Tabs>

      {/* Job Detail Dialog */}
      {selectedJob && (
        <JobDetailDialog
          job={selectedJob}
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          onSave={handleSaveJob}
        />
      )}
    </>
  )
}

