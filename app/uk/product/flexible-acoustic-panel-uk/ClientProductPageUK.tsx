"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Check, Star, Info, ArrowLeft, Truck, RotateCcw, Shield } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/products"
import { ProductGallery } from "@/components/product-gallery"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ColorSelector } from "@/components/color-selector"
import { ProductDescriptionSection } from "@/components/product-description-section"
import { CustomerReviews } from "@/components/customer-reviews"
import { ViewContentTracker } from "@/components/view-content-tracker"
import { useScrollVisibility } from "@/hooks/use-scroll-visibility"
import { PeopleViewing } from "@/components/people-viewing"
import { ProductCard } from "@/components/product-card"
import { SamplesSection } from "@/components/samples-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { ExitIntentPopup } from "@/components/exit-intent-popup"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { PanelCalculatorUK } from "@/components/panel-calculator-uk"
import { StickyCartBarUK } from "@/components/sticky-cart-bar-uk"
import { FAQSectionUK } from "@/components/faq-section-uk"
import { StockUrgencyBarUK } from "@/components/stock-urgency-bar-uk"
import { SocialProofInlineUK } from "@/components/social-proof-inline-uk"
import { RatingBreakdownUK } from "@/components/rating-breakdown-uk"
import { SalesNotificationToast } from "@/components/sales-notification-toast"
import { BonusModalUK } from "@/components/bonus-modal-uk"
import { BonusProgressBar } from "@/components/bonus-progress-bar"
import { VideoGalleryUK } from "@/components/video-gallery-uk"

interface ClientProductPageUKProps {
  product: any
  relatedProducts: any[]
  decorAndLightingProducts: any[]
  frequentlyBoughtTogether: any[]
  frequentlyBoughtTotal: number
  orderBumpProducts: any[]
  discountPercent: number
}

const ukTranslations = {
  backToProducts: "Back to products",
  inStock: "In stock",
  outOfStock: "Out of stock",
  limitedStock: "Limited Stock - Order Now!",
  selectColor: "Select Colour",
  selectStyle: "Select Style",
  features: "Features",
  dimensions: "Dimensions",
  material: "Material",
  freeShipping: "Free Shipping",
  freeShippingDesc: "Free delivery on all UK orders",
  easyReturns: "Easy Returns",
  easyReturnsDesc: "30-day return policy",
  securePayment: "Secure Payment",
  securePaymentDesc: "Your information is protected",
  frequentlyBought: "Frequently Bought Together",
  addBothToCart: "Add Both to Cart",
  youMightLike: "You Might Also Like",
  customerReviews: "Customer Reviews",
  wasPrice: "was",
  save: "Save",
  off: "off",
}

export default function ClientProductPageUK({
  product,
  relatedProducts,
  decorAndLightingProducts,
  frequentlyBoughtTogether,
  frequentlyBoughtTotal,
  orderBumpProducts,
  discountPercent,
}: ClientProductPageUKProps) {
  const t = ukTranslations
  const { addItem, totalItems } = useCart()
  const { opacity, isVisible } = useScrollVisibility()
  const [showStickyCta, setShowStickyCta] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // UK Order Summary state
  const [ukOrderData, setUkOrderData] = useState<{ qty: number; price: number; totalPrice: number; ledFree: boolean } | null>(null)
  
  // UK: Bonus modal state
  const [showBonusModal, setShowBonusModal] = useState(false)

  // UK: callback when item is added to cart
  const handleUKAddedToCart = (orderData: { qty: number; price: number; totalPrice: number; ledFree: boolean }) => {
    setUkOrderData(orderData)
    toast({
      title: "Product added!",
      description: `${orderData.qty} panel(s) added to cart`,
    })
  }
  
  // Sticky CTA: show when main CTA button scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.querySelector("[data-add-to-cart]") as HTMLElement | null
      if (btn) {
        const rect = btn.getBoundingClientRect()
        setShowStickyCta(rect.bottom < 0)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddBothToCart = () => {
    frequentlyBoughtTogether.forEach((bundleProduct) => {
      addItem({
        id: bundleProduct.id,
        name: bundleProduct.name,
        price: bundleProduct.price,
        image: bundleProduct.images[0],
        quantity: 1,
      })
    })
  }

  // UK: Handle "Complete My Order" button click - show bonus modal
  const handleFinalizeOrder = () => {
    setShowBonusModal(true)
  }

  const handleAcceptBonus = () => {
    sessionStorage.setItem("checkout_bonus_uk", JSON.stringify({
      bonusPanels: 5,
      cleanerIncluded: true,
      technicianIncluded: true,
      installationCode: "AXB8930M9",
      bonusValue: 107.00
    }))
    setShowBonusModal(false)
    router.push("/uk/checkout")
  }

  const handleDeclineBonus = () => {
    sessionStorage.removeItem("checkout_bonus_uk")
    setShowBonusModal(false)
    router.push("/uk/checkout")
  }

  return (
    <div className="py-8 lg:py-12 overflow-x-hidden max-w-full w-full box-border relative">
      <ViewContentTracker product={product} />

      {/* Sales notification toast */}
      <SalesNotificationToast />

      {/* Exit intent popup */}
      <ExitIntentPopup
        onConfirm={() => {
          const btn = document.querySelector("[data-add-to-cart]") as HTMLButtonElement
          if (btn) {
            btn.scrollIntoView({ behavior: "smooth" })
          }
        }}
      />

      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 overflow-hidden w-full">
        {/* Breadcrumb */}
        <Link
          href="/uk"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToProducts}
        </Link>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} video={product.video} videoThumbnail={product.videoThumbnail} />

          {/* Details */}
          <div className="flex flex-col min-w-0 w-full overflow-hidden max-w-full">
            {/* Badge */}
            {product.badge && (
              <span
                className={`mb-4 inline-block w-fit px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                  product.onSale ? "bg-accent text-accent-foreground" : "bg-foreground text-background"
                }`}
              >
                {product.onSale ? "Launch Offer" : product.badge}
              </span>
            )}

            {/* Title & Price */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-balance break-words">{product.name}</h1>

            {/* Benefit subheadline */}
            <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
              The only panel that hugs your curves, no tools, no tradesman, in 30 minutes
            </p>

            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">4.8</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-sky-600 hover:text-sky-700 hover:underline cursor-pointer">
                  (2,134 verified reviews)
                </span>
              </div>
              <SocialProofInlineUK />
            </div>

            {product.onSale && product.originalPrice ? (
              <div className="mt-4">
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-red-600 text-white rounded-sm mb-3">
                  Limited time deal
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-medium text-red-600">-{discountPercent}%</span>
                  <span className="text-2xl sm:text-3xl font-medium text-foreground">£{Math.floor(product.price)}</span>
                  <span className="text-sm align-top relative -top-2">
                    {((product.price % 1) * 100).toFixed(0).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base text-muted-foreground ml-1">/ piece</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-sm text-muted-foreground">Typical price:</span>
                  <span className="text-sm text-muted-foreground line-through">
                    £{product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    -{discountPercent}%
                  </span>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-pointer flex-shrink-0" />
                </div>
                <StockUrgencyBarUK />
                <PeopleViewing isFrench={false} />
              </div>
            ) : (
              <div className="mt-4">
                <p className="font-serif text-2xl">£{product.price}</p>
              </div>
            )}

            <div className="mt-6 space-y-5 max-w-full overflow-hidden">
              {/* Clear Hero Promise */}
              <div className="bg-secondary/50 border border-border/50 rounded-lg p-4">
                <p className="text-lg sm:text-xl font-serif font-medium text-foreground leading-snug text-center">
                  Transform Your Wall in Minutes, No Tools, No Mess
                </p>
                <div className="flex justify-center gap-3 mt-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                    <Check className="h-3.5 w-3.5" /> Flexible
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                    <Check className="h-3.5 w-3.5" /> Acoustic
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-accent">
                    <Check className="h-3.5 w-3.5" /> Peel & Stick
                  </span>
                </div>
              </div>

              {/* How It Works - 3 Steps */}
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-center mb-4">
                  How It Works
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <p className="text-xs font-medium">Peel the adhesive</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <p className="text-xs font-medium">Place & press</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <p className="text-xs font-medium">Enjoy!</p>
                  </div>
                </div>
              </div>

              <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
                The flexible acoustic panel that upgrades your space, reduces echo and delivers a modern architectural look, without renovation.
              </p>
              
              <ul className="space-y-2.5 pt-2">
                <li className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Flexible</strong>: Bends to curves and pillars</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Easy Install</strong>: Peel & stick, no tools needed</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>No Mess</strong>: No paint, no dust, no hassle</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Acoustic</strong>: Reduces echo and improves sound comfort</span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Premium Look</strong>: High-end wood aesthetic</span>
                </li>
              </ul>
              <div className="pt-2 space-y-1.5 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Size:</span> 270 × 110 cm, covers up to 3m²
                </p>
                <p className="text-xs italic">
                  Perfect for living rooms, bedrooms, offices and commercial spaces
                </p>
              </div>

              {/* Countdown Timer */}
              <CountdownTimer />

              {/* Panel Calculator */}
              <PanelCalculatorUK 
                product={product} 
                onAddedToCart={handleUKAddedToCart}
              />

              {/* Colour Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="pt-4">
                  <ColorSelector colors={product.colors} productName={product.name} />
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{t.freeShipping}</p>
                    <p className="text-xs text-muted-foreground">{t.freeShippingDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{t.easyReturns}</p>
                    <p className="text-xs text-muted-foreground">{t.easyReturnsDesc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium">{t.securePayment}</p>
                    <p className="text-xs text-muted-foreground">{t.securePaymentDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Gallery */}
        <VideoGalleryUK />

        {/* Rating Breakdown */}
        <RatingBreakdownUK />

        {/* FAQ Section */}
        <FAQSectionUK />

        {/* Product Description */}
        <ProductDescriptionSection product={product} />

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl mb-8">{t.customerReviews}</h2>
          <CustomerReviews productId={product.id} />
        </div>

        {/* You Might Also Like */}
        {orderBumpProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl mb-8">{t.youMightLike}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {orderBumpProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Cart Bar */}
      {showStickyCta && (
        <StickyCartBarUK 
          product={product} 
          onFinalizeOrder={handleFinalizeOrder}
        />
      )}

      {/* Bonus Modal */}
      {showBonusModal && (
        <BonusModalUK 
          onAccept={handleAcceptBonus}
          onDecline={handleDeclineBonus}
        />
      )}
    </div>
  )
}
