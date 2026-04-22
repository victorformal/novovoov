// Meta Conversions API (Server-Side)
import crypto from "crypto"

const META_API_VERSION = "v20.0"

interface UserData {
  em?: string // email (will be hashed)
  ph?: string // phone (will be hashed)
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
  external_id?: string
}

interface CustomData {
  currency?: string
  value?: number
  order_id?: string
  content_ids?: string[]
  contents?: Array<{ id: string; quantity: number; item_price?: number }>
  content_type?: string
  content_name?: string
  num_items?: number
  // UTM params
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

interface CAPIEvent {
  event_name: string
  event_time: number
  event_id: string
  action_source: "website"
  event_source_url: string
  user_data: UserData
  custom_data?: CustomData
}

// SHA-256 hash function with normalization
function sha256Hash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex")
}

// Normalize and hash email
function hashEmail(email: string): string {
  const normalized = email.trim().toLowerCase()
  return sha256Hash(normalized)
}

// Normalize and hash phone (digits only)
function hashPhone(phone: string): string {
  const normalized = phone.replace(/\D/g, "")
  return sha256Hash(normalized)
}

// Pixel configurations - each pixel needs its own ID and token
interface PixelConfig {
  pixelId: string
  accessToken: string
}

// Get all configured pixels
function getConfiguredPixels(): PixelConfig[] {
  const pixels: PixelConfig[] = []

  // Pixel 1
  const pixelId1 = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.META_PIXEL_ID
  const token1 = process.env.FACEBOOK_TOKEN || process.env.META_ACCESS_TOKEN
  if (pixelId1 && token1) {
    pixels.push({ pixelId: pixelId1, accessToken: token1 })
  }

  // Pixel 2
  const pixelId2 = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID_2
  const token2 = process.env.FACEBOOK_TOKEN_2
  if (pixelId2 && token2) {
    pixels.push({ pixelId: pixelId2, accessToken: token2 })
  }

  return pixels
}

// Send event to a single pixel
async function sendEventToPixel(
  pixelConfig: PixelConfig,
  event: CAPIEvent,
  testEventCode?: string
): Promise<{ success: boolean; error?: string; pixelId: string }> {
  const payload: Record<string, unknown> = {
    data: [event],
  }

  if (testEventCode) {
    payload.test_event_code = testEventCode
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${pixelConfig.pixelId}/events?access_token=${pixelConfig.accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      console.error(`[Meta CAPI] Error for pixel ${pixelConfig.pixelId}:`, result)
      return { success: false, error: JSON.stringify(result), pixelId: pixelConfig.pixelId }
    }

    console.log(`[Meta CAPI] Event sent successfully to pixel ${pixelConfig.pixelId}`)
    return { success: true, pixelId: pixelConfig.pixelId }
  } catch (error) {
    console.error(`[Meta CAPI] Request failed for pixel ${pixelConfig.pixelId}:`, error)
    return { success: false, error: String(error), pixelId: pixelConfig.pixelId }
  }
}

// Send event to Meta Conversions API (all configured pixels)
export async function sendCAPIEvent(params: {
  eventName: string
  eventId: string
  eventSourceUrl: string
  userData: {
    email?: string
    phone?: string
    clientIpAddress?: string
    clientUserAgent?: string
    fbp?: string
    fbc?: string
    externalId?: string
  }
  customData?: CustomData
}): Promise<{ success: boolean; error?: string; results?: Array<{ success: boolean; error?: string; pixelId: string }> }> {
  const pixels = getConfiguredPixels()

  if (pixels.length === 0) {
    console.error("[Meta CAPI] No pixels configured (missing FACEBOOK_TOKEN or PIXEL_ID)")
    return { success: false, error: "No pixels configured" }
  }

  // Build user_data with hashed PII
  const userData: Record<string, string | undefined> = {}

  if (params.userData.email) {
    userData.em = hashEmail(params.userData.email)
  }
  if (params.userData.phone) {
    userData.ph = hashPhone(params.userData.phone)
  }
  if (params.userData.clientIpAddress) {
    userData.client_ip_address = params.userData.clientIpAddress
  }
  if (params.userData.clientUserAgent) {
    userData.client_user_agent = params.userData.clientUserAgent
  }
  if (params.userData.fbp) {
    userData.fbp = params.userData.fbp
  }
  if (params.userData.fbc) {
    userData.fbc = params.userData.fbc
  }
  if (params.userData.externalId) {
    userData.external_id = sha256Hash(params.userData.externalId)
  }

  const event: CAPIEvent = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.eventId,
    action_source: "website",
    event_source_url: params.eventSourceUrl,
    user_data: userData,
  }

  if (params.customData) {
    event.custom_data = params.customData
  }

  const testEventCode = process.env.META_TEST_EVENT_CODE

  // Send to all configured pixels in parallel
  const results = await Promise.all(
    pixels.map(pixel => sendEventToPixel(pixel, event, testEventCode))
  )

  const allSuccessful = results.every(r => r.success)
  const errors = results.filter(r => !r.success).map(r => `Pixel ${r.pixelId}: ${r.error}`).join("; ")

  return {
    success: allSuccessful,
    error: allSuccessful ? undefined : errors,
    results
  }
}
