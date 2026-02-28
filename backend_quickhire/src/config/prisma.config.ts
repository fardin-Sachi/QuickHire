import { PrismaClient } from '../generated/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import ENV from '../config/env.config.js'

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
})