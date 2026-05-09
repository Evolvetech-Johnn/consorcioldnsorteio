/**
 * Environment variables configuration
 * Validates and exports all env vars
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required').default('mongodb://localhost:27017/lead-system'),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be set').default('development-secret-key-change-me'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  BCRYPT_SALT_ROUNDS: z.string().default('12'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  API_URL: z.string().default('http://localhost:5000'),
})

const env = envSchema.parse(process.env)

export const config = {
  node: {
    env: env.NODE_ENV,
  },
  server: {
    port: Number(env.PORT),
  },
  database: {
    mongoUri: env.MONGODB_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  bcrypt: {
    saltRounds: Number(env.BCRYPT_SALT_ROUNDS),
  },
  cors: {
    origin: env.CORS_ORIGIN,
  },
  api: {
    baseUrl: env.API_URL,
  },
}

export default config
