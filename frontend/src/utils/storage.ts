/**
 * Storage utilities for localStorage operations
 */

/**
 * Set item in localStorage
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error)
  }
}

/**
 * Get item from localStorage
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error)
    return null
  }
}

/**
 * Remove item from localStorage
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error)
  }
}

/**
 * Clear all localStorage
 */
export function clear(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage', error)
  }
}
