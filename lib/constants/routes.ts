export const routes = {
  splash: "/",
  onboarding: "/onboarding",
  login: "/auth/login",
  signup: "/auth/signup",
  home: "/home",
  explore: "/explore",
  groups: "/groups",
  notifications: "/notifications",
  profile: "/profile",
  create: "/create",
  settings: "/settings",
  privacy: "/privacy",
  help: "/help",
  product: (productId: string) => `/products/${productId}`,
  groupChat: (groupId: string) => `/groups/${groupId}/chat`,
} as const

export type TabRoute =
  | typeof routes.home
  | typeof routes.explore
  | typeof routes.groups
  | typeof routes.notifications
  | typeof routes.profile

export function isTabRoute(pathname: string): pathname is TabRoute {
  return (
    pathname === routes.home ||
    pathname === routes.explore ||
    pathname === routes.groups ||
    pathname === routes.notifications ||
    pathname === routes.profile
  )
}

export function getActiveTab(pathname: string): TabRoute | null {
  if (pathname === routes.home) return routes.home
  if (pathname === routes.explore || pathname.startsWith("/search")) return routes.explore
  if (pathname === routes.groups || pathname.startsWith("/groups/")) return routes.groups
  if (pathname === routes.notifications) return routes.notifications
  if (pathname === routes.profile || pathname.startsWith("/profile/")) return routes.profile
  return null
}
