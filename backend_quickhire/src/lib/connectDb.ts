import { prisma } from '../config/prisma.config.js'

export async function connectDb() {
  try {
    await prisma.$connect()
    console.log('Database connected')
  } catch (err) {
    console.error('Database connection failed:', err)
    process.exit(1)
  }
}