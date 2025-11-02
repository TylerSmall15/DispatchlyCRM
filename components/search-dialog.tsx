/**
 * SEARCH DIALOG COMPONENT
 * 
 * Purpose:
 * Global search functionality that searches across all pages, features, and content.
 * Provides quick navigation and discovery of platform features.
 * 
 * Key Features:
 * - Fuzzy search across all pages and sections
 * - Keyboard shortcuts (Cmd+K / Ctrl+K)
 * - Categorized results (Pages, Jobs, Leads, Settings)
 * - Recent searches
 * - Quick navigation
 * 
 * Usage:
 * <SearchDialog open={open} onOpenChange={setOpen} />
 */

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconSearch,
  IconFile,
  IconUser,
  IconBriefcase,
  IconSettings,
  IconChartBar,
  IconBuilding,
  IconUsers,
  IconClock,
  IconFileText,
  IconCurrencyDollar,
} from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

/**
 * SEARCH RESULT INTERFACE
 * 
 * Defines the structure of a search result item.
 */
interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  category: "page" | "feature" | "setting" | "help"
  icon: React.ComponentType<{ className?: string }>
  keywords: string[]
}

/**
 * SEARCH INDEX
 * 
 * Comprehensive index of all searchable content in the platform.
 * Includes pages, features, settings, and help content.
 */
const searchIndex: SearchResult[] = [
  // Main Pages
  {
    id: "overview",
    title: "Overview Dashboard",
    description: "View business metrics, KPIs, and activity summary",
    url: "/overview",
    category: "page",
    icon: IconChartBar,
    keywords: ["dashboard", "home", "metrics", "kpi", "overview", "summary", "analytics"],
  },
  {
    id: "jobs",
    title: "Jobs",
    description: "Manage jobs, scheduling, and assignments",
    url: "/jobs",
    category: "page",
    icon: IconBriefcase,
    keywords: ["jobs", "schedule", "work", "tasks", "assignments", "technician"],
  },
  {
    id: "leads",
    title: "Leads",
    description: "Manage leads and sales pipeline",
    url: "/leads",
    category: "page",
    icon: IconUser,
    keywords: ["leads", "prospects", "pipeline", "sales", "contacts"],
  },
  {
    id: "quotes",
    title: "Quotes",
    description: "Create and manage quotes and estimates",
    url: "/quotes",
    category: "page",
    icon: IconFileText,
    keywords: ["quotes", "estimates", "pricing", "proposals"],
  },
  {
    id: "companies",
    title: "Companies",
    description: "Manage company accounts and commercial clients",
    url: "/companies",
    category: "page",
    icon: IconBuilding,
    keywords: ["companies", "businesses", "commercial", "accounts", "corporate"],
  },
  {
    id: "clients",
    title: "Customers",
    description: "Manage customer accounts and history",
    url: "/clients",
    category: "page",
    icon: IconUsers,
    keywords: ["customers", "clients", "residential", "contacts"],
  },
  {
    id: "team",
    title: "Team",
    description: "Manage team members and technicians",
    url: "/team",
    category: "page",
    icon: IconUsers,
    keywords: ["team", "staff", "employees", "technicians", "users"],
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Generate reports and view business analytics",
    url: "/reports",
    category: "page",
    icon: IconChartBar,
    keywords: ["reports", "analytics", "insights", "data", "statistics"],
  },
  
  // Account & Settings
  {
    id: "account",
    title: "Account",
    description: "Manage your personal account and security settings",
    url: "/account",
    category: "page",
    icon: IconUser,
    keywords: ["account", "profile", "password", "security", "2fa", "authentication"],
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    description: "Manage subscription, payment methods, and invoices",
    url: "/billing",
    category: "page",
    icon: IconCurrencyDollar,
    keywords: ["billing", "subscription", "payment", "invoice", "plan", "upgrade"],
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "View and manage all your alerts and messages",
    url: "/notifications",
    category: "page",
    icon: IconUser,
    keywords: ["notifications", "alerts", "messages", "updates", "bell"],
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure platform settings and preferences",
    url: "/settings",
    category: "setting",
    icon: IconSettings,
    keywords: ["settings", "preferences", "configuration", "options"],
  },
  {
    id: "permissions",
    title: "Role Permissions",
    description: "Manage user roles and page visibility",
    url: "/settings",
    category: "setting",
    icon: IconSettings,
    keywords: ["permissions", "roles", "access", "security", "visibility"],
  },
  {
    id: "booking-form",
    title: "Online Booking Form",
    description: "Embed booking form on your website",
    url: "/settings",
    category: "feature",
    icon: IconFileText,
    keywords: ["booking", "form", "embed", "website", "lead capture"],
  },
  
  // Features
  {
    id: "create-job",
    title: "Create New Job",
    description: "Schedule a new job and assign technicians",
    url: "/jobs",
    category: "feature",
    icon: IconBriefcase,
    keywords: ["create job", "new job", "schedule", "add job"],
  },
  {
    id: "create-lead",
    title: "Create New Lead",
    description: "Add a new lead to your pipeline",
    url: "/leads",
    category: "feature",
    icon: IconUser,
    keywords: ["create lead", "new lead", "add lead", "prospect"],
  },
  {
    id: "create-quote",
    title: "Create New Quote",
    description: "Generate a quote for a customer",
    url: "/quotes",
    category: "feature",
    icon: IconCurrencyDollar,
    keywords: ["create quote", "new quote", "estimate", "pricing"],
  },
  {
    id: "add-team-member",
    title: "Add Team Member",
    description: "Add a new team member or technician",
    url: "/team",
    category: "feature",
    icon: IconUsers,
    keywords: ["add team", "new employee", "hire", "staff"],
  },
  {
    id: "generate-report",
    title: "Generate Report",
    description: "Create custom business reports",
    url: "/reports",
    category: "feature",
    icon: IconChartBar,
    keywords: ["generate report", "create report", "analytics", "export"],
  },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // ==================== SEARCH LOGIC ====================

  /**
   * SEARCH FUNCTION
   * 
   * Implements fuzzy search across all indexed content.
   * Searches through titles, descriptions, and keywords.
   */
  const performSearch = React.useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const searchResults = searchIndex
      .filter((item) => {
        // Search in title
        if (item.title.toLowerCase().includes(lowerQuery)) return true
        
        // Search in description
        if (item.description.toLowerCase().includes(lowerQuery)) return true
        
        // Search in keywords
        if (item.keywords.some((keyword) => keyword.includes(lowerQuery))) return true
        
        return false
      })
      .sort((a, b) => {
        // Prioritize title matches
        const aTitle = a.title.toLowerCase().startsWith(lowerQuery) ? -1 : 0
        const bTitle = b.title.toLowerCase().startsWith(lowerQuery) ? -1 : 0
        return aTitle - bTitle
      })
      .slice(0, 10) // Limit to 10 results

    setResults(searchResults)
    setSelectedIndex(0)
  }, [])

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 150)

    return () => clearTimeout(timer)
  }, [query, performSearch])

  // ==================== EVENT HANDLERS ====================

  /**
   * NAVIGATE TO RESULT
   * 
   * Handles navigation when a result is selected.
   */
  const handleSelect = (result: SearchResult) => {
    router.push(result.url)
    onOpenChange(false)
    setQuery("")
    setResults([])
  }

  /**
   * KEYBOARD NAVIGATION
   * 
   * Handles arrow keys and enter for result selection.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        break
      case "Enter":
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
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
      setQuery("")
      setResults([])
      setSelectedIndex(0)
    }
  }, [open])

  // ==================== CATEGORY HELPERS ====================

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "page":
        return "Page"
      case "feature":
        return "Feature"
      case "setting":
        return "Setting"
      case "help":
        return "Help"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "page":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "feature":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "setting":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "help":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  // ==================== RENDER ====================

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-0 sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for pages, features, and settings
          </DialogDescription>
        </DialogHeader>

        {/* SEARCH INPUT */}
        <div className="flex items-center border-b px-4 py-3 pr-14">
          <IconSearch className="mr-3 size-5 text-muted-foreground shrink-0" />
          <Input
            placeholder="Search pages, features, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-base placeholder:text-muted-foreground/60"
            autoFocus
          />
        </div>

        {/* SEARCH RESULTS */}
        <ScrollArea className="max-h-[420px] min-h-[200px]">
          {results.length === 0 && query && (
            <div className="py-16 px-6 text-center text-sm text-muted-foreground">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <IconSearch className="size-8 opacity-40" />
              </div>
              <p className="font-medium text-foreground mb-1">No results found</p>
              <p className="text-xs">No matches for "{query}"</p>
              <p className="text-xs mt-3 text-muted-foreground/80">
                Try searching for pages, jobs, leads, or settings
              </p>
            </div>
          )}

          {results.length === 0 && !query && (
            <div className="py-16 px-6 text-center text-sm text-muted-foreground">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <IconSearch className="size-8 opacity-40" />
              </div>
              <p className="font-medium text-foreground mb-1">Search DispatchlyCRM</p>
              <p className="text-xs mt-1">Start typing to find pages and features</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">jobs</code>
                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">create lead</code>
                <code className="px-2 py-1 rounded bg-muted text-xs font-mono">settings</code>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2 px-2">
              {results.map((result, index) => {
                const Icon = result.icon
                const isSelected = index === selectedIndex

                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={`w-full flex items-start gap-3 px-3 py-3 text-left transition-all rounded-lg hover:bg-muted/80 ${
                      isSelected ? "bg-muted shadow-sm" : ""
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className={`mt-0.5 p-2 rounded-md transition-colors ${
                      isSelected ? "bg-background" : "bg-muted/50"
                    }`}>
                      <Icon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 h-5 font-medium ${getCategoryColor(
                            result.category
                          )}`}
                        >
                          {getCategoryLabel(result.category)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground/80 line-clamp-1">
                        {result.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
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
            {results.length > 0 && (
              <span className="text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

