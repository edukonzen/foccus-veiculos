/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, accessLevel: true, status: true, createdAt: true, updatedAt: true },
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

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    const { name, email, password, accessLevel, status } = await request.json()
    
    if (!name || !email || !accessLevel) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const updateData: Prisma.UserUpdateInput = { name, email, accessLevel, status }
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }
    const user = await prisma.user.update({ 
      where: { id }, 
      data: updateData
    })
    
    // Desestruturar sem a senha
    const { password: userPassword, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
