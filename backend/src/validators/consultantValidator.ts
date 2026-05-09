import { z } from 'zod'

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const createConsultantSchema = z.object({
  name: z.string().min(2, 'Name must contain at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone must contain at least 8 characters'),
  active: z.boolean().default(true),
})

export const updateConsultantSchema = createConsultantSchema.partial()
export const consultantIdSchema = objectId
