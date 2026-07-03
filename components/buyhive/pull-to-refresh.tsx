"use client"

import {
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
  type UIEvent,
} from "react"
import { Loader2, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const THRESHOLD = 70

export function PullToRefresh({
  onRefresh,
  children,
  className,
}: {
  onRefresh: () => Promise<void> | void
  children: ReactNode
  className?: string
}) {
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef<number | null>(null)
  const atTop = useRef(true)

  function onScroll(e: UIEvent<HTMLDivElement>) {
    atTop.current = e.currentTarget.scrollTop <= 0
  }

  function onTouchStart(e: TouchEvent) {
    if (atTop.current && !refreshing) startY.current = e.touches[0].clientY
  }

  function onTouchMove(e: TouchEvent) {
    if (startY.current === null) return
    const delta = e.touches[0].clientY - startY.current
    if (delta > 0) setPull(Math.min(delta * 0.5, 90))
  }

  async function onTouchEnd() {
    if (pull >= THRESHOLD) {
      setRefreshing(true)
      setPull(THRESHOLD)
      await onRefresh()
      setRefreshing(false)
    }
    setPull(0)
    startY.current = null
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-center text-primary"
        style={{ height: refreshing ? THRESHOLD : pull, opacity: pull > 8 || refreshing ? 1 : 0 }}
      >
        {refreshing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <RefreshCw
            className="h-5 w-5 transition-transform"
            style={{ transform: `rotate(${pull * 3}deg)` }}
          />
        )}
      </div>
      <div
        onScroll={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn("h-full overflow-y-auto bh-no-scrollbar transition-transform", className)}
        style={{ transform: `translateY(${refreshing ? THRESHOLD : pull}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
