/**
 * Express app setup
 * Configures middleware and initial setup
 */

import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'express-async-errors'
import config from './config/environment.js'
import { errorHandler } from './middleware/errorHandler.js'

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
  app.use(
    cors({
      origin: config.cors.origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
  })

  // API routes will be mounted here
  // Routes setup will be added in next phase

  // Error handling middleware (must be last)
  app.use(errorHandler)

  return app
}

export default createApp
