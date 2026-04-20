"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function CategoriesSection() {
  const { t } = useLanguage()

  const categories = [
    {
      name: t("categories.wallPanels"),
      description: t("categories.wallPanelsDesc"),
      href: "/products?category=wall-panels",
      image: "/category-wall-panels-oak-slat.jpg",
    },
    {
      name: t("categories.lighting"),
      description: t("categories.lightingDesc"),
      href: "/products?category=lighting",
      image: "/category-lighting-minimalist-lamp.jpg",
    },
    {
      name: t("categories.decor"),
      description: t("categories.decorDesc"),
      href: "/products?category=decor",
      image: "/category-decor-ceramic-vase.jpg",
    },
  ]

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-accent">{t("categories.browse")}</span>
          <h2 className="font-serif text-3xl font-normal sm:text-4xl lg:text-5xl">{t("categories.title")}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            {t("categories.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group relative aspect-[3/4] overflow-hidden block">
              <div className="absolute inset-0">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent transition-all duration-300 group-hover:from-foreground/70" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                <h3 className="font-serif text-2xl font-normal">{category.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-wider text-primary-foreground/80">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
