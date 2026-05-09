import type { ICampaign } from '@/types/db'
import CampaignModel from '@/models/Campaign'

export type CampaignCreateInput = Omit<ICampaign, '_id' | 'createdAt' | 'updatedAt'>

export class CampaignService {
  static async createCampaign(input: CampaignCreateInput): Promise<ICampaign> {
    const campaign = await CampaignModel.create(input)
    return campaign.toObject() as unknown as ICampaign
  }

  static async getCampaignById(id: string): Promise<ICampaign | null> {
    return CampaignModel.findById(id).lean().exec() as unknown as Promise<ICampaign | null>
  }

  static async listCampaignsByConsultant(consultantId: string): Promise<ICampaign[]> {
    return CampaignModel.find({ consultantId }).lean().exec() as unknown as Promise<ICampaign[]>
  }

  static async listActiveCampaigns(): Promise<ICampaign[]> {
    return CampaignModel.find({ active: true }).lean().exec() as unknown as Promise<ICampaign[]>
  }
}
