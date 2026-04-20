"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = {
  fr: [
    { name: "Boutique", href: "/products" },
    { name: "Panneaux Muraux", href: "/products?category=wall-panels" },
    { name: "Eclairage", href: "/products?category=lighting" },
    { name: "Decoration", href: "/products?category=decor" },
    { name: "A Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  en: [
    { name: "Shop", href: "/products" },
    { name: "Wall Panels", href: "/products?category=wall-panels" },
    { name: "Lighting", href: "/products?category=lighting" },
    { name: "Decor", href: "/products?category=decor" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
}

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export function Header() {
  const { totalItems } = useCart()
  const [open, setOpen] = useState(false)
  const [language, setLanguage] = useState<"fr" | "en">("fr")

  const currentNav = navigation[language]
  const currentLang = languages.find((l) => l.code === language)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/50 bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-background">
            <div className="flex items-center justify-between pb-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-serif text-lg tracking-widest text-foreground"
              >
                PANNEAU WOOD
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              {currentNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg text-foreground/80 transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center font-serif text-base font-medium tracking-[0.15em] text-foreground transition-opacity hover:opacity-80 sm:text-lg lg:text-xl">
          PANNEAU WOOD
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {currentNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[13px] font-medium uppercase tracking-wider text-foreground/60 transition-colors duration-200 hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Language Selector and Cart */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 px-2 text-lg">
                <span>{currentLang?.flag}</span>
                <span className="sr-only">{language === "fr" ? "Changer de langue" : "Change language"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as "fr" | "en")}
                  className="cursor-pointer gap-2"
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">{language === "fr" ? "Panier" : "Cart"}</span>
            </Button>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
