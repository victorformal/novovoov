"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    shop: [
      { name: t("footer.allProducts"), href: "/products" },
      { name: t("footer.wallPanels"), href: "/products?category=wall-panels" },
      { name: t("footer.lighting"), href: "/products?category=lighting" },
      { name: t("footer.mirrors"), href: "/products?category=mirrors" },
      { name: t("footer.decor"), href: "/products?category=decor" },
    ],
    company: [
      { name: t("footer.about"), href: "/about" },
      { name: t("footer.contact"), href: "/contact" },
      { name: t("footer.sustainability"), href: "/about#sustainability" },
      { name: t("footer.careers"), href: "/about#careers" },
    ],
    support: [
      { name: t("footer.shipping"), href: "/contact#shipping" },
      { name: t("footer.returns"), href: "/contact#returns" },
      { name: t("footer.faq"), href: "/contact#faq" },
      { name: t("footer.careGuide"), href: "/contact#care" },
    ],
  }

  return (
    <footer className="border-t border-border/50 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-xl font-medium tracking-[0.15em] text-foreground">
              PANNEAU WOOD
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">{t("footer.shop")}</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">{t("footer.company")}</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground">{t("footer.support")}</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-10 sm:flex-row">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} PANNEAU WOOD. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
