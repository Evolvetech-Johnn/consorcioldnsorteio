import { z } from 'zod'

export const createAdminSchema = z.object({
  name: z.string().min(2, 'Name must contain at least 2 characters'),
  email: z.string().email('Invalid email address'),
  passwordHash: z.string().min(8, 'Password hash must be provided'),
  role: z.enum(['owner', 'admin', 'consultant']).default('consultant'),
  isActive: z.boolean().default(true),
})

export const updateAdminSchema = createAdminSchema.partial()
