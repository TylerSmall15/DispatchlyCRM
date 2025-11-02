/**
 * JOBS PAGE COMPONENT
 * 
 * Purpose:
 * Operational hub for managing job scheduling, assignments, and tracking.
 * Enables dispatchers and managers to view, create, edit, and delete jobs.
 * 
 * Key Features:
 * - Job Data Table: Displays all jobs with filtering, sorting, and pagination
 * - Create Job Dialog: Modal form for scheduling new jobs
 * - Job Detail Dialog: View/edit existing job details (triggered from table actions)
 * - Status Management: Visual badges for Scheduled, In Progress, and Completed statuses
 * - Technician Assignment: Track which team member is assigned to each job
 * 
 * Data Flow:
 * - Client-side state management using React hooks (useState)
 * - Mock data initialized with 8 sample jobs
 * - CRUD operations update local state (ready for API integration)
 * - Real-time updates reflected in the data table
 * 
 * Integration Points:
 * - Ready for backend API: Replace mockJobs with API calls
 * - Job IDs auto-generated with sequential numbering (JOB-001, JOB-002, etc.)
 * - Technician list dynamically extracted from existing jobs
 */

"use client"

import * as React from "react"
import { SiteHeader } from "@/components/site-header"
import { JobsDataTable } from "@/components/jobs/jobs-data-table"
import { CreateJobDialog } from "@/components/jobs/create-job-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconFilter, IconPlus } from "@tabler/icons-react"
import FadeContent from "@/components/fade-content"

/**
 * JOB INTERFACE
 * 
 * Defines the data structure for a job record.
 * 
 * Required Fields:
 * @param {string} id - Unique identifier (format: JOB-XXX)
 * @param {string} lead - Customer/client name
 * @param {string} phone - Contact phone number
 * @param {string} address - Job location address
 * @param {string} technician - Assigned team member name
 * @param {string} date - Job date (ISO format: YYYY-MM-DD)
 * @param {string} time - Job time (format: HH:MM AM/PM)
 * @param {string} status - Current job status (Scheduled | In Progress | Completed)
 * 
 * Optional Fields:
 * @param {string} description - Detailed job description/scope of work
 * @param {string} notes - Internal notes, special instructions, or customer preferences
 */
export interface Job {
  id: string
  lead: string
  phone: string
  address: string
  technician: string
  date: string
  time: string
  status: "Scheduled" | "In Progress" | "Completed"
  description?: string
  notes?: string
}

/**
 * MOCK JOB DATA
 * 
 * Sample job records for development and testing.
 * In production, this would be replaced with API calls to fetch real job data.
 * 
 * Data includes:
 * - Mix of Scheduled, In Progress, and Completed jobs
 * - Various technicians (Mike Torres, James Chen, Lisa Rodriguez)
 * - Different job types (emergency repairs, installations, inspections, restoration)
 * - Both residential and commercial jobs
 */
const mockJobs: Job[] = [
  {
    id: "JOB-001",
    lead: "John Doe",
    phone: "631-555-2938",
    address: "24 Oak Street, Huntington, NY",
    technician: "Mike Torres",
    date: "2025-10-31",
    time: "10:30 AM",
    status: "Scheduled",
    description: "Emergency plumbing repair - kitchen sink leak",
    notes: "Customer prefers morning appointments",
  },
  {
    id: "JOB-002",
    lead: "Sarah Williams",
    phone: "631-555-8472",
    address: "156 Maple Ave, Smithtown, NY",
    technician: "James Chen",
    date: "2025-11-01",
    time: "2:00 PM",
    status: "In Progress",
    description: "Water heater installation",
    notes: "Requires 2-person team",
  },
  {
    id: "JOB-003",
    lead: "Robert Johnson",
    phone: "631-555-3947",
    address: "89 Pine Road, Commack, NY",
    technician: "Mike Torres",
    date: "2025-10-30",
    time: "9:00 AM",
    status: "Completed",
    description: "Routine plumbing inspection",
    notes: "Annual inspection - all systems normal",
  },
  {
    id: "JOB-004",
    lead: "Tech Solutions Inc",
    phone: "631-555-6183",
    address: "450 Industrial Parkway, Hauppauge, NY",
    technician: "Lisa Rodriguez",
    date: "2025-11-02",
    time: "8:30 AM",
    status: "Scheduled",
    description: "Commercial water damage restoration",
    notes: "Large commercial space - bring industrial equipment",
  },
  {
    id: "JOB-005",
    lead: "Emily Davis",
    phone: "631-555-2749",
    address: "67 Birch Lane, Northport, NY",
    technician: "James Chen",
    date: "2025-11-01",
    time: "11:00 AM",
    status: "Scheduled",
    description: "Pipe burst repair",
    notes: "Emergency - customer has water shut off",
  },
  {
    id: "JOB-006",
    lead: "Michael Brown",
    phone: "631-555-9284",
    address: "234 Cedar Street, East Northport, NY",
    technician: "Lisa Rodriguez",
    date: "2025-10-29",
    time: "3:00 PM",
    status: "Completed",
    description: "Drain cleaning service",
    notes: "Basement drain - tree roots removed",
  },
  {
    id: "JOB-007",
    lead: "Anderson Building",
    phone: "631-555-4821",
    address: "1200 Main Street, Huntington, NY",
    technician: "Mike Torres",
    date: "2025-11-03",
    time: "1:00 PM",
    status: "Scheduled",
    description: "Fire sprinkler system inspection",
    notes: "Annual inspection required by code",
  },
  {
    id: "JOB-008",
    lead: "Jennifer Wilson",
    phone: "631-555-7392",
    address: "45 Sunset Drive, Centerport, NY",
    technician: "James Chen",
    date: "2025-11-01",
    time: "4:30 PM",
    status: "In Progress",
    description: "Bathroom renovation - plumbing work",
    notes: "Part of larger renovation project",
  },
]

export default function JobsPage() {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Jobs State: Manages the list of all jobs
   * - Initialized with mockJobs data
   * - Updated by create, update, and delete operations
   * - In production: Would sync with backend API
   */
  const [jobs, setJobs] = React.useState<Job[]>(mockJobs)
  
  /**
   * Dialog State: Controls the visibility of the Create Job modal
   * - true: Dialog is open
   * - false: Dialog is closed
   */
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false)

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Technicians List: Dynamically extracted from existing jobs
   * - Uses Set to ensure unique values only
   * - Automatically updates when jobs are added/modified
   * - Used to populate technician dropdown in Create/Edit forms
   */
  const technicians = Array.from(new Set(jobs.map((job) => job.technician)))

  // ==================== EVENT HANDLERS ====================
  
  /**
   * CREATE JOB HANDLER
   * 
   * Handles the creation of a new job record.
   * 
   * Process:
   * 1. Receives job data without an ID (Omit<Job, "id">)
   * 2. Auto-generates sequential ID (JOB-001, JOB-002, etc.)
   * 3. Adds new job to the beginning of the jobs array (most recent first)
   * 4. Closes the create dialog
   * 
   * @param {Omit<Job, "id">} newJob - Job data without ID field
   */
  const handleCreateJob = (newJob: Omit<Job, "id">) => {
    const job: Job = {
      ...newJob,
      // Generate ID: JOB-XXX where XXX is zero-padded number
      id: `JOB-${String(jobs.length + 1).padStart(3, "0")}`,
    }
    setJobs([job, ...jobs]) // Prepend new job to list
    setCreateDialogOpen(false)
  }

  /**
   * UPDATE JOB HANDLER
   * 
   * Handles updates to existing job records.
   * 
   * Process:
   * 1. Receives fully updated job object with existing ID
   * 2. Maps through jobs array and replaces the matching job
   * 3. Preserves order and other jobs unchanged
   * 
   * @param {Job} updatedJob - Complete job object with updates
   */
  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)))
  }

  /**
   * DELETE JOB HANDLER
   * 
   * Handles removal of a job record.
   * 
   * Process:
   * 1. Receives job ID to delete
   * 2. Filters out the job with matching ID
   * 3. Updates state with remaining jobs
   * 
   * @param {string} jobId - Unique identifier of job to delete
   */
  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter((job) => job.id !== jobId))
  }

  // ==================== RENDER ====================
  
  return (
    <>
      {/* PAGE HEADER: Displays breadcrumb navigation and page title */}
      <SiteHeader title="Jobs" />
      
      {/* MAIN CONTENT CONTAINER: Full height flex layout */}
      <div className="flex flex-1 flex-col">
        {/* Container Query Wrapper: Enables responsive design based on container width */}
        <div className="@container/main flex flex-1 flex-col gap-2">
          {/* Content Grid: Responsive padding and gap spacing */}
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* PAGE TITLE SECTION */}
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-semibold">Jobs</h1>
            </div>
            
            {/* 
              JOBS DATA TABLE COMPONENT
              
              Main table displaying all job records with full CRUD functionality.
              
              Features:
              - Sortable columns (click header to sort)
              - Drag-and-drop row reordering
              - Multi-row selection with checkboxes
              - Pagination (10/20/30/40/50 rows per page)
              - Column visibility toggle
              - Actions dropdown (Edit/Delete) on each row
              - "Create Job" button in table header
              - Status badges with color coding:
                * Scheduled - Yellow badge
                * In Progress - Blue badge
                * Completed - Green badge
              - Animated with fade-in from right effect
              
              Props:
              - jobs: Array of job records to display
              - onUpdateJob: Callback when job is edited (opens edit dialog internally)
              - onDeleteJob: Callback when job is deleted (with confirmation)
              - onCreateJob: Callback to open create dialog
            */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <JobsDataTable
                jobs={jobs}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
                onCreateJob={() => setCreateDialogOpen(true)}
              />
            </FadeContent>
          </div>
        </div>
      </div>

      {/* 
        CREATE JOB DIALOG COMPONENT
        
        Modal form for creating new job records.
        
        Form Fields:
        - Lead Name (text input, required)
        - Phone Number (tel input, required)
        - Address (text input, required)
        - Technician (dropdown select, required) - Populated from technicians list
        - Date (date picker, required)
        - Time (time picker, required)
        - Description (textarea, optional)
        - Notes (textarea, optional)
        - Status (select, default: "Scheduled")
        
        Behavior:
        - Opens when createDialogOpen is true
        - Validates required fields before submission
        - Calls handleCreateJob on successful form submission
        - Automatically closes on successful creation or cancellation
        - Form resets after successful creation
        
        Props:
        - open: Controls dialog visibility
        - onOpenChange: Callback to toggle dialog open/closed
        - onCreateJob: Callback with new job data (without ID)
        - technicians: List of available technicians for dropdown
      */}
      <CreateJobDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateJob={handleCreateJob}
        technicians={technicians}
      />
    </>
  )
}
