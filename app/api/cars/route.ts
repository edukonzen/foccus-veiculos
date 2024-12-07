import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const car = await prisma.car.create({ data })
    return NextResponse.json(car)
  } catch (error) {
    console.error('Error creating car:', error)
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 })
  }
}

