export type LeadStatus = 'new' | 'contacted' | 'converted' | 'spam'

export interface ILead {
  id: string
  fullName: string
  whatsapp: string
  instagram?: string
  email?: string
  campaignId: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}
