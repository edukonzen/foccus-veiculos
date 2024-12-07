import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, accessLevel: true },
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, accessLevel } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, accessLevel },
    })
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

