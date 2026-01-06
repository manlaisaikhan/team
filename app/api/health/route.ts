import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({ 
      status: 'ok',
      database: 'connected'
    })
  } catch (error: any) {
    console.error('Health check error:', error)
    return NextResponse.json(
      { 
        status: 'error',
        database: 'disconnected',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Database connection failed'
      },
      { status: 500 }
    )
  }
}

