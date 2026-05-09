/**
 * Application constants
 */

export const APP_NAME = 'Lead Consortium API'
export const APP_VERSION = '0.1.0'

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
}

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  UNAUTHORIZED: 'Não autorizado',
  FORBIDDEN: 'Acesso proibido',
  NOT_FOUND: 'Recurso não encontrado',
  DUPLICATE_LEAD: 'Este lead já foi registrado',
  INVALID_INPUT: 'Dados inválidos',
  INTERNAL_ERROR: 'Erro interno do servidor',
  RATE_LIMIT_EXCEEDED: 'Muitas requisições. Tente novamente mais tarde.',
}

export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CONVERTED: 'converted',
  SPAM: 'spam',
} as const

export const RAFFLE_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  DRAWN: 'drawn',
  COMPLETED: 'completed',
} as const

export const USER_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  CONSULTANT: 'consultant',
} as const
