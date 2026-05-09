import { z } from 'zod'

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

export const createRaffleSchema = z.object({
  title: z.string().min(3, 'Title must contain at least 3 characters'),
  campaignId: objectId,
  winnerLeadId: objectId.optional(),
})

export const updateRaffleSchema = createRaffleSchema.partial()
