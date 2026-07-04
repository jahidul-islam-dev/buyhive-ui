"use client"

import { useRouter } from "next/navigation"
import { routes } from "@/lib/constants/routes"

export function useAppNav() {
  const router = useRouter()

  return {
    goBack: (fallback = routes.home) => {
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back()
      } else {
        router.push(fallback)
      }
    },
    goHome: () => router.replace(routes.home),
    goExplore: () => router.replace(routes.explore),
    goGroups: () => router.replace(routes.groups),
    goNotifications: () => router.replace(routes.notifications),
    goProfile: () => router.replace(routes.profile),
    goOnboarding: () => router.replace(routes.onboarding),
    goLogin: () => router.push(routes.login),
    goSignup: () => router.push(routes.signup),
    goCreate: () => router.push(routes.create),
    goSettings: () => router.push(routes.settings),
    goPrivacy: () => router.push(routes.privacy),
    goHelp: () => router.push(routes.help),
    goProduct: (productId: string) => router.push(routes.product(productId)),
    goGroupChat: (groupId: string) => router.push(routes.groupChat(groupId)),
    push: router.push,
    replace: router.replace,
  }
}
