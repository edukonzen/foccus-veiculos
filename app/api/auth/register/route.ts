import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const { name, email, password: rawPassword } = await request.json()

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      accessLevel: 'user',
    },
  })

  const { password: _, ...userWithoutPassword } = user
  return NextResponse.json(userWithoutPassword)
}

