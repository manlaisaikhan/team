import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, url, screenshot } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      try {
        const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Clerk API error: ${res.status}`)
          }
          return res.json()
        })

        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: clerkUser.email_addresses?.[0]?.email_address || `user-${userId}@example.com`,
            name: clerkUser.first_name || clerkUser.username || null,
          },
        })
      } catch (clerkError) {
        console.error('Error fetching user from Clerk:', clerkError)
        // Try to create user with minimal info
        user = await prisma.user.create({
          data: {
            clerkId: userId,
            email: `user-${userId}@example.com`,
            name: null,
          },
        })
      }
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        url: url || null,
        screenshot: screenshot || null,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      meta: error.meta,
    })
    
    // More detailed error messages
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Duplicate entry', details: error.meta },
        { status: 400 }
      )
    }
    
    if (error.code === 'P1001' || error.code === 'P1000') {
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: 'Please check your DATABASE_URL in .env.local file. Make sure PostgreSQL is running or use a cloud database like Supabase.',
          code: error.code
        },
        { status: 500 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        code: error.code || 'UNKNOWN'
      },
      { status: 500 }
    )
  }
}
