import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const data = await request.json()
  const updatedCar = await prisma.car.update({
    where: { id },
    data,
  })
  return NextResponse.json(updatedCar)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  await prisma.car.delete({
    where: { id },
  })
  return NextResponse.json({ message: 'Car deleted successfully' })
}

