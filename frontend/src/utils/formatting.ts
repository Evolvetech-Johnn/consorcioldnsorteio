/**
 * Utility functions for string formatting
 */

/**
 * Format phone number for WhatsApp (Brazilian format)
 * Expected: 11999999999 -> (11) 99999-9999
 */
export function formatWhatsApp(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 2) return cleaned
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
}

/**
 * Validate WhatsApp format (11 digits)
 */
export function isValidWhatsApp(value: string): boolean {
  const cleaned = value.replace(/\D/g, '')
  return cleaned.length === 11
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
