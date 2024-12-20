import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
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

    const newPhotos = formData.getAll('photos') as File[]
    const existingPhotos = formData.getAll('existingPhotos') as string[]

    const newPhotoUrls = await Promise.all(newPhotos.map(savePhoto))

    const car = await prisma.car.update({
      where: { id },
      data: {
        ...carData,
        photos: {
          deleteMany: {},
          create: [...existingPhotos, ...newPhotoUrls].map(url => ({ url }))
        }
      },
      include: {
        photos: true
      }
    })

    return NextResponse.json(car)
  } catch (error) {
    console.error('Error updating car:', error)
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 })
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    await prisma.car.delete({
      where: { id },
      include: {
        photos: true
      }
    })
    return NextResponse.json({ message: 'Car deleted successfully' })
  } catch (error) {
    console.error('Error deleting car:', error)
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 })
  }
}

