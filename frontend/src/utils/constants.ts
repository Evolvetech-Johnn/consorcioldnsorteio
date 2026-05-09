/**
 * Constants used throughout the application
 */

export const APP_NAME = 'Lead Consortium'
export const APP_VERSION = '0.1.0'

export const API_TIMEOUT = 5000

export const TOAST_DURATION = 3000

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
}

export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_RAFFLES: '/admin/raffles',
  NOT_FOUND: '/not-found',
}

export const STATUS_COLORS = {
  new: 'bg-blue-light text-blue-primary',
  contacted: 'bg-green-light text-green-primary',
  converted: 'bg-green-dark text-white',
  spam: 'bg-red-100 text-red-600',
}
