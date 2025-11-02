"use client"

import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TeamMember } from "@/app/(dashboard)/team/page"

interface TeamCardViewProps {
  data: TeamMember[]
  onCardClick: (member: TeamMember) => void
}

export function TeamCardView({ data, onCardClick }: TeamCardViewProps) {
  return (
    <div className="px-4 lg:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((member) => (
          <Card
            key={member.id}
            className="bg-card text-card-foreground flex flex-col items-center gap-4 rounded-xl border py-6 px-4 shadow-sm cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
            onClick={() => onCardClick(member)}
          >
            {/* Large Centered Avatar */}
            <Avatar className="size-24">
              <AvatarFallback className="text-3xl font-bold">
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            
            {/* Name - Centered */}
            <h3 className="text-base font-semibold text-center leading-tight">
              {member.name}
            </h3>
            
            {/* Role - Centered */}
            <p className="text-muted-foreground text-sm text-center">
              {member.role}
            </p>
            
            {/* Status Badge - Centered */}
            <Badge
              variant={member.status === "Active" ? "default" : "secondary"}
              className={
                member.status === "Active"
                  ? "bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20"
                  : ""
              }
            >
              {member.status}
            </Badge>
          </Card>
        ))}
      </div>
      {data.length === 0 && (
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">No team members found</p>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search criteria
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

