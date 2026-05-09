import type { IRaffle } from '@/types/db'
import RaffleModel from '@/models/Raffle'

export type RaffleCreateInput = Omit<IRaffle, '_id' | 'createdAt' | 'updatedAt'>

export class RaffleService {
  static async createRaffle(input: RaffleCreateInput): Promise<IRaffle> {
    const raffle = await RaffleModel.create(input)
    return raffle.toObject() as unknown as IRaffle
  }

  static async getRaffleById(id: string): Promise<IRaffle | null> {
    return RaffleModel.findById(id).lean().exec() as unknown as Promise<IRaffle | null>
  }

  static async listRafflesByCampaign(campaignId: string): Promise<IRaffle[]> {
    return RaffleModel.find({ campaignId }).lean().exec() as unknown as Promise<IRaffle[]>
  }
}
