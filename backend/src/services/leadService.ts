import type { ILead } from '@/types/db'
import LeadModel from '@/models/Lead'

export type LeadCreateInput = Omit<ILead, '_id' | 'createdAt' | 'updatedAt'>

export class LeadService {
  static async createLead(input: LeadCreateInput): Promise<ILead> {
    const lead = await LeadModel.create(input)
    return lead.toObject() as unknown as ILead
  }

  static async getLeadById(id: string): Promise<ILead | null> {
    return LeadModel.findById(id).lean().exec() as unknown as Promise<ILead | null>
  }

  static async listLeadsByConsultant(consultantId: string): Promise<ILead[]> {
    return LeadModel.find({ consultantId }).lean().exec() as unknown as Promise<ILead[]>
  }

  static async listLeadsByCampaign(campaignId: string): Promise<ILead[]> {
    return LeadModel.find({ campaignId }).lean().exec() as unknown as Promise<ILead[]>
  }
}
