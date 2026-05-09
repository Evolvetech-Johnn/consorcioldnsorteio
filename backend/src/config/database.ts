/**
 * MongoDB connection configuration
 * Handles database connection setup
 */

import mongoose from 'mongoose'
import config from '@/config/environment'

mongoose.set('strictQuery', true)

/**
 * Connect to MongoDB Atlas
 */
export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.database.mongoUri, {
      retryWrites: true,
      w: 'majority',
      autoIndex: true,
      autoCreate: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    })
    console.log('✓ MongoDB connected successfully')
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error)
    process.exit(1)
  }
}

/**
 * Disconnect from MongoDB
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await mongoose.disconnect()
    console.log('✓ MongoDB disconnected')
  } catch (error) {
    console.error('✗ MongoDB disconnection failed:', error)
  }
}

export default mongoose
