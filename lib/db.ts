/**
 * Prisma client singleton
 *
 * To activate the live database:
 *   1. Set DATABASE_URL in .env
 *   2. Run: npx prisma generate
 *   3. Run: npx prisma migrate dev --name init
 *   4. Run: npm run db:seed
 *
 * Until then the app runs on mock data in lib/mock-data.ts
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PrismaInstance = any

const g = globalThis as typeof globalThis & { _prismaInstance?: PrismaInstance }

export async function getPrisma(): Promise<PrismaInstance | null> {
  if (g._prismaInstance) return g._prismaInstance
  try {
    // Dynamic import avoids build-time error when prisma generate hasn't run
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('@prisma/client') as { PrismaClient: new () => PrismaInstance }
    g._prismaInstance = new mod.PrismaClient()
    return g._prismaInstance
  } catch {
    // Prisma client not generated — expected during initial setup
    return null
  }
}
