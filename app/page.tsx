import { AppProvider } from "@/components/buyhive/app-context"
import { AppShell } from "@/components/buyhive/app-shell"
import { DeviceFrame } from "@/components/buyhive/device-frame"

export default function Page() {
  return (
    <AppProvider>
      <DeviceFrame>
        <AppShell />
      </DeviceFrame>
    </AppProvider>
  )
}
