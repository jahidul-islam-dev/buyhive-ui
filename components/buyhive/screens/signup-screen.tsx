"use client"

import { type FormEvent, useState } from "react"
import { GraduationCap, Loader2, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "../app-context"
import { useAppNav } from "@/hooks/use-app-nav"
import { BackButton } from "../back-button"
import { routes } from "@/lib/constants/routes"
import { Logo } from "../logo"
import { Field } from "../form-field"

export function SignupScreen() {
  const { pushToast } = useApp()
  const { goHome, goLogin } = useAppNav()
  const [loading, setLoading] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      pushToast("Account created! Welcome to BuyHive")
      goHome()
    }, 1200)
  }

  return (
    <div className="bh-page-enter flex h-full flex-col overflow-y-auto bh-no-scrollbar px-6 pb-6 pt-6">
      <BackButton fallback={routes.onboarding} />

      <div className="mt-5 flex flex-col items-center">
        <Logo size="md" />
        <h1 className="mt-4 text-2xl font-bold text-foreground">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Join thousands of students saving together
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <Field label="Full name" required placeholder="Aryan Rahman" icon={<User className="h-4 w-4" />} />
        <Field
          label="University"
          required
          placeholder="e.g. BUET"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <Field
          label="Email"
          type="email"
          required
          placeholder="you@university.edu"
          icon={<Mail className="h-4 w-4" />}
        />
        <Field
          label="Password"
          type="password"
          required
          placeholder="Create a password"
          icon={<Lock className="h-4 w-4" />}
        />
        <Field
          label="Confirm password"
          type="password"
          required
          placeholder="Re-enter your password"
          icon={<Lock className="h-4 w-4" />}
        />

        <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
        </Button>
      </form>

      <p className="mt-auto pt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => goLogin()}
          className="font-semibold text-primary hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  )
}
