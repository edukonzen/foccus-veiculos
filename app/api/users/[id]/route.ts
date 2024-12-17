import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, accessLevel: true, createdAt: true, updatedAt: true },
    })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { name, email, password, accessLevel } = await request.json()
    
    if (!name || !email || !accessLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const updateData: any = { name, email, accessLevel }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    const user = await prisma.user.update({ 
      where: { id }, 
      data: updateData
    })
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}

