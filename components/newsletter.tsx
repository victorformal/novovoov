"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/lib/language-context"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="border-t border-border/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent">Newsletter</span>
          <h2 className="font-serif text-3xl font-normal sm:text-4xl lg:text-5xl">{t("newsletter.title")}</h2>
          <p className="mt-5 text-muted-foreground">
            {t("newsletter.subtitle")}
          </p>

          {submitted ? (
            <div className="mt-10 border border-border/50 bg-secondary/30 p-8">
              <p className="font-medium">{t("newsletter.thanks")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("newsletter.thanksDesc")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-3">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 flex-1 border-border/50 bg-background px-5 text-base placeholder:text-muted-foreground/60"
              />
              <Button type="submit" size="lg" className="h-14 px-10 text-sm font-medium uppercase tracking-wider">
                {t("newsletter.button")}
              </Button>
            </form>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            {t("newsletter.privacy")}
          </p>
        </div>
      </div>
    </section>
  )
}
