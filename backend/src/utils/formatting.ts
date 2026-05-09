/**
 * String formatting utilities
 */

/**
 * Validate WhatsApp format (Brazilian: 11 digits)
 */
export function isValidWhatsApp(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.length === 11 && cleaned.startsWith('55') === false
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Normalize string (trim and lowercase)
 */
export function normalizeString(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Clean and normalize phone number
 */
export function normalizeWhatsApp(value: string): string {
  return value.replace(/\D/g, '')
}
