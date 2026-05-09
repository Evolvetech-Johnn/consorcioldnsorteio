/**
 * Server entry point
 * Starts the Express server
 */

import config from './config/environment.js'
import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'

/**
 * Start the server
 */
async function startServer(): Promise<void> {
  try {
    // Connect to database
    await connectDatabase()

    // Create Express app
    const app = createApp()

    // Start listening
    const server = app.listen(config.server.port, () => {
      console.log(`\n✓ Server running on http://localhost:${config.server.port}`)
      console.log(`✓ Environment: ${config.node.env}`)
      console.log(`✓ Health check: http://localhost:${config.server.port}/health\n`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server')
      server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
      })
    })
  } catch (error) {
    console.error('✗ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
