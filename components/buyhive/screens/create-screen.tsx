"use client"

import { type FormEvent, useState } from "react"
import { CheckCircle2, ImagePlus, Loader2, PartyPopper, MapPin, Tag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories, money, type Category } from "@/lib/buyhive-data"
import { useApp } from "../app-context"
import { useAppNav } from "@/hooks/use-app-nav"
import { BackButton } from "../back-button"
import { routes } from "@/lib/constants/routes"
import { Field } from "../form-field"
import { writeCreatedProduct } from "@/lib/buyhive-data"

type FormValues = {
  name: string
  image: string
  category: Category | ""
  originalPrice: string
  targetMembers: string
  description: string
  location: string
  deadline: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: "",
  image: "",
  category: "",
  originalPrice: "",
  targetMembers: "",
  description: "",
  location: "",
  deadline: "",
}

export function CreateScreen() {
  const { pushToast } = useApp()
  const { goGroups, goHome, goProduct } = useAppNav()
  const [formValues, setFormValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(values: FormValues): FormErrors {
    const nextErrors: FormErrors = {}

    if (!values.name.trim()) nextErrors.name = "Product name is required."
    if (!values.image.trim()) {
      nextErrors.image = "Product image URL is required."
    } else if (!/^https?:\/\//i.test(values.image.trim()) && !values.image.trim().startsWith("/")) {
      nextErrors.image = "Please enter a valid image URL."
    }
    if (!values.category) nextErrors.category = "Please choose a category."

    const price = Number(values.originalPrice)
    if (!values.originalPrice || Number.isNaN(price) || price <= 0) {
      nextErrors.originalPrice = "Enter a valid original price."
    }

    const members = Number(values.targetMembers)
    if (!values.targetMembers || Number.isNaN(members) || members < 2) {
      nextErrors.targetMembers = "Target member count must be at least 2."
    }

    if (!values.description.trim() || values.description.trim().length < 12) {
      nextErrors.description = "Please add a short description with at least 12 characters."
    }

    if (!values.location.trim()) nextErrors.location = "Delivery location is required."
    if (!values.deadline) nextErrors.deadline = "Deadline is required."

    return nextErrors
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    const nextErrors = validate(formValues)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      pushToast("Please complete every field correctly.", "error")
      return
    }

    setLoading(true)
    setTimeout(() => {
      const slug = `${formValues.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`
      const createdProduct = {
        id: slug,
        name: formValues.name.trim(),
        image: formValues.image.trim(),
        category: formValues.category as Category,
        originalPrice: Number(formValues.originalPrice),
        groupPrice: Math.max(100, Math.round(Number(formValues.originalPrice) * 0.75)),
        maxMembers: Number(formValues.targetMembers),
        joinedMembers: 1,
        deadline: formValues.deadline,
        description: `${formValues.description.trim()} Delivery will be arranged at ${formValues.location.trim()}.`,
        host: "You",
        university: "Your campus",
        aiReason: "newly created by you",
      }

      writeCreatedProduct(createdProduct)
      setLoading(false)
      setCreated(true)
      pushToast("Group created successfully", "success")
      window.setTimeout(() => goProduct(createdProduct.id), 1100)
    }, 1100)
  }

  if (created) {
    return (
      <div className="bh-page-enter flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="bh-animate-pop bh-animate-breathe grid h-20 w-20 place-items-center rounded-full bg-success/15 text-success">
          <PartyPopper className="h-9 w-9" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Group Created!</h1>
        <p className="max-w-xs text-sm text-muted-foreground text-pretty">
          Your group buy is live. Share the invite link with classmates to fill it up faster.
        </p>
        <div className="w-full max-w-xs space-y-2 pt-2">
          <Button className="h-12 w-full font-semibold" onClick={() => goGroups()}>
            View my groups
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full bg-transparent font-semibold"
            onClick={() => goHome()}
          >
            Back to home
          </Button>
        </div>
      </div>
    )
  }

  const priceValue = Number(formValues.originalPrice)
  const estimatedSavings = Number.isFinite(priceValue) && priceValue > 0 ? Math.max(0, priceValue - 100) : 0

  return (
    <div className="bh-page-enter flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-3">
        <BackButton fallback={routes.home} className="border-0 bg-transparent shadow-none" />
        <div>
          <h1 className="text-lg font-bold text-foreground">Create a group buy</h1>
          <p className="text-xs text-muted-foreground">Fill in the details and invite others to join</p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="flex-1">
        <div className="space-y-4 overflow-y-auto bh-no-scrollbar px-5 pb-28 pt-4">
          <div className="rounded-2xl border border-dashed border-border bg-muted/50 p-3">
            <label className="flex h-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <ImagePlus className="h-7 w-7" />
              <span className="text-sm font-medium">Add product image</span>
              <input
                type="text"
                value={formValues.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="sr-only"
              />
            </label>
            {errors.image ? <p className="mt-2 text-xs text-error">{errors.image}</p> : null}
          </div>

          <Field
            label="Product name"
            required
            placeholder="e.g. Arduino Uno R3"
            value={formValues.name}
            onChange={(e) => updateField("name", e.target.value)}
            error={errors.name}
          />

          <div className="space-y-1.5">
            <label htmlFor="category" className="text-sm font-medium text-foreground">
              Product category
            </label>
            <div className="relative">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                id="category"
                value={formValues.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-input bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.label} value={category.label}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.category ? <p className="text-xs text-error">{errors.category}</p> : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Original price"
              type="number"
              required
              value={formValues.originalPrice}
              onChange={(e) => updateField("originalPrice", e.target.value)}
              error={errors.originalPrice}
            />
            <Field
              label="Target members"
              type="number"
              required
              value={formValues.targetMembers}
              onChange={(e) => updateField("targetMembers", e.target.value)}
              error={errors.targetMembers}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="description"
              value={formValues.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe the product, benefits, and why classmates should join."
              rows={4}
              className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {errors.description ? <p className="text-xs text-error">{errors.description}</p> : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="location" className="text-sm font-medium text-foreground">
                Delivery location
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="location"
                  value={formValues.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g. Central Campus"
                  className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {errors.location ? <p className="text-xs text-error">{errors.location}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="deadline" className="text-sm font-medium text-foreground">
                Deadline
              </label>
              <div className="relative">
                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="deadline"
                  type="date"
                  value={formValues.deadline}
                  onChange={(e) => updateField("deadline", e.target.value)}
                  className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {errors.deadline ? <p className="text-xs text-error">{errors.deadline}</p> : null}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-accent/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-accent-foreground/80">Expected savings</p>
                <p className="text-2xl font-bold text-primary">
                  {formValues.originalPrice ? money(estimatedSavings) : "Enter price"}
                </p>
                <p className="text-xs text-accent-foreground/70">estimated per member</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 p-4 backdrop-blur-md">
          <Button type="submit" disabled={loading} className="h-12 w-full text-base font-semibold">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Group"}
          </Button>
        </div>
      </form>
    </div>
  )
}
