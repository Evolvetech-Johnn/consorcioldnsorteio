import { z } from 'zod'

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')

function dateSchema(fieldName: string) {
  return z.preprocess((value) => {
    if (typeof value === 'string' || value instanceof Date) {
      const date = new Date(value)
      return isNaN(date.getTime()) ? undefined : date
    }
    return undefined
  }, z.date({ required_error: `${fieldName} is required`, invalid_type_error: `${fieldName} must be a valid date` }))
}

export const createCampaignSchema = z.object({
  title: z.string().min(3, 'Title must contain at least 3 characters'),
  eventName: z.string().min(3, 'Event name must contain at least 3 characters'),
  consultantId: objectId,
  active: z.boolean().default(true),
  startDate: dateSchema('startDate'),
  endDate: dateSchema('endDate'),
})

export const updateCampaignSchema = createCampaignSchema.partial()
