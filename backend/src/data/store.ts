import fs from 'fs'
import path from 'path'
import { z } from 'zod'

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'spam'

export interface CampaignRecord {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LeadRecord {
  id: string
  fullName: string
  whatsapp: string
  instagram: string
  email: string
  campaignId: string
  status: LeadStatus
  createdAt: string
  updatedAt: string
}

const dbFilePath = path.join(__dirname, '../../data/db.json')

const campaignSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
})

const campaignUpdateSchema = campaignSchema.partial()

const leadSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  instagram: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  campaignId: z.string().min(1, 'Campanha é obrigatória'),
  status: z.enum(['new', 'contacted', 'converted', 'spam']).optional(),
})

const leadUpdateSchema = leadSchema.partial()

interface DataFile {
  campaigns: CampaignRecord[]
  leads: LeadRecord[]
}

const defaultData: DataFile = {
  campaigns: [],
  leads: [],
}

function loadData(): DataFile {
  try {
    if (!fs.existsSync(dbFilePath)) {
      return { ...defaultData }
    }

    const raw = fs.readFileSync(dbFilePath, 'utf-8')
    return JSON.parse(raw) as DataFile
  } catch (error) {
    console.error('Erro ao carregar dados locais:', error)
    return { ...defaultData }
  }
}

function saveData(data: DataFile) {
  try {
    const directory = path.dirname(dbFilePath)
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Erro ao salvar dados locais:', error)
  }
}

const db = loadData()

function generateId() {
  return cryptoRandomUUID()
}

function cryptoRandomUUID() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID()
  }
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10)
}

export function getCampaigns(isActive?: boolean): CampaignRecord[] {
  return db.campaigns
    .filter((campaign) => (isActive === undefined ? true : campaign.isActive === isActive))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function getCampaignById(id: string): CampaignRecord | undefined {
  return db.campaigns.find((campaign) => campaign.id === id)
}

export function findCampaignByName(name: string): CampaignRecord | undefined {
  return db.campaigns.find((campaign) => campaign.name.toLowerCase() === name.toLowerCase())
}

export function createCampaign(data: Partial<CampaignRecord>): CampaignRecord {
  const parsed = campaignSchema.parse(data)
  if (findCampaignByName(parsed.name)) {
    const error = new Error('Já existe uma campanha com esse nome')
    ;(error as any).code = 11000
    throw error
  }

  const now = new Date().toISOString()
  const campaign: CampaignRecord = {
    id: generateId(),
    name: parsed.name,
    description: parsed.description ?? '',
    isActive: parsed.isActive ?? true,
    createdAt: now,
    updatedAt: now,
  }

  db.campaigns.push(campaign)
  saveData(db)
  return campaign
}

export function updateCampaign(id: string, data: Partial<CampaignRecord>): CampaignRecord | undefined {
  const campaign = getCampaignById(id)
  if (!campaign) {
    return undefined
  }

  const parsed = campaignUpdateSchema.parse(data)
  if (parsed.name && parsed.name !== campaign.name) {
    const existing = findCampaignByName(parsed.name)
    if (existing && existing.id !== id) {
      const error = new Error('Já existe uma campanha com esse nome')
      ;(error as any).code = 11000
      throw error
    }
  }

  campaign.name = parsed.name ?? campaign.name
  campaign.description = parsed.description ?? campaign.description
  campaign.isActive = parsed.isActive ?? campaign.isActive
  campaign.updatedAt = new Date().toISOString()
  saveData(db)
  return campaign
}

export function deleteCampaign(id: string): boolean {
  const index = db.campaigns.findIndex((campaign) => campaign.id === id)
  if (index < 0) {
    return false
  }

  db.campaigns.splice(index, 1)
  db.leads = db.leads.filter((lead) => lead.campaignId !== id)
  saveData(db)
  return true
}

export function getLeads(filter: { campaignId?: string; status?: LeadStatus } = {}): LeadRecord[] {
  return db.leads
    .filter((lead) => {
      if (filter.campaignId && lead.campaignId !== filter.campaignId) {
        return false
      }
      if (filter.status && lead.status !== filter.status) {
        return false
      }
      return true
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function getLeadById(id: string): LeadRecord | undefined {
  return db.leads.find((lead) => lead.id === id)
}

export function createLead(data: Partial<LeadRecord>): LeadRecord {
  const parsed = leadSchema.parse(data)
  if (!getCampaignById(parsed.campaignId)) {
    const error = new Error('Campanha não encontrada')
    error.name = 'ValidationError'
    throw error
  }

  const now = new Date().toISOString()
  const lead: LeadRecord = {
    id: generateId(),
    fullName: parsed.fullName,
    whatsapp: parsed.whatsapp,
    instagram: parsed.instagram ?? '',
    email: parsed.email ?? '',
    campaignId: parsed.campaignId,
    status: parsed.status ?? 'new',
    createdAt: now,
    updatedAt: now,
  }

  db.leads.push(lead)
  saveData(db)
  return lead
}

export function updateLead(id: string, data: Partial<LeadRecord>): LeadRecord | undefined {
  const lead = getLeadById(id)
  if (!lead) {
    return undefined
  }

  const parsed = leadUpdateSchema.parse(data)
  if (parsed.campaignId && !getCampaignById(parsed.campaignId)) {
    const error = new Error('Campanha não encontrada')
    error.name = 'ValidationError'
    throw error
  }

  lead.fullName = parsed.fullName ?? lead.fullName
  lead.whatsapp = parsed.whatsapp ?? lead.whatsapp
  lead.instagram = parsed.instagram ?? lead.instagram
  lead.email = parsed.email ?? lead.email
  lead.campaignId = parsed.campaignId ?? lead.campaignId
  lead.status = parsed.status ?? lead.status
  lead.updatedAt = new Date().toISOString()
  saveData(db)
  return lead
}

export function deleteLead(id: string): boolean {
  const index = db.leads.findIndex((lead) => lead.id === id)
  if (index < 0) {
    return false
  }

  db.leads.splice(index, 1)
  saveData(db)
  return true
}
