"use client"

import { type FormEvent, useEffect, useRef, useState } from "react"
import { Check, CheckCheck, Clock, Send, Users } from "lucide-react"
import { chatMessages, getProduct, myGroups, progress, type ChatMessage } from "@/lib/buyhive-data"
import { BackButton } from "../back-button"
import { routes } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function ChatScreen({ groupId }: { groupId: string }) {
  const group = myGroups.find((g) => g.id === groupId)
  const product = group ? getProduct(group.productId) : undefined
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages)
  const [draft, setDraft] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send(e: FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((m) => [
      ...m,
      {
        id: `local-${Date.now()}`,
        author: "Aryan",
        avatar: "/avatars/aryan.png",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        self: true,
      },
    ])
    setDraft("")
  }

  const title = product ? `${product.name} Group` : "Group Chat"
  const subtitle = product
    ? `${product.joinedMembers} of ${product.maxMembers} joined · ${progress(product)}% funded`
    : "Group conversation"

  return (
    <div className="bh-page-enter flex h-full flex-col bg-muted/40">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-2.5">
        <BackButton fallback={routes.groups} className="border-0 bg-transparent shadow-none" />
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-success">{subtitle}</p>
        </div>
      </header>

      <div className="flex-1 space-y-2.5 overflow-y-auto bh-no-scrollbar px-4 py-4">
        {messages.map((m) => {
          if (m.system) {
            return (
              <div key={m.id} className="flex justify-center">
                <span className="rounded-full bg-card px-3 py-1 text-center text-xs text-muted-foreground shadow-sm">
                  {m.text}
                </span>
              </div>
            )
          }
          return (
            <div
              key={m.id}
              className={cn("flex items-end gap-2", m.self ? "justify-end" : "justify-start")}
            >
              {!m.self && (
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                  {m.author.slice(0, 2)}
                </span>
              )}
              <div
                className={cn(
                  "max-w-[72%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                  m.self
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-card text-card-foreground",
                )}
              >
                {!m.self && (
                  <p className="mb-0.5 text-xs font-semibold text-primary">{m.author}</p>
                )}
                <p className="leading-snug text-pretty">{m.text}</p>
                <div
                  className={cn(
                    "mt-1 flex items-center justify-end gap-1 text-[10px]",
                    m.self ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {m.status === "paid" && <span className="font-semibold text-success">Paid</span>}
                  {m.status === "waiting" && (
                    <span className="inline-flex items-center gap-0.5 font-semibold text-warning">
                      <Clock className="h-3 w-3" /> Waiting
                    </span>
                  )}
                  <span>{m.time}</span>
                  {m.self &&
                    (m.status === "paid" ? (
                      <CheckCheck className="h-3 w-3" />
                    ) : (
                      <Check className="h-3 w-3" />
                    ))}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="flex items-center gap-2 border-t border-border bg-card p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message the group..."
          aria-label="Message"
          className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          aria-label="Send message"
          disabled={!draft.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform active:scale-90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
