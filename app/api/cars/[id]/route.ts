import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const car = await prisma.car.findUnique({ where: { id } })
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 })
    }
    return NextResponse.json(car)
  } catch (error) {
    console.error('Error fetching car:', error)
    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    const car = await prisma.car.update({ where: { id }, data })
    return NextResponse.json(car)
  } catch (error) {
    console.error('Error updating car:', error)
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    await prisma.car.delete({ where: { id } })
    return NextResponse.json({ message: 'Car deleted successfully' })
  } catch (error) {
    console.error('Error deleting car:', error)
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}

