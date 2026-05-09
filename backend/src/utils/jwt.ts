/**
 * JWT token utilities
 */

import * as jwt from 'jsonwebtoken'
import config from '@/config/environment'

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

/**
 * Generate JWT token
 */
export function generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  const secret = config.jwt.secret as unknown as jwt.Secret
  return jwt.sign(payload as object, secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions)
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): JwtPayload {
  const secret = config.jwt.secret as unknown as jwt.Secret
  return jwt.verify(token, secret) as JwtPayload
}

/**
 * Decode JWT token (without verification)
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload | null
  } catch {
    return null
  }
}
