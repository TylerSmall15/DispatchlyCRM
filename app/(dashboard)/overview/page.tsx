/**
 * OVERVIEW PAGE COMPONENT
 * 
 * Purpose:
 * Main dashboard overview page that displays a high-level snapshot of business operations.
 * Provides real-time visibility into key metrics, revenue trends, and team activity.
 * 
 * Key Features:
 * - KPI Summary Cards: Displays critical metrics (Open Leads, Upcoming Jobs, Completed Jobs, Revenue)
 * - Weekly Revenue Chart: Interactive area chart showing revenue trends with Clients/Companies breakdown
 * - Team Activity Table: Multi-tabbed view of Team Status, Recent Jobs, and Latest Leads
 * - Animated Transitions: Fade-in animations with blur effect for smooth content loading
 * 
 * Data Flow:
 * - Imports static data from data.json for the activity table
 * - SectionCards and ChartAreaInteractive components manage their own mock data
 * - Client-side rendered for animation support
 */

"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import FadeContent from "@/components/fade-content"

// Import mock data for the activity table (Team Status, Recent Jobs, Latest Leads)
import data from "./data.json"

export default function OverviewPage() {
  return (
    <>
      {/* Page Header: Displays breadcrumb navigation and page title */}
      <SiteHeader title="Overview" />
      
      {/* Main Content Container: Full height flex layout */}
      <div className="flex flex-1 flex-col">
        {/* Container Query Wrapper: Enables responsive design based on container width */}
        <div className="@container/main flex flex-1 flex-col gap-2">
          {/* Content Grid: Responsive padding and gap spacing */}
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            
            {/* Page Title: Large heading for the Overview page */}
            <div className="px-4 lg:px-6">
              <h1 className="text-2xl font-semibold">Overview</h1>
            </div>
            
            {/* KPI SECTION: Four metric cards showing key business indicators
                - Open Leads: Number of active leads in the pipeline
                - Upcoming Jobs: Scheduled jobs for the near term
                - Completed This Week: Jobs finished in current week
                - Revenue Scheduled: Total revenue from upcoming jobs
                - Animated with fade-in from right effect */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true}>
              <SectionCards />
            </FadeContent>
            
            {/* CHART SECTION: Weekly revenue trend visualization
                - Interactive area chart with tooltips
                - Dual data series: Clients revenue (blue) and Companies revenue (green)
                - Time range selector for weekly/monthly/yearly views
                - Responsive design with container padding
                - Animated with fade-in from right effect */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true} delay={150}>
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </FadeContent>
            
            {/* DATA TABLE SECTION: Multi-tabbed activity view
                - Tab 1 - Team Status: Shows team member availability and current assignments
                - Tab 2 - Recent Jobs: Displays recently completed jobs with status
                - Tab 3 - Latest Leads: Lists new leads requiring attention
                - Features: Drag-and-drop reordering, row selection, pagination
                - Full-width with built-in horizontal padding
                - Animated with fade-in from right effect */}
            <FadeContent blur={true} duration={900} easing="ease-out" initialOpacity={0} fromRight={true} delay={300}>
              <DataTable data={data} />
            </FadeContent>
          </div>
        </div>
      </div>
    </>
  )
}
