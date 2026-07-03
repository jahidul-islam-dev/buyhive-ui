"use client"

import { useApp, TAB_SCREENS, type Screen } from "./app-context"
import { BottomNav } from "./bottom-nav"
import { Toaster } from "./toaster"
import { SplashScreen } from "./screens/splash-screen"
import { OnboardingScreen } from "./screens/onboarding-screen"
import { LoginScreen } from "./screens/login-screen"
import { SignupScreen } from "./screens/signup-screen"
import { HomeScreen } from "./screens/home-screen"
import { ExploreScreen } from "./screens/explore-screen"
import { ProductScreen } from "./screens/product-screen"
import { CreateScreen } from "./screens/create-screen"
import { GroupsScreen } from "./screens/groups-screen"
import { ChatScreen } from "./screens/chat-screen"
import { NotificationsScreen } from "./screens/notifications-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { SettingsScreen } from "./screens/settings-screen"

const SCREENS: Record<Screen, React.ComponentType> = {
  splash: SplashScreen,
  onboarding: OnboardingScreen,
  login: LoginScreen,
  signup: SignupScreen,
  home: HomeScreen,
  explore: ExploreScreen,
  product: ProductScreen,
  create: CreateScreen,
  groups: GroupsScreen,
  chat: ChatScreen,
  notifications: NotificationsScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
}

export function AppShell() {
  const { screen } = useApp()
  const Active = SCREENS[screen]
  const showTabBar = TAB_SCREENS.includes(screen)

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background">
      <div className="relative flex-1 overflow-hidden">
        <div key={screen} className="bh-animate-fade-up absolute inset-0 overflow-hidden">
          <Active />
        </div>
      </div>
      {showTabBar && <BottomNav />}
      <Toaster />
    </div>
  )
}
