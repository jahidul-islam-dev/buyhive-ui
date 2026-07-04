"use client"

import { ArrowUpRight, BadgeCheck, Lock, ShieldCheck, Sparkles } from "lucide-react"
import { BackButton } from "../back-button"
import { routes } from "@/lib/constants/routes"
import { SurfaceCard } from "../primitives"

const protections = [
    {
        title: "Secure sign-in",
        body: "Your account is protected with encrypted session handling and guided account safety checks.",
    },
    {
        title: "Payment safety",
        body: "Group payments are reviewed with clear confirmations so you always know where your money is going.",
    },
    {
        title: "Privacy controls",
        body: "You stay in control of notifications, account visibility, and the data you share with the community.",
    },
]

export function PrivacyScreen() {
    return (
        <div className="bh-page-enter flex h-full flex-col">
            <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
                <BackButton fallback={routes.settings} className="border-0 bg-transparent shadow-none" />
                <div>
                    <h1 className="text-lg font-bold text-foreground">Privacy & security</h1>
                    <p className="text-xs text-muted-foreground">Your account stays protected</p>
                </div>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto bh-no-scrollbar px-5 pb-8 pt-4">
                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-foreground">Professional account protection</h2>
                            <p className="text-sm text-muted-foreground">BuyHive uses trusted safeguards to keep your data and payments secure.</p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-muted/70 p-3 text-sm text-muted-foreground">
                        We follow best-practice account security for mobile commerce, including clear verification steps and safe payment handling.
                    </div>
                </section>

                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-accent text-accent-foreground">
                            <Lock className="h-4 w-4" />
                        </div>
                        <h2 className="text-base font-bold text-foreground">What you can expect</h2>
                    </div>
                    <div className="space-y-2">
                        {protections.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-border bg-background p-3">
                                <div className="flex items-start gap-2">
                                    <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.body}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-success/10 text-success">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-foreground">Need more help?</h2>
                                <p className="text-sm text-muted-foreground">Visit the support desk anytime.</p>
                            </div>
                        </div>
                        <a href="/help" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                            Open help <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </section>
            </div>
        </div>
    )
}
