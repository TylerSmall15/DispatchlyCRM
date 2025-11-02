/**
 * QUICK CREATE DIALOG COMPONENT
 * 
 * Purpose:
 * Quick access dialog for creating new entities (companies, clients, leads, jobs).
 * Provides fast workflow for adding records without navigating to specific pages.
 * 
 * Key Features:
 * - Quick entity selection (Companies, Clients, Leads, Jobs)
 * - Keyboard navigation (arrow keys, enter)
 * - Keyboard shortcut (Cmd+N / Ctrl+N)
 * - Opens respective create forms
 * 
 * Usage:
 * <QuickCreateDialog open={open} onOpenChange={setOpen} />
 */

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconPlus,
  IconBuilding,
  IconUser,
  IconUserPlus,
  IconBriefcase,
  IconChevronRight,
} from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

/**
 * QUICK CREATE OPTION INTERFACE
 * 
 * Defines the structure of a quick create option.
 */
interface QuickCreateOption {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  badge?: string
}

interface QuickCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickCreateDialog({ open, onOpenChange }: QuickCreateDialogProps) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // ==================== QUICK CREATE OPTIONS ====================

  const options: QuickCreateOption[] = [
    {
      id: "create-company",
      title: "Create Company",
      description: "Add a new commercial client or business account",
      icon: IconBuilding,
      badge: "Commercial",
      action: () => {
        router.push("/companies")
        onOpenChange(false)
        // Trigger create dialog after navigation
        setTimeout(() => {
          // In production: dispatch event or use router state to open create dialog
          const createButton = document.querySelector('[data-create-company]') as HTMLButtonElement
          if (createButton) createButton.click()
        }, 100)
      },
    },
    {
      id: "create-client",
      title: "Create Customer",
      description: "Add a new residential customer account",
      icon: IconUser,
      badge: "Residential",
      action: () => {
        router.push("/clients")
        onOpenChange(false)
        setTimeout(() => {
          const createButton = document.querySelector('[data-create-client]') as HTMLButtonElement
          if (createButton) createButton.click()
        }, 100)
      },
    },
    {
      id: "create-lead",
      title: "Create Lead",
      description: "Add a new lead to your sales pipeline",
      icon: IconUserPlus,
      badge: "Pipeline",
      action: () => {
        router.push("/leads")
        onOpenChange(false)
        setTimeout(() => {
          const createButton = document.querySelector('[data-create-lead]') as HTMLButtonElement
          if (createButton) createButton.click()
        }, 100)
      },
    },
    {
      id: "create-job",
      title: "Create Job",
      description: "Schedule a new job and assign technicians",
      icon: IconBriefcase,
      badge: "Schedule",
      action: () => {
        router.push("/jobs")
        onOpenChange(false)
        setTimeout(() => {
          const createButton = document.querySelector('[data-create-job]') as HTMLButtonElement
          if (createButton) createButton.click()
        }, 100)
      },
    },
  ]

  // ==================== EVENT HANDLERS ====================

  /**
   * KEYBOARD NAVIGATION
   * 
   * Handles arrow keys and enter for option selection.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % options.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + options.length) % options.length)
        break
      case "Enter":
        e.preventDefault()
        if (options[selectedIndex]) {
          options[selectedIndex].action()
        }
        break
      case "Escape":
        onOpenChange(false)
        break
    }
  }

  /**
   * RESET ON CLOSE
   */
  React.useEffect(() => {
    if (!open) {
      setSelectedIndex(0)
    }
  }, [open])

  /**
   * GET BADGE COLOR
   */
  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Commercial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Residential":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Pipeline":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "Schedule":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // ==================== RENDER ====================

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-0 sr-only">
          <DialogTitle>Quick Create</DialogTitle>
          <DialogDescription>
            Quickly create a new company, customer, lead, or job
          </DialogDescription>
        </DialogHeader>

        {/* HEADER */}
        <div className="border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <IconPlus className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-base">Quick Create</h2>
              <p className="text-xs text-muted-foreground">
                Choose what you want to create
              </p>
            </div>
          </div>
        </div>

        {/* OPTIONS LIST */}
        <ScrollArea className="max-h-[420px]">
          <div className="py-2 px-2" onKeyDown={handleKeyDown} tabIndex={0}>
            {options.map((option, index) => {
              const Icon = option.icon
              const isSelected = index === selectedIndex

              return (
                <button
                  key={option.id}
                  onClick={option.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-4 px-4 py-4 text-left transition-all rounded-lg mb-2 ${
                    isSelected ? "bg-muted shadow-sm" : "hover:bg-muted/80"
                  }`}
                >
                  <div className={`p-3 rounded-lg transition-colors ${
                    isSelected ? "bg-background" : "bg-muted/50"
                  }`}>
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{option.title}</p>
                      {option.badge && (
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 h-5 font-medium ${getBadgeColor(
                            option.badge
                          )}`}
                        >
                          {option.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground/80">
                      {option.description}
                    </p>
                  </div>

                  <IconChevronRight className={`size-4 text-muted-foreground transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`} />
                </button>
              )
            })}
          </div>
        </ScrollArea>

        {/* FOOTER HINTS */}
        <div className="border-t px-4 py-3 text-xs text-muted-foreground flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-background px-2 font-mono text-xs font-medium shadow-sm sm:flex">
                ↑↓
              </kbd>
              <span className="hidden sm:inline text-xs">Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-background px-2 font-mono text-xs font-medium shadow-sm sm:flex">
                ↵
              </kbd>
              <span className="hidden sm:inline text-xs">Select</span>
            </div>
          </div>
          <div className="text-xs font-medium">
            <span className="text-muted-foreground">
              {options.length} options
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

