/**
 * Type definitions for the application
 * Core types exported from this module
 */

// User and Auth types
export interface IUser {
  id: string
  email: string
  name: string
  role: 'owner' | 'admin' | 'consultant'
}

export interface IAuthResponse {
  success: boolean
  token: string
  expiresIn: number
  user: IUser
}

// Lead types
export interface ILead {
  _id: string
  name: string
  whatsapp: string
  instagram?: string
  email?: string
  campaignId: string
  status: 'new' | 'contacted' | 'converted' | 'spam'
  raffleTicket: string
  createdAt: string
  updatedAt: string
}

export interface ILeadCreateRequest {
  name: string
  whatsapp: string
  instagram?: string
  email?: string
}

// API Response types
export interface IApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface IApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}
