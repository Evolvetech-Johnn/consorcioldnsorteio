/**
 * Common utility functions
 */

import crypto from 'crypto'

/**
 * Generate a random string
 */
export function generateRandomString(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate unique raffle ticket
 */
export function generateRaffleTicket(): string {
  return `RFT-${Date.now()}-${generateRandomString(6)}`
}

/**
 * Format date to ISO string
 */
export function formatDate(date: Date): string {
  return date.toISOString()
}

/**
 * Parse pagination params
 */
export function parsePagination(page?: string, pageSize?: string) {
  const parsedPage = Math.max(1, parseInt(page || '1', 10))
  const parsedPageSize = Math.min(100, Math.max(1, parseInt(pageSize || '10', 10)))

  return {
    page: parsedPage,
    pageSize: parsedPageSize,
    skip: (parsedPage - 1) * parsedPageSize,
  }
}
