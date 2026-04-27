import { Suspense } from "react"
import { CheckoutContent } from "@/components/checkout-content"
import { TikTokCheckout } from "@/components/tiktok-checkout"

export default function CheckoutPageUK() {
  return (
    <>
      <TikTokCheckout />
      <Suspense fallback={null}>
        <CheckoutContent />
      </Suspense>
    </>
  )
}
