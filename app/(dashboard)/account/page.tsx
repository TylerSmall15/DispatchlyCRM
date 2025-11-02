/**
 * ACCOUNT PAGE COMPONENT
 * 
 * Purpose:
 * Personal account management page for individual users to manage their profile,
 * credentials, and security settings. Separate from organization-wide settings.
 * 
 * Key Features:
 * - Profile Information: Name, email, phone, avatar
 * - Password Management: Change password securely
 * - Two-Factor Authentication: Enable/disable 2FA
 * - Email Lock: Email changes require support contact
 * 
 * Data Flow:
 * - Client-side state management using React hooks
 * - Mock user data for development
 * - Form validation before submission
 * - Ready for API integration
 * 
 * Integration Points:
 * - Ready for backend API: Replace mock data with user session
 * - Email change requests would trigger support ticket
 * - Password updates would require current password verification
 * - 2FA enrollment would generate QR codes
 */

"use client"

import * as React from "react"
import { IconAlertCircle, IconLock, IconMail, IconPhone, IconUser, IconShield } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import FadeContent from "@/components/fade-content"

export default function AccountPage() {
  // ==================== STATE MANAGEMENT ====================

  /**
   * User Profile State
   * Mock user data - in production, would come from session/API
   */
  const [profile, setProfile] = React.useState({
    name: "John Doe",
    email: "john.doe@dispatchly.com",
    phone: "(555) 123-4567",
    role: "Manager",
    avatar: "JD",
  })

  /**
   * Password State
   */
  const [passwordData, setPasswordData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  /**
   * Two-Factor Authentication State
   */
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)

  // ==================== EVENT HANDLERS ====================

  /**
   * UPDATE PROFILE HANDLER
   * 
   * Handles updates to user profile information.
   * Email field is locked and requires support contact.
   */
  const handleUpdateProfile = () => {
    // In production: API call to update profile
    toast.success("Profile updated successfully!")
  }

  /**
   * UPDATE PASSWORD HANDLER
   * 
   * Validates and updates user password.
   */
  const handleUpdatePassword = () => {
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    // In production: API call to update password
    toast.success("Password updated successfully!")
    
    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  /**
   * TOGGLE TWO-FACTOR AUTHENTICATION
   * 
   * Enables or disables 2FA for the user account.
   */
  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      // In production: Show QR code enrollment dialog
      toast.success("Two-factor authentication enabled!")
      setTwoFactorEnabled(true)
    } else {
      // In production: Confirm disable with password
      toast.info("Two-factor authentication disabled")
      setTwoFactorEnabled(false)
    }
  }

  /**
   * REQUEST EMAIL CHANGE
   * 
   * Opens support request for email change.
   */
  const handleEmailChangeRequest = () => {
    toast.info("Please contact support@dispatchly.com to change your email address")
  }

  // ==================== RENDER ====================

  return (
    <>
      {/* PAGE HEADER */}
      <SiteHeader title="Account" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* PAGE TITLE */}
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-semibold">Account Settings</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your personal account information and security settings
              </p>
            </div>

            <div className="px-4 lg:px-6">
              <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
                <div className="grid gap-6 max-w-4xl">
                  
                  {/* PROFILE INFORMATION CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal details and contact information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-4">
                        <Avatar className="size-20">
                          <AvatarFallback className="text-xl font-semibold">
                            {profile.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">Profile Picture</p>
                          <p className="text-muted-foreground text-xs mt-1">
                            Avatar displays your initials
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          <div className="flex items-center gap-2">
                            <IconUser className="size-4" />
                            Full Name
                          </div>
                        </Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>

                      {/* Email Field (Locked) */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <div className="flex items-center gap-2">
                            <IconMail className="size-4" />
                            Email Address
                            <Badge variant="secondary" className="ml-auto">
                              <IconLock className="size-3 mr-1" />
                              Locked
                            </Badge>
                          </div>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          disabled
                          className="bg-muted cursor-not-allowed"
                        />
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <IconAlertCircle className="size-4 mt-0.5 shrink-0" />
                          <p>
                            To change your email address, please contact{" "}
                            <a
                              href="mailto:support@dispatchly.com"
                              className="text-primary hover:underline"
                            >
                              support@dispatchly.com
                            </a>
                          </p>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <div className="flex items-center gap-2">
                            <IconPhone className="size-4" />
                            Phone Number
                          </div>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="Enter your phone number"
                        />
                      </div>

                      {/* Role Display (Read-only) */}
                      <div className="space-y-2">
                        <Label>
                          <div className="flex items-center gap-2">
                            <IconShield className="size-4" />
                            Role
                          </div>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-sm">
                            {profile.role}
                          </Badge>
                          <p className="text-muted-foreground text-xs">
                            Contact an administrator to change your role
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button onClick={handleUpdateProfile}>
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* PASSWORD & AUTHENTICATION CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Password & Authentication</CardTitle>
                      <CardDescription>
                        Manage your password and security settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          placeholder="Enter your current password"
                        />
                      </div>

                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          placeholder="Enter your new password"
                        />
                        <p className="text-muted-foreground text-xs">
                          Password must be at least 8 characters long
                        </p>
                      </div>

                      {/* Confirm New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          placeholder="Confirm your new password"
                        />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button onClick={handleUpdatePassword}>
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* TWO-FACTOR AUTHENTICATION CARD */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription>
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Two-Factor Authentication</p>
                          <p className="text-muted-foreground text-sm">
                            Require a code from your phone to log in
                          </p>
                          {twoFactorEnabled && (
                            <Badge variant="secondary" className="mt-2">
                              <IconShield className="size-3 mr-1" />
                              Enabled
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant={twoFactorEnabled ? "outline" : "default"}
                          onClick={handleToggle2FA}
                        >
                          {twoFactorEnabled ? "Disable" : "Enable"}
                        </Button>
                      </div>

                      {!twoFactorEnabled && (
                        <div className="bg-muted/50 rounded-lg p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <IconAlertCircle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div className="text-sm text-muted-foreground">
                              <p className="font-medium text-foreground mb-1">
                                Recommended Security Feature
                              </p>
                              <p>
                                Two-factor authentication significantly improves your account security
                                by requiring a second verification step when logging in.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </FadeContent>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

