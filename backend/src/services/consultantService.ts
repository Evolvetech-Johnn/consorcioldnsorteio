import type { IConsultant } from '@/types/db'
import ConsultantModel from '@/models/Consultant'

export type ConsultantCreateInput = Omit<IConsultant, '_id' | 'createdAt' | 'updatedAt'>

export class ConsultantService {
  static async createConsultant(input: ConsultantCreateInput): Promise<IConsultant> {
    const consultant = await ConsultantModel.create(input)
    return consultant.toObject() as unknown as IConsultant
  }

  static async getConsultantById(id: string): Promise<IConsultant | null> {
    return ConsultantModel.findById(id).lean().exec() as Promise<IConsultant | null>
  }

  static async getConsultantByEmail(email: string): Promise<IConsultant | null> {
    return ConsultantModel.findOne({ email }).lean().exec() as Promise<IConsultant | null>
  }

  static async listConsultants(activeOnly?: boolean): Promise<IConsultant[]> {
    const filter = activeOnly ? { active: true } : {}
    return ConsultantModel.find(filter).lean().exec() as Promise<IConsultant[]>
  }
}
