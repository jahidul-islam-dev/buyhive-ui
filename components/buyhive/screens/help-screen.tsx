"use client"

import { useState } from "react"
import {
    ArrowUpRight,
    ChevronRight,
    Clock3,
    Copy,
    Mail,
    MessageCircleQuestion,
    Phone,
    ShieldCheck,
    Sparkles,
} from "lucide-react"
import { BackButton } from "../back-button"
import { routes } from "@/lib/constants/routes"
import { useApp } from "../app-context"
import { SurfaceCard } from "../primitives"

const faqs = [
    {
        question: "How do I join a group buy?",
        answer: "Open any deal, tap Join group, and confirm your share. You’ll get updates in the group chat and notifications.",
    },
    {
        question: "Can I get support for payments?",
        answer: "Yes. Contact our office directly if you have issues with payment confirmation, refunds, or split amounts.",
    },
    {
        question: "How fast do you reply?",
        answer: "Our team usually responds within 2 hours during office hours, and often sooner for urgent order issues.",
    },
]

const supportEmail = "hello@buyhive.app"
const officePhone = "+880 1711-234567"

export function HelpScreen() {
    const { pushToast } = useApp()
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    async function copyValue(value: string, label: string) {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value)
            pushToast(`${label} copied`, "success")
        } else {
            pushToast(`${label} ready to copy`, "info")
        }
    }

    function openEmail() {
        window.location.href = `mailto:${supportEmail}?subject=BuyHive%20Support%20Request`
        pushToast("Opening your mail app", "info")
    }

    function callOffice() {
        window.location.href = `tel:${officePhone.replace(/\s+/g, "")}`
        pushToast("Calling BuyHive office", "info")
    }

    return (
        <div className="bh-page-enter flex h-full flex-col">
            <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
                <BackButton fallback={routes.profile} className="border-0 bg-transparent shadow-none" />
                <div>
                    <h1 className="text-lg font-bold text-foreground">Help & support</h1>
                    <p className="text-xs text-muted-foreground">We’re here whenever you need us</p>
                </div>
            </header>

            <div className="flex-1 space-y-5 overflow-y-auto bh-no-scrollbar px-5 pb-8 pt-4">
                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-foreground">Need a hand?</h2>
                            <p className="text-sm text-muted-foreground">Reach our team for support, order issues, or account help.</p>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-2">
                        <button
                            type="button"
                            onClick={openEmail}
                            className="flex items-center justify-between rounded-2xl border border-border bg-background px-3.5 py-3 text-left"
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground">
                                    <Mail className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-foreground">Email support</span>
                                    <span className="text-xs text-muted-foreground">{supportEmail}</span>
                                </span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </button>

                        <button
                            type="button"
                            onClick={callOffice}
                            className="flex items-center justify-between rounded-2xl border border-border bg-background px-3.5 py-3 text-left"
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground">
                                    <Phone className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-foreground">Call the office</span>
                                    <span className="text-xs text-muted-foreground">{officePhone}</span>
                                </span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </button>

                        <button
                            type="button"
                            onClick={() => copyValue(supportEmail, "Support email")}
                            className="flex items-center justify-between rounded-2xl border border-border bg-background px-3.5 py-3 text-left"
                        >
                            <span className="flex items-center gap-3">
                                <span className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-foreground">
                                    <Copy className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-foreground">Copy support email</span>
                                    <span className="text-xs text-muted-foreground">Use it in your favorite mail app</span>
                                </span>
                            </span>
                        </button>
                    </div>
                </section>

                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-accent-foreground">
                            <Clock3 className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-foreground">Office hours</h2>
                            <p className="text-sm text-muted-foreground">Mon–Fri · 9:00 AM to 8:00 PM</p>
                        </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-muted/70 p-3 text-sm text-muted-foreground">
                        Typical response time is within 2 hours for urgent issues. For payment questions, our office team will guide you step-by-step.
                    </div>
                </section>

                <section className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-success/10 text-success">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-foreground">Quick answers</h2>
                            <p className="text-sm text-muted-foreground">Popular questions from the BuyHive community</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {faqs.map((item, index) => {
                            const isOpen = openFaq === index
                            return (
                                <div key={item.question} className="rounded-2xl border border-border bg-background">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
                                    >
                                        <span className="flex items-center gap-2">
                                            <MessageCircleQuestion className="h-4 w-4 text-primary" />
                                            <span className="text-sm font-semibold text-foreground">{item.question}</span>
                                        </span>
                                        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                                    </button>
                                    {isOpen && <p className="px-3.5 pb-3 text-sm text-muted-foreground">{item.answer}</p>}
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}
