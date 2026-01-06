import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { verifyBug } from '@/lib/gemini'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user to check if admin
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const bug = await prisma.bug.findUnique({
      where: { id: params.id },
      include: {
        project: {
          include: {
            user: true,
          },
        },
        reporter: true,
      },
    })

    if (!bug) {
      return NextResponse.json({ error: 'Bug not found' }, { status: 404 })
    }

    // Verify bug using Gemini AI
    const verification = await verifyBug(bug.description, bug.screenshot || undefined)

    const pointsToAward = verification.isValid ? 10 : 0
    const pointsToDeduct = verification.isValid ? 5 : 0

    // Update bug status
    const updatedBug = await prisma.bug.update({
      where: { id: params.id },
      data: {
        verified: verification.isValid,
        status: verification.isValid ? 'VERIFIED' : 'REJECTED',
        pointsAwarded: pointsToAward,
      },
    })

    // Award points to reporter
    if (verification.isValid) {
      await prisma.user.update({
        where: { id: bug.reporterId },
        data: {
          points: {
            increment: pointsToAward,
          },
        },
      })

      await prisma.pointTransaction.create({
        data: {
          userId: bug.reporterId,
          amount: pointsToAward,
          type: 'EARNED',
          description: `Bug verified for project: ${bug.project.title}`,
          bugId: bug.id,
        },
      })

      // Deduct points from project owner
      await prisma.user.update({
        where: { id: bug.project.userId },
        data: {
          points: {
            decrement: pointsToDeduct,
          },
        },
      })

      await prisma.pointTransaction.create({
        data: {
          userId: bug.project.userId,
          amount: pointsToDeduct,
          type: 'DEDUCTED',
          description: `Bug found in project: ${bug.project.title}`,
          bugId: bug.id,
        },
      })
    }

    return NextResponse.json({
      bug: updatedBug,
      verification,
    })
  } catch (error) {
    console.error('Error reviewing bug:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

