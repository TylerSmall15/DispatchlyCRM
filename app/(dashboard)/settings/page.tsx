/**
 * SETTINGS PAGE COMPONENT
 * 
 * Purpose:
 * Central configuration hub for business owners and administrators to manage
 * platform settings, user roles, page visibility, and general preferences.
 * 
 * Key Features:
 * - Role Management: Configure page visibility for different user roles
 * - Business Settings: Company information and branding
 * - User Preferences: Notifications and display options
 * - Security Settings: Password requirements and access controls
 * 
 * Data Flow:
 * - Client-side state management using React hooks
 * - Settings persist to localStorage (ready for backend integration)
 * - Real-time updates reflected across the platform
 * 
 * Integration Points:
 * - Ready for backend API: Replace localStorage with API calls
 * - Role permissions integrate with authentication system
 * - Settings apply platform-wide
 */

"use client"

import * as React from "react"
import { toast } from "sonner"
import { IconCopy, IconCheck, IconExternalLink } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import FadeContent from "@/components/fade-content"
import { Textarea } from "@/components/ui/textarea"

/**
 * PAGE VISIBILITY INTERFACE
 * 
 * Defines which pages are visible to each role.
 * 
 * @param {string} role - User role name
 * @param {string[]} pages - Array of page names accessible to this role
 */
interface RolePageVisibility {
  role: string
  pages: string[]
}

/**
 * BUSINESS SETTINGS INTERFACE
 * 
 * Stores general business configuration.
 * 
 * @param {string} businessName - Company/business name
 * @param {string} email - Business contact email
 * @param {string} phone - Business contact phone
 * @param {string} address - Business address
 * @param {string} timezone - Business timezone
 */
interface BusinessSettings {
  businessName: string
  email: string
  phone: string
  address: string
  timezone: string
}

/**
 * AVAILABLE PAGES
 * 
 * List of all dashboard pages that can have visibility controls.
 */
const availablePages = [
  { id: "overview", name: "Overview Dashboard" },
  { id: "jobs", name: "Jobs" },
  { id: "leads", name: "Leads" },
  { id: "quotes", name: "Quotes" },
  { id: "companies", name: "Companies" },
  { id: "clients", name: "Customers" },
  { id: "team", name: "Team" },
  { id: "reports", name: "Reports & Analytics" },
]

/**
 * AVAILABLE ROLES
 * 
 * List of user roles in the platform.
 */
const availableRoles = [
  "Admin",
  "Manager",
  "Dispatcher",
  "Lead Technician",
  "Field Technician",
]

/**
 * MOCK ROLE VISIBILITY DATA
 * 
 * Default page visibility settings for each role.
 * Admins have access to all pages by default.
 */
const mockRoleVisibility: RolePageVisibility[] = [
  {
    role: "Admin",
    pages: ["overview", "jobs", "leads", "quotes", "companies", "clients", "team", "reports"],
  },
  {
    role: "Manager",
    pages: ["overview", "jobs", "leads", "quotes", "companies", "clients", "reports"],
  },
  {
    role: "Dispatcher",
    pages: ["overview", "jobs", "leads", "quotes"],
  },
  {
    role: "Lead Technician",
    pages: ["overview", "jobs"],
  },
  {
    role: "Field Technician",
    pages: ["overview", "jobs"],
  },
]

/**
 * MOCK BUSINESS SETTINGS DATA
 */
const mockBusinessSettings: BusinessSettings = {
  businessName: "Acme Inc.",
  email: "contact@acme.com",
  phone: "(631) 555-0100",
  address: "123 Business St, Huntington, NY 11743",
  timezone: "America/New_York",
}

export default function SettingsPage() {
  // ==================== STATE MANAGEMENT ====================
  
  const [roleVisibility, setRoleVisibility] = React.useState<RolePageVisibility[]>(mockRoleVisibility)
  const [businessSettings, setBusinessSettings] = React.useState<BusinessSettings>(mockBusinessSettings)
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [smsNotifications, setSmsNotifications] = React.useState(false)
  const [autoSave, setAutoSave] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)
  const [orgId] = React.useState("org_" + Math.random().toString(36).substring(2, 15))
  const [embedCopied, setEmbedCopied] = React.useState(false)

  // ==================== EVENT HANDLERS ====================

  /**
   * TOGGLE PAGE VISIBILITY HANDLER
   * 
   * Toggles page visibility for a specific role.
   * 
   * @param {string} role - Role name
   * @param {string} pageId - Page identifier
   */
  const handleTogglePageVisibility = (role: string, pageId: string) => {
    setRoleVisibility((prev) =>
      prev.map((rv) => {
        if (rv.role === role) {
          const hasPage = rv.pages.includes(pageId)
          return {
            ...rv,
            pages: hasPage
              ? rv.pages.filter((p) => p !== pageId)
              : [...rv.pages, pageId],
          }
        }
        return rv
      })
    )
  }

  /**
   * SAVE ROLE PERMISSIONS HANDLER
   * 
   * Saves role visibility settings.
   */
  const handleSaveRolePermissions = () => {
    // In production: API call to save settings
    localStorage.setItem("roleVisibility", JSON.stringify(roleVisibility))
    toast.success("Role permissions saved successfully!")
  }

  /**
   * SAVE BUSINESS SETTINGS HANDLER
   * 
   * Saves business configuration.
   */
  const handleSaveBusinessSettings = () => {
    // In production: API call to save settings
    localStorage.setItem("businessSettings", JSON.stringify(businessSettings))
    toast.success("Business settings saved successfully!")
  }

  /**
   * SAVE PREFERENCES HANDLER
   * 
   * Saves user preferences.
   */
  const handleSavePreferences = () => {
    const preferences = {
      emailNotifications,
      smsNotifications,
      autoSave,
      darkMode,
    }
    // In production: API call to save settings
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    toast.success("Preferences saved successfully!")
  }

  /**
   * COPY EMBED CODE HANDLER
   * 
   * Copies the booking form embed code to clipboard.
   */
  const handleCopyEmbedCode = () => {
    const embedCode = generateEmbedCode()
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    toast.success("Embed code copied to clipboard!")
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  /**
   * GENERATE EMBED CODE
   * 
   * Generates the JavaScript embed code for the booking form.
   */
  const generateEmbedCode = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'
    return `<!-- DispatchlyCRM Booking Form -->
<div id="dispatchly-booking-form"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/embed/booking-form.js';
    script.setAttribute('data-org-id', '${orgId}');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`
  }

  // ==================== RENDER ====================

  return (
    <>
      {/* PAGE HEADER */}
      <SiteHeader title="Settings" />
      
      {/* MAIN CONTENT CONTAINER */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* PAGE TITLE */}
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your business settings, user roles, and preferences
              </p>
            </div>

            {/* SETTINGS TABS */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="permissions" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="permissions">Permissions</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  {/* PERMISSIONS TAB */}
                  <TabsContent value="permissions" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Role-Based Page Visibility</CardTitle>
                        <CardDescription>
                          Control which pages are visible to different user roles.
                          Admins always have access to all pages.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {availableRoles.map((role) => {
                          const roleData = roleVisibility.find((rv) => rv.role === role)
                          
                          return (
                            <div key={role} className="space-y-4">
                              <div>
                                <h3 className="text-sm font-semibold mb-3">{role}</h3>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {availablePages.map((page) => {
                                    const isVisible = roleData?.pages.includes(page.id) || false
                                    const isDisabled = role === "Admin"
                                    
                                    return (
                                      <div
                                        key={page.id}
                                        className="flex items-center justify-between space-x-2 rounded-lg border p-3"
                                      >
                                        <Label
                                          htmlFor={`${role}-${page.id}`}
                                          className={`text-sm font-normal flex-1 cursor-pointer ${
                                            isDisabled ? "opacity-50" : ""
                                          }`}
                                        >
                                          {page.name}
                                        </Label>
                                        <Switch
                                          id={`${role}-${page.id}`}
                                          checked={isVisible}
                                          onCheckedChange={() =>
                                            handleTogglePageVisibility(role, page.id)
                                          }
                                          disabled={isDisabled}
                                        />
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              {role !== availableRoles[availableRoles.length - 1] && (
                                <Separator />
                              )}
                            </div>
                          )
                        })}
                        
                        <div className="flex justify-end pt-4">
                          <Button onClick={handleSaveRolePermissions}>
                            Save Permissions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* BUSINESS TAB */}
                  <TabsContent value="business" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Information</CardTitle>
                        <CardDescription>
                          Update your business details and contact information.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                              id="businessName"
                              value={businessSettings.businessName}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  businessName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Input
                              id="timezone"
                              value={businessSettings.timezone}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  timezone: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={businessSettings.email}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={businessSettings.phone}
                              onChange={(e) =>
                                setBusinessSettings((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={businessSettings.address}
                            onChange={(e) =>
                              setBusinessSettings((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button onClick={handleSaveBusinessSettings}>
                            Save Business Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* PREFERENCES TAB */}
                  <TabsContent value="preferences" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                          Configure how you receive notifications.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="emailNotif">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via email
                            </p>
                          </div>
                          <Switch
                            id="emailNotif"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="smsNotif">SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications via text message
                            </p>
                          </div>
                          <Switch
                            id="smsNotif"
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>General Preferences</CardTitle>
                        <CardDescription>
                          Customize your platform experience.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="autoSave">Auto-save</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically save changes as you work
                            </p>
                          </div>
                          <Switch
                            id="autoSave"
                            checked={autoSave}
                            onCheckedChange={setAutoSave}
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="darkMode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Use dark theme across the platform
                            </p>
                          </div>
                          <Switch
                            id="darkMode"
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button onClick={handleSavePreferences}>
                            Save Preferences
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ADVANCED TAB */}
                  <TabsContent value="advanced" className="space-y-4 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Online Booking Form</CardTitle>
                        <CardDescription>
                          Embed a lightweight booking form on your website to capture leads directly into your CRM funnel.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>How it Works</Label>
                          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                            <p>
                              <strong>1. Copy the embed code below</strong> - This lightweight script is optimized for performance
                            </p>
                            <p>
                              <strong>2. Paste it into your website</strong> - Add the code to any page where you want the booking form to appear
                            </p>
                            <p>
                              <strong>3. Collect leads automatically</strong> - All submissions are sent to your Leads page with your unique org ID tag
                            </p>
                            <p className="text-muted-foreground pt-2">
                              The form is fully responsive, matches your brand colors, and includes validation to ensure quality leads.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Organization ID</Label>
                            <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                              {orgId}
                            </code>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This unique identifier links form submissions to your account
                          </p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Embed Code</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCopyEmbedCode}
                            >
                              {embedCopied ? (
                                <>
                                  <IconCheck className="mr-2 size-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <IconCopy className="mr-2 size-4" />
                                  Copy Code
                                </>
                              )}
                            </Button>
                          </div>
                          <Textarea
                            readOnly
                            value={generateEmbedCode()}
                            className="font-mono text-xs h-40 resize-none"
                          />
                        </div>

                        <div className="flex items-start gap-2 rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 text-sm">
                          <IconExternalLink className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-medium text-blue-900 dark:text-blue-100">
                              API Endpoint
                            </p>
                            <p className="text-blue-700 dark:text-blue-300">
                              Form submissions are sent to: <code className="font-mono">/api/leadform</code>
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                              View the API documentation to customize form fields and validation rules
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </>
  )
}

