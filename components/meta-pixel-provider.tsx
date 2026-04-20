"use client"

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: any
  }
}

// Pixel IDs - Both pixels are loaded via layout.tsx <head>
// This provider only renders the <noscript> fallback and wraps children.
const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || "992482810135395"
const PIXEL_ID_2 = "1309753271055484" // Second Meta Pixel

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fallback noscript para Pixel 1 */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {/* Fallback noscript para Pixel 2 */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID_2}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {children}
    </>
  )
}
