import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const cars = await prisma.car.findMany()
    const carsWithBase64Image = cars.map(car => ({
      ...car,
      image: car.image ? `data:image/jpeg;base64,${Buffer.from(car.image).toString('base64')}` : null
    }))
    
    console.log('Cars fetched successfully:', carsWithBase64Image);
    return NextResponse.json(carsWithBase64Image)
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const image = formData.get('image') as File | null

  let imageBuffer: Buffer | null = null
  if (image) {
    const arrayBuffer = await image.arrayBuffer()
    imageBuffer = Buffer.from(arrayBuffer)
  }

  const car = await prisma.car.create({
    data: {
      model: formData.get('model') as string,
      manufacturer: formData.get('manufacturer') as string,
      year: parseInt(formData.get('year') as string),
      price: parseFloat(formData.get('price') as string),
      image: imageBuffer,
      color: formData.get('color') as string,
      licensePlate: formData.get('licensePlate') as string,
      doors: parseInt(formData.get('doors') as string),
      transmission: formData.get('transmission') as string,
    },
  })

  return NextResponse.json(car)
}

export async function PUT(request: NextRequest) {
  const formData = await request.formData()
  const id = parseInt(formData.get('id') as string)
  const image = formData.get('image') as File | null

  let imageBuffer: Buffer | null = null
  if (image) {
    const arrayBuffer = await image.arrayBuffer()
    imageBuffer = Buffer.from(arrayBuffer)
  }

  const car = await prisma.car.update({
    where: { id },
    data: {
      model: formData.get('model') as string,
      manufacturer: formData.get('manufacturer') as string,
      year: parseInt(formData.get('year') as string),
      price: parseFloat(formData.get('price') as string),
      ...(imageBuffer && { image: imageBuffer }),
      color: formData.get('color') as string,
      licensePlate: formData.get('licensePlate') as string,
      doors: parseInt(formData.get('doors') as string),
      transmission: formData.get('transmission') as string,
    },
  })

  return NextResponse.json(car)
}

