import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SLATURA WOOD UK | Premium Wood Acoustic Panels & Interior Design",
  description:
    "Premium wood slat wall panels, acoustic solutions and curated interior decor. European craftsmanship for modern interiors. Free UK delivery.",
  keywords: ["wood panels", "acoustic panels", "interior design", "home decor", "premium wall panels", "UK"],
}

export default function UKLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
