/**
 * TEAM PAGE COMPONENT
 * 
 * Purpose:
 * Team management hub for viewing and managing all staff members (technicians, dispatchers, admins).
 * Enables administrators to add, edit, and manage team member information and status.
 * 
 * Key Features:
 * - Team Data Table: Displays all team members with filtering, sorting, and pagination
 * - Create Team Member Dialog: Modal form for adding new team members
 * - Team Member Detail Dialog: View/edit existing team member details (triggered from table actions)
 * - Status Management: Visual badges for Active and Inactive statuses
 * - Role Assignment: Track team member roles (Lead Technician, Dispatcher, Field Technician, Admin, Manager)
 * 
 * Data Flow:
 * - Client-side state management using React hooks (useState)
 * - Mock data initialized with 10 sample team members
 * - CRUD operations update local state (ready for API integration)
 * - Real-time updates reflected in the data table
 * 
 * Integration Points:
 * - Ready for backend API: Replace mockTeamMembers with API calls
 * - Team IDs auto-generated with sequential numbering (T-001, T-002, etc.)
 * - Role list can be configured for company-specific positions
 */

"use client"

import * as React from "react"
import { IconPlus, IconLayoutGrid } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SiteHeader } from "@/components/site-header"
import { CreateTeamMemberDialog } from "@/components/team/create-team-member-dialog"
import { TeamMemberDetailDialog } from "@/components/team/team-member-detail-dialog"
import { TeamDataTable } from "@/components/team/team-data-table"
import { TeamCardView } from "@/components/team/team-card-view"
import FadeContent from "@/components/fade-content"

/**
 * TEAM MEMBER INTERFACE
 * 
 * Defines the data structure for a team member record.
 * 
 * Required Fields:
 * @param {string} id - Unique identifier (format: T-XXX)
 * @param {string} name - Full name of team member
 * @param {string} role - Job position/title
 * @param {string} email - Email address for communications
 * @param {string} contact - Phone number
 * @param {string} status - Employment status (Active | Inactive)
 * @param {string} avatar - Avatar URL or initials
 * @param {string} created - Date when member was added (ISO format)
 */
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

/**
 * MOCK TEAM MEMBER DATA
 * 
 * Sample team member records for development and testing.
 * In production, this would be replaced with API calls to fetch real team data.
 * 
 * Data includes:
 * - Mix of Active and Inactive members
 * - Various roles (Lead Technician, Dispatcher, Field Technician, Admin, Manager)
 * - Representative avatars (initials)
 */
const mockTeamMembers: TeamMember[] = [
  {
    id: "T-001",
    name: "Michael Torres",
    role: "Lead Technician",
    email: "mike.torres@dispatchly.com",
    contact: "(631) 555-1038",
    status: "Active",
    avatar: "MT",
    created: "2023-01-15",
  },
  {
    id: "T-002",
    name: "Jessica Lane",
    role: "Dispatcher",
    email: "jessica.lane@dispatchly.com",
    contact: "(631) 555-2084",
    status: "Active",
    avatar: "JL",
    created: "2023-02-20",
  },
  {
    id: "T-003",
    name: "Daniel Wright",
    role: "Field Technician",
    email: "daniel.wright@dispatchly.com",
    contact: "(631) 555-9147",
    status: "Inactive",
    avatar: "DW",
    created: "2023-03-10",
  },
  {
    id: "T-004",
    name: "Sarah Martinez",
    role: "Admin",
    email: "sarah.martinez@dispatchly.com",
    contact: "(631) 555-3421",
    status: "Active",
    avatar: "SM",
    created: "2022-11-05",
  },
  {
    id: "T-005",
    name: "James Chen",
    role: "Field Technician",
    email: "james.chen@dispatchly.com",
    contact: "(631) 555-7832",
    status: "Active",
    avatar: "JC",
    created: "2023-04-12",
  },
  {
    id: "T-006",
    name: "Lisa Rodriguez",
    role: "Field Technician",
    email: "lisa.rodriguez@dispatchly.com",
    contact: "(631) 555-6194",
    status: "Active",
    avatar: "LR",
    created: "2023-05-18",
  },
  {
    id: "T-007",
    name: "Robert Kim",
    role: "Manager",
    email: "robert.kim@dispatchly.com",
    contact: "(631) 555-4726",
    status: "Active",
    avatar: "RK",
    created: "2022-09-01",
  },
  {
    id: "T-008",
    name: "Emily Davis",
    role: "Dispatcher",
    email: "emily.davis@dispatchly.com",
    contact: "(631) 555-8953",
    status: "Active",
    avatar: "ED",
    created: "2023-06-22",
  },
  {
    id: "T-009",
    name: "Marcus Thompson",
    role: "Field Technician",
    email: "marcus.thompson@dispatchly.com",
    contact: "(631) 555-2167",
    status: "Inactive",
    avatar: "MT",
    created: "2023-07-30",
  },
  {
    id: "T-010",
    name: "Amanda Foster",
    role: "Lead Technician",
    email: "amanda.foster@dispatchly.com",
    contact: "(631) 555-5831",
    status: "Active",
    avatar: "AF",
    created: "2023-08-14",
  },
]

export default function TeamPage() {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Team Members State: Manages the list of all team members
   * - Initialized with mockTeamMembers data
   * - Updated by create, update, and delete operations
   * - In production: Would sync with backend API
   */
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>(mockTeamMembers)
  
  /**
   * Dialog States: Controls the visibility of Create and Detail modals
   */
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<TeamMember | null>(null)
  
  /**
   * Search Query State: Manages the search filter
   */
  const [searchQuery, setSearchQuery] = React.useState("")
  
  /**
   * View Mode State: Controls whether to display table or card view
   * - false: Table view (default)
   * - true: Card view
   */
  const [isCardView, setIsCardView] = React.useState(false)

  // ==================== EVENT HANDLERS ====================
  
  /**
   * CREATE TEAM MEMBER HANDLER
   * 
   * Handles the creation of a new team member record.
   * 
   * Process:
   * 1. Receives team member data without an ID (Omit<TeamMember, "id" | "created">)
   * 2. Auto-generates sequential ID (T-001, T-002, etc.)
   * 3. Adds current date as created date
   * 4. Adds new team member to the list
   * 5. Shows success toast notification
   * 
   * @param {Omit<TeamMember, "id" | "created">} newTeamMemberData - Team member data without ID and created date
   */
  const handleCreateTeamMember = (newTeamMemberData: Omit<TeamMember, "id" | "created">) => {
    const newTeamMember: TeamMember = {
      id: `T-${String(teamMembers.length + 1).padStart(3, "0")}`,
      created: new Date().toISOString().split("T")[0], // Current date
      ...newTeamMemberData,
    }
    setTeamMembers((prev) => [...prev, newTeamMember])
    toast.success("Team member added successfully!")
  }

  /**
   * SAVE TEAM MEMBER HANDLER
   * 
   * Handles updates to existing team member records.
   * 
   * Process:
   * 1. Receives fully updated team member object with existing ID
   * 2. Maps through team members array and replaces the matching member
   * 3. Preserves order and other members unchanged
   * 4. Shows success toast notification
   * 
   * @param {TeamMember} updatedTeamMember - Complete team member object with updates
   */
  const handleSaveTeamMember = (updatedTeamMember: TeamMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === updatedTeamMember.id ? updatedTeamMember : member
      )
    )
    toast.success("Team member updated successfully")
  }

  /**
   * DELETE TEAM MEMBER HANDLER
   * 
   * Handles removal of a team member record.
   * 
   * Process:
   * 1. Receives team member ID to delete
   * 2. Filters out the member with matching ID
   * 3. Updates state with remaining members
   * 4. Shows success toast notification
   * 
   * @param {string} id - Unique identifier of team member to delete
   */
  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
    toast.success("Team member removed successfully!")
  }

  /**
   * VIEW/EDIT TEAM MEMBER HANDLER
   * 
   * Opens the detail dialog for viewing/editing a team member.
   * 
   * @param {TeamMember} member - Team member to view/edit
   */
  const handleViewTeamMember = (member: TeamMember) => {
    setSelectedTeamMember(member)
  }

  const handleEditTeamMember = (member: TeamMember) => {
    setSelectedTeamMember(member)
  }

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Filtered Team Members: Client-side search filtering
   * - Searches across name, role, email, contact, and ID fields
   * - Case-insensitive matching
   * - Real-time updates as user types
   */
  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ==================== RENDER ====================
  
  return (
    <>
      {/* PAGE HEADER: Displays breadcrumb navigation and page title */}
      <SiteHeader title="Team" />
      
      {/* MAIN CONTENT CONTAINER: Full height flex layout */}
      <div className="flex flex-1 flex-col">
        {/* Container Query Wrapper: Enables responsive design based on container width */}
        <div className="@container/main flex flex-1 flex-col gap-2">
          {/* Content Grid: Responsive padding and gap spacing */}
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* HEADER SECTION: Title, action button, view toggle, and search */}
            <div className="flex flex-col gap-4 px-4 lg:px-6">
              {/* Title, View Toggle, and Add Button Row */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Team</h1>
                <div className="flex items-center gap-3">
                  {/* Card View Toggle */}
                  <div className="flex items-center gap-2">
                    <Switch
                      id="card-view"
                      checked={isCardView}
                      onCheckedChange={setIsCardView}
                    />
                    <Label
                      htmlFor="card-view"
                      className="flex items-center gap-1.5 text-sm font-medium cursor-pointer"
                    >
                      <IconLayoutGrid className="size-4" />
                      Card View
                    </Label>
                  </div>
                  {/* Add Member Button */}
                  <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
                    <IconPlus className="mr-2 size-4" />
                    Add Member
                  </Button>
                </div>
              </div>
              
              {/* Search Input: Filter by name, role, email, or contact */}
              <Input
                type="search"
                placeholder="Search team members by name, role, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* 
              CONDITIONAL VIEW RENDERING: Table View or Card View
              
              Based on isCardView state, displays either:
              1. TeamDataTable - Full featured data table with sorting, filtering, pagination
              2. TeamCardView - Card-based grid layout for visual browsing
            */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              {isCardView ? (
                /* 
                  TEAM CARD VIEW COMPONENT
                  
                  Grid-based card layout displaying team members.
                  
                  Features:
                  - Responsive grid (1-4 columns based on screen size)
                  - Avatar with initials
                  - Name and role prominently displayed
                  - Status badge
                  - Email and contact info
                  - Click card to open edit dialog
                  - Hover effects for better UX
                  - Animated with fade-in from right effect
                  
                  Props:
                  - data: Array of team member records to display
                  - onCardClick: Callback when card is clicked (opens edit dialog)
                */
                <TeamCardView
                  data={filteredTeamMembers}
                  onCardClick={handleEditTeamMember}
                />
              ) : (
                /* 
                  TEAM DATA TABLE COMPONENT
                  
                  Main table displaying all team member records with full CRUD functionality.
                  
                  Features:
                  - Avatar display with initials
                  - Sortable columns (click header to sort)
                  - Drag-and-drop row reordering
                  - Multi-row selection with checkboxes
                  - Pagination (10/20/30/40/50 rows per page)
                  - Column visibility toggle
                  - Actions dropdown (Edit/Delete) on each row
                  - Status badges with color coding:
                    * Active - Green badge
                    * Inactive - Gray badge
                  - Animated with fade-in from right effect
                  
                  Props:
                  - data: Array of team member records to display
                  - onViewTeamMember: Callback when member row is clicked
                  - onEditTeamMember: Callback when edit action is selected
                  - onDeleteTeamMember: Callback when delete action is confirmed
                */
                <TeamDataTable
                  data={filteredTeamMembers}
                  onViewTeamMember={handleViewTeamMember}
                  onEditTeamMember={handleEditTeamMember}
                  onDeleteTeamMember={handleDeleteTeamMember}
                />
              )}
            </FadeContent>
          </div>
        </div>

        {/* 
          CREATE TEAM MEMBER DIALOG COMPONENT
          
          Modal form for adding new team member records.
          
          Form Fields:
          - Full Name (text input, required)
          - Role (select dropdown, required)
            Options: Lead Technician, Field Technician, Dispatcher, Admin, Manager
          - Email (email input, required)
          - Contact Number (tel input, required)
          - Status (select, default: "Active")
            Options: Active, Inactive
          - Avatar (auto-generated from initials)
          
          Behavior:
          - Opens when isCreateDialogOpen is true
          - Validates required fields before submission
          - Auto-generates avatar initials from name
          - Calls handleCreateTeamMember on successful form submission
          - Automatically closes on successful creation or cancellation
          - Form resets after successful creation
          
          Props:
          - open: Controls dialog visibility
          - onOpenChange: Callback to toggle dialog open/closed
          - onCreateTeamMember: Callback with new team member data (without ID)
        */}
        <CreateTeamMemberDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onCreateTeamMember={handleCreateTeamMember}
        />

        {/* 
          TEAM MEMBER DETAIL DIALOG COMPONENT
          
          Modal for viewing and editing existing team member details.
          
          Displays:
          - All team member information (editable)
          - Member since date (read-only)
          - Status toggle (Active/Inactive)
          
          Actions:
          - Save Changes button (updates record)
          - Cancel button (discards changes)
          
          Behavior:
          - Opens when selectedTeamMember is not null
          - Pre-fills form with existing member data
          - Validates changes before saving
          - Calls handleSaveTeamMember on successful update
          - Automatically closes on save or cancel
          
          Props:
          - teamMember: Selected team member object
          - open: Controls dialog visibility
          - onOpenChange: Callback to close dialog
          - onSaveTeamMember: Callback with updated team member data
        */}
        {selectedTeamMember && (
          <TeamMemberDetailDialog
            teamMember={selectedTeamMember}
            open={!!selectedTeamMember}
            onOpenChange={() => setSelectedTeamMember(null)}
            onSaveTeamMember={handleSaveTeamMember}
          />
        )}
      </div>
    </>
  )
}
