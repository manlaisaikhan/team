import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { projectId, description, screenshot } = body

    if (!projectId || !description) {
      return NextResponse.json(
        { error: 'Project ID and description are required' },
        { status: 400 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }).then((res) => res.json())

      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.email_addresses[0]?.email_address || '',
          name: clerkUser.first_name || clerkUser.username || '',
        },
      })
    }

    const bug = await prisma.bug.create({
      data: {
        projectId,
        description,
        screenshot: screenshot || null,
        reporterId: user.id,
      },
      include: {
        project: true,
        reporter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(bug, { status: 201 })
  } catch (error) {
    console.error('Error creating bug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

