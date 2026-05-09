import type { IAdmin } from '@/types/db'
import AdminModel from '@/models/Admin'

export type AdminCreateInput = Omit<IAdmin, '_id' | 'createdAt' | 'updatedAt' | 'lastLogin'>

export class AdminService {
  static async createAdmin(input: AdminCreateInput): Promise<IAdmin> {
    const admin = await AdminModel.create(input)
    return admin.toObject() as unknown as IAdmin
  }

  static async getAdminById(id: string): Promise<IAdmin | null> {
    return AdminModel.findById(id).lean().exec() as Promise<IAdmin | null>
  }

  static async getAdminByEmail(email: string): Promise<IAdmin | null> {
    return AdminModel.findOne({ email }).lean().exec() as Promise<IAdmin | null>
  }

  static async listAdmins(): Promise<IAdmin[]> {
    return AdminModel.find().lean().exec() as Promise<IAdmin[]>
  }
}
