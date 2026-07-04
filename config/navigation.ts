import { Bell, Compass, Home, User, Users, type LucideIcon } from "lucide-react"
import { routes, type TabRoute } from "@/lib/constants/routes"

export type TabItem = {
  href: TabRoute
  label: string
  icon: LucideIcon
}

export const TAB_ITEMS: TabItem[] = [
  { href: routes.home, label: "Home", icon: Home },
  { href: routes.explore, label: "Explore", icon: Compass },
  { href: routes.groups, label: "Groups", icon: Users },
  { href: routes.notifications, label: "Notifications", icon: Bell },
  { href: routes.profile, label: "Profile", icon: User },
]
