"use client"

import { type FormEvent, useState } from "react"
import { ArrowLeft, Loader2, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "../app-context"
import { Logo } from "../logo"
import { Field } from "../form-field"

export function LoginScreen() {
  const { navigate, goBack, pushToast } = useApp()
  const [loading, setLoading] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      pushToast("Welcome back, Aryan!")
      navigate("home")
    }, 1100)
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bh-no-scrollbar px-6 pb-6 pt-6">
      <button
        type="button"
        onClick={goBack}
        aria-label="Go back"
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="mt-6 flex flex-col items-center">
        <Logo size="lg" />
        <h1 className="mt-5 text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground text-pretty">
          Log in to keep saving with your groups
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field
          label="Email"
          type="email"
          required
          placeholder="you@university.edu"
          defaultValue="aryan@buet.ac.bd"
          icon={<Mail className="h-4 w-4" />}
        />
        <Field
          label="Password"
          type="password"
          required
          placeholder="Enter your password"
          defaultValue="password"
          icon={<Lock className="h-4 w-4" />}
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => pushToast("Password reset link sent", "info")}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        variant="outline"
        onClick={() => {
          pushToast("Signed in with Google")
          navigate("home")
        }}
        className="h-12 w-full gap-2 bg-transparent text-sm font-semibold"
      >
        <GoogleIcon /> Google
      </Button>

      <p className="mt-auto pt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("signup")}
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}
