/**
 * Express app setup
 * Configures middleware and initial setup
 */

import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'
import config from './config/environment'
import { errorHandler } from './middleware/errorHandler'
import leadRoutes from './routes/leadRoutes'
import campaignRoutes from './routes/campaignRoutes'

/**
 * Create and configure Express app
 */
export function createApp(): Express {
  const app = express()

  // Security middleware
  app.use(helmet())

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))

  // CORS middleware
  const allowedOrigins = [
    config.cors.origin,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[]

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  })

  // API routes
  app.use('/api/leads', leadRoutes)
  app.use('/api/campaigns', campaignRoutes)

  // Error handling middleware (must be last)
  app.use(errorHandler)

  return app
}

export default createApp
