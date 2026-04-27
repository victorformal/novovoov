import { notFound } from "next/navigation"
import { getProductBySlug, products } from "@/lib/products"
import ClientProductPageUK from "./ClientProductPageUK"

export default async function ProductPageUK() {
  const product = getProductBySlug("flexible-acoustic-panel-uk")

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && !p.hidden)
    .slice(0, 4)

  const decorAndLightingProducts = products
    .filter((p) => (p.category === "decor" || p.category === "lighting") && p.id !== product.id && !p.hidden)
    .slice(0, 4)

  // Get products for "Frequently bought together" section (UK versions)
  const wallCleanerProduct = products.find((p) => 
    p.slug === "wall-preparation-cleaner" && p.id !== product.id
  )
  const ledStripProduct = products.find((p) => 
    p.slug === "recessed-led-strip-lighting" && p.id !== product.id
  )
  const frequentlyBoughtTogether = [wallCleanerProduct, ledStripProduct].filter(Boolean) as typeof products
  const frequentlyBoughtTotal = frequentlyBoughtTogether.reduce((sum, p) => sum + p.price, 0)
  
  // Combine products for "You Might Also Like"
  const excludeIds = ["prod_U2rvasMPkTpnoe", "prod_U2rv1ALPGyHHs7"]
  const seenIds = new Set<string>()
  const orderBumpProducts = [
    ...relatedProducts.filter((p) => !excludeIds.includes(p.id)),
    ...decorAndLightingProducts.filter((p) => !excludeIds.includes(p.id)),
  ].filter((p) => {
    if (seenIds.has(p.id)) return false
    seenIds.add(p.id)
    return true
  }).slice(0, 6)

  const discountPercent =
    product.onSale && product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <ClientProductPageUK 
      product={product} 
      relatedProducts={relatedProducts} 
      decorAndLightingProducts={decorAndLightingProducts} 
      frequentlyBoughtTogether={frequentlyBoughtTogether} 
      frequentlyBoughtTotal={frequentlyBoughtTotal} 
      orderBumpProducts={orderBumpProducts} 
      discountPercent={discountPercent}
    />
  )
}
