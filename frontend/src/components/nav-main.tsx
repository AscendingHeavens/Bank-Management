"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    href: string
    icon?: Icon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">

        {/* Optional action button */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Main navigation */}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.href

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  data-active={isActive}
                  className="data-[active=true]:bg-muted data-[active=true]:font-medium"
                >
                  <Link href={item.href}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>

      </SidebarGroupContent>
    </SidebarGroup>
  )
}
