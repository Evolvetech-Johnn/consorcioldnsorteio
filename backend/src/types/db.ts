/**
 * Database related types
 */

export interface IAdmin {
  _id: string
  name: string
  email: string
  passwordHash: string
  role: 'owner' | 'admin' | 'consultant'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

export interface IConsultant {
  _id: string
  name: string
  email: string
  phone: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICampaign {
  _id: string
  title: string
  eventName: string
  active: boolean
  startDate: Date
  endDate: Date
  consultantId: string
  createdAt: Date
  updatedAt: Date
}

export interface ILead {
  _id: string
  fullName: string
  whatsapp: string
  instagram?: string | null
  email?: string | null
  consultantId: string
  campaignId: string
  createdAt: Date
  updatedAt: Date
}

export interface IRaffle {
  _id: string
  title: string
  campaignId: string
  winnerLeadId?: string | null
  createdAt: Date
  updatedAt: Date
}
