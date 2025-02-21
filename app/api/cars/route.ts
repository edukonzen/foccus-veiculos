import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        photos: true
      }
    })
    return NextResponse.json(cars)
  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const carData = {
      model: formData.get('model') as string,
      manufacturer: formData.get('manufacturer') as string,
      year: parseInt(formData.get('year') as string),
      price: parseFloat(formData.get('price') as string),
      color: formData.get('color') as string,
      licensePlate: formData.get('licensePlate') as string,
      doors: parseInt(formData.get('doors') as string),
      transmission: formData.get('transmission') as string,
      category: formData.get('category') as string,
    }

    const photos = formData.getAll('photos') as File[]
    const photoUrls = await Promise.all(photos.map(savePhoto))

    const car = await prisma.car.create({
      data: {
        ...carData,
        photos: {
          create: photoUrls.map(url => ({ url }))
        }
      },
      include: {
        photos: true
      }
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error('Error creating car:', error)
    return NextResponse.json({ error: 'Failed to create car', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

async function savePhoto(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(uploadDir, filename)
  await writeFile(filepath, buffer)

  return `/uploads/${filename}`
}

