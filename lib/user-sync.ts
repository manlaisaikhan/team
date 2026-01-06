import { prisma } from './db'

export async function getOrCreateUser(clerkId: string, email: string, name?: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
        name: name || null,
      },
    })
  } else {
    // Update user info if needed
    if (name && user.name !== name) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { name },
      })
    }
    if (user.email !== email) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { email },
      })
    }
  }

  return user
}

