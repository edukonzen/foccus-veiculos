import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  // Here you would typically create a session or JWT token
  // For simplicity, we're just returning the user (excluding the password)
  const { password: _, ...userWithoutPassword } = user
  return NextResponse.json(userWithoutPassword)
}

