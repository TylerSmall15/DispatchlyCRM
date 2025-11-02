/**
 * NOTIFICATIONS PAGE COMPONENT
 * 
 * Purpose:
 * Central hub for viewing and managing all system notifications, alerts, and updates.
 * Keeps users informed about job updates, team activity, system alerts, and messages.
 * 
 * Key Features:
 * - Notification Feed: Chronological list of all notifications
 * - Filter by Type: System, Jobs, Leads, Team, Messages
 * - Mark as Read/Unread: Individual or bulk actions
 * - Notification Preferences: Configure email and push notification settings
 * - Real-time Updates: Badge counts and live notifications
 * 
 * Data Flow:
 * - Client-side state management using React hooks
 * - Mock notification data for development
 * - Real-time updates via WebSocket (ready for integration)
 * 
 * Integration Points:
 * - Ready for backend API: Replace mock data with notification service
 * - WebSocket integration for real-time notifications
 * - Push notification service integration
 */

"use client"

import * as React from "react"
import {
  IconBell,
  IconBellOff,
  IconCheck,
  IconTrash,
  IconFilter,
  IconBriefcase,
  IconUser,
  IconUsers,
  IconMail,
  IconAlertTriangle,
  IconSettings,
  IconCircle,
  IconCircleFilled,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FadeContent from "@/components/fade-content"

/**
 * NOTIFICATION INTERFACE
 * 
 * Defines the structure of a notification.
 */
interface Notification {
  id: string
  type: "system" | "job" | "lead" | "team" | "message"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

/**
 * NOTIFICATION PREFERENCES INTERFACE
 */
interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  jobUpdates: boolean
  leadUpdates: boolean
  teamUpdates: boolean
  systemAlerts: boolean
}

/**
 * MOCK NOTIFICATIONS DATA
 */
const mockNotifications: Notification[] = [
  {
    id: "N-001",
    type: "job",
    title: "Job Completed",
    message: "Mike Torres completed job JOB-156 at 24 Oak Street",
    timestamp: "2025-11-02T14:30:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: "N-002",
    type: "lead",
    title: "New Lead Assigned",
    message: "New lead 'Sarah Johnson' has been assigned to you",
    timestamp: "2025-11-02T13:15:00Z",
    read: false,
    priority: "high",
  },
  {
    id: "N-003",
    type: "team",
    title: "Team Member Added",
    message: "Amanda Foster joined your team as Lead Technician",
    timestamp: "2025-11-02T11:45:00Z",
    read: true,
    priority: "low",
  },
  {
    id: "N-004",
    type: "message",
    title: "New Message",
    message: "You have a new message from John Doe regarding Quote Q-042",
    timestamp: "2025-11-02T10:20:00Z",
    read: false,
    priority: "medium",
  },
  {
    id: "N-005",
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance window: Nov 5, 2:00 AM - 4:00 AM EST",
    timestamp: "2025-11-01T16:00:00Z",
    read: true,
    priority: "high",
  },
  {
    id: "N-006",
    type: "job",
    title: "Job Scheduled",
    message: "New job JOB-158 scheduled for Nov 3 at 9:00 AM with Lisa Rodriguez",
    timestamp: "2025-11-01T14:30:00Z",
    read: true,
    priority: "medium",
  },
  {
    id: "N-007",
    type: "lead",
    title: "Quote Approved",
    message: "Client accepted quote Q-038 for $2,500",
    timestamp: "2025-11-01T12:10:00Z",
    read: true,
    priority: "high",
  },
  {
    id: "N-008",
    type: "system",
    title: "Storage Usage Alert",
    message: "You're using 85% of your storage quota. Consider upgrading your plan.",
    timestamp: "2025-11-01T09:00:00Z",
    read: false,
    priority: "medium",
  },
]

/**
 * MOCK NOTIFICATION PREFERENCES
 */
const mockPreferences: NotificationPreferences = {
  emailNotifications: true,
  pushNotifications: true,
  jobUpdates: true,
  leadUpdates: true,
  teamUpdates: true,
  systemAlerts: true,
}

export default function NotificationsPage() {
  // ==================== STATE MANAGEMENT ====================

  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)
  const [preferences, setPreferences] = React.useState<NotificationPreferences>(mockPreferences)
  const [filterType, setFilterType] = React.useState<"all" | Notification["type"]>("all")
  const [showUnreadOnly, setShowUnreadOnly] = React.useState(false)

  // ==================== COMPUTED VALUES ====================

  /**
   * Filtered Notifications
   * Applies type and read status filters
   */
  const filteredNotifications = React.useMemo(() => {
    return notifications.filter((notification) => {
      const typeMatch = filterType === "all" || notification.type === filterType
      const readMatch = !showUnreadOnly || !notification.read
      return typeMatch && readMatch
    })
  }, [notifications, filterType, showUnreadOnly])

  /**
   * Unread Count
   */
  const unreadCount = notifications.filter((n) => !n.read).length

  // ==================== EVENT HANDLERS ====================

  /**
   * MARK AS READ HANDLER
   * 
   * Marks a single notification as read.
   */
  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    )
  }

  /**
   * MARK ALL AS READ HANDLER
   * 
   * Marks all notifications as read.
   */
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  /**
   * DELETE NOTIFICATION HANDLER
   * 
   * Removes a notification from the list.
   */
  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    toast.success("Notification deleted")
  }

  /**
   * CLEAR ALL NOTIFICATIONS HANDLER
   * 
   * Removes all read notifications.
   */
  const handleClearAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read))
    toast.success("Read notifications cleared")
  }

  /**
   * UPDATE PREFERENCES HANDLER
   * 
   * Updates notification preferences.
   */
  const handleUpdatePreferences = () => {
    // In production: API call to save preferences
    localStorage.setItem("notificationPreferences", JSON.stringify(preferences))
    toast.success("Notification preferences updated")
  }

  /**
   * GET NOTIFICATION ICON
   */
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "job":
        return IconBriefcase
      case "lead":
        return IconUser
      case "team":
        return IconUsers
      case "message":
        return IconMail
      case "system":
        return IconAlertTriangle
    }
  }

  /**
   * GET NOTIFICATION COLOR
   */
  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "job":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
      case "lead":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
      case "team":
        return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30"
      case "message":
        return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30"
      case "system":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
    }
  }

  /**
   * FORMAT TIMESTAMP
   */
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // ==================== RENDER ====================

  return (
    <>
      {/* PAGE HEADER */}
      <SiteHeader title="Notifications" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* PAGE TITLE */}
            <div className="px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Notifications</h1>
                  <p className="text-muted-foreground text-sm mt-1">
                    Stay updated with all your alerts and messages
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {unreadCount} unread
                  </Badge>
                )}
              </div>
            </div>

            <div className="px-4 lg:px-6">
              <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="all">All Notifications</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>

                  {/* ALL NOTIFICATIONS TAB */}
                  <TabsContent value="all" className="space-y-4 mt-6">
                    {/* FILTERS AND ACTIONS */}
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="flex flex-col sm:flex-row gap-3 flex-1">
                            <Select
                              value={filterType}
                              onValueChange={(value) => setFilterType(value as typeof filterType)}
                            >
                              <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="job">Jobs</SelectItem>
                                <SelectItem value="lead">Leads</SelectItem>
                                <SelectItem value="team">Team</SelectItem>
                                <SelectItem value="message">Messages</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>

                            <div className="flex items-center gap-2">
                              <Switch
                                id="unread-only"
                                checked={showUnreadOnly}
                                onCheckedChange={setShowUnreadOnly}
                              />
                              <Label htmlFor="unread-only" className="cursor-pointer text-sm">
                                Unread only
                              </Label>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleMarkAllAsRead}
                              disabled={unreadCount === 0}
                            >
                              <IconCheck className="mr-2 size-4" />
                              Mark all read
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleClearAllRead}
                            >
                              <IconTrash className="mr-2 size-4" />
                              Clear read
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* NOTIFICATIONS LIST */}
                    <Card>
                      <CardContent className="p-0">
                        {filteredNotifications.length === 0 ? (
                          <div className="py-16 text-center text-sm text-muted-foreground">
                            <IconBellOff className="mx-auto size-12 opacity-20 mb-4" />
                            <p className="font-medium text-foreground mb-1">No notifications</p>
                            <p>You're all caught up!</p>
                          </div>
                        ) : (
                          <div className="divide-y">
                            {filteredNotifications.map((notification) => {
                              const Icon = getNotificationIcon(notification.type)
                              const colorClass = getNotificationColor(notification.type)

                              return (
                                <div
                                  key={notification.id}
                                  className={`p-4 hover:bg-muted/50 transition-colors ${
                                    !notification.read ? "bg-muted/30" : ""
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${colorClass}`}>
                                      <Icon className="size-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <p className="font-medium text-sm">
                                              {notification.title}
                                            </p>
                                            {!notification.read && (
                                              <IconCircleFilled className="size-2 text-blue-600 dark:text-blue-400" />
                                            )}
                                          </div>
                                          <p className="text-muted-foreground text-sm mt-1">
                                            {notification.message}
                                          </p>
                                          <p className="text-muted-foreground text-xs mt-2">
                                            {formatTimestamp(notification.timestamp)}
                                          </p>
                                        </div>

                                        <div className="flex gap-1">
                                          {!notification.read && (
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="size-8"
                                              onClick={() => handleMarkAsRead(notification.id)}
                                            >
                                              <IconCheck className="size-4" />
                                            </Button>
                                          )}
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-8"
                                            onClick={() => handleDeleteNotification(notification.id)}
                                          >
                                            <IconTrash className="size-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* SETTINGS TAB */}
                  <TabsContent value="settings" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Configure how you want to receive notifications
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Email Notifications */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notif">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            id="email-notif"
                            checked={preferences.emailNotifications}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, emailNotifications: checked })
                            }
                          />
                        </div>

                        <Separator />

                        {/* Push Notifications */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-notif">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications in your browser
                            </p>
                          </div>
                          <Switch
                            id="push-notif"
                            checked={preferences.pushNotifications}
                            onCheckedChange={(checked) =>
                              setPreferences({ ...preferences, pushNotifications: checked })
                            }
                          />
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <Label>Notification Types</Label>

                          {/* Job Updates */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="job-updates" className="font-normal">
                                Job Updates
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Get notified about job status changes
                              </p>
                            </div>
                            <Switch
                              id="job-updates"
                              checked={preferences.jobUpdates}
                              onCheckedChange={(checked) =>
                                setPreferences({ ...preferences, jobUpdates: checked })
                              }
                            />
                          </div>

                          {/* Lead Updates */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="lead-updates" className="font-normal">
                                Lead Updates
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Get notified about new leads and conversions
                              </p>
                            </div>
                            <Switch
                              id="lead-updates"
                              checked={preferences.leadUpdates}
                              onCheckedChange={(checked) =>
                                setPreferences({ ...preferences, leadUpdates: checked })
                              }
                            />
                          </div>

                          {/* Team Updates */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="team-updates" className="font-normal">
                                Team Updates
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Get notified about team member activity
                              </p>
                            </div>
                            <Switch
                              id="team-updates"
                              checked={preferences.teamUpdates}
                              onCheckedChange={(checked) =>
                                setPreferences({ ...preferences, teamUpdates: checked })
                              }
                            />
                          </div>

                          {/* System Alerts */}
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="system-alerts" className="font-normal">
                                System Alerts
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Important system announcements and maintenance
                              </p>
                            </div>
                            <Switch
                              id="system-alerts"
                              checked={preferences.systemAlerts}
                              onCheckedChange={(checked) =>
                                setPreferences({ ...preferences, systemAlerts: checked })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button onClick={handleUpdatePreferences}>
                            Save Preferences
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </FadeContent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

