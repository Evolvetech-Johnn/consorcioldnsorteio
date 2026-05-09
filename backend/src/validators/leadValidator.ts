import { z } from 'zod'

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const createLeadSchema = z.object({
  fullName: z.string().min(3, 'Full name must contain at least 3 characters'),
  whatsapp: z.string().min(10, 'WhatsApp number must contain at least 10 digits'),
  instagram: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  consultantId: objectId,
  campaignId: objectId,
})

export const updateLeadSchema = createLeadSchema.partial()
