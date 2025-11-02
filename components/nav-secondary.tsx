"use client"

import * as React from "react"
import Link from "next/link"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SearchDialog } from "@/components/search-dialog"
import { QuickCreateDialog } from "@/components/quick-create-dialog"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [quickCreateOpen, setQuickCreateOpen] = React.useState(false)

  // Keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd+K / Ctrl+K for search
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
      // Cmd+N / Ctrl+N for quick create
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setQuickCreateOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.title === "Search" ? (
                  <SidebarMenuButton onClick={() => setSearchOpen(true)}>
                    <item.icon />
                    <span>{item.title}</span>
                    <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘K</span>
                    </kbd>
                  </SidebarMenuButton>
                ) : item.title === "Quick Create" ? (
                  <SidebarMenuButton onClick={() => setQuickCreateOpen(true)}>
                    <item.icon />
                    <span>{item.title}</span>
                    <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘N</span>
                    </kbd>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <QuickCreateDialog open={quickCreateOpen} onOpenChange={setQuickCreateOpen} />
    </>
  )
}
