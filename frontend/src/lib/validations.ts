import { z } from 'zod'

export const leadFormSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter pelo menos 3 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp deve ter pelo menos 10 dígitos'),
  instagram: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  campaignId: z.string().min(1, 'Campanha é obrigatória'),
})

export type LeadFormData = z.infer<typeof leadFormSchema>

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export type LoginFormData = z.infer<typeof loginSchema>
