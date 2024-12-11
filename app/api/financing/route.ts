import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function GET() {
  try {
    const financingPartners = await prisma.financingPartner.findMany()
    return NextResponse.json(financingPartners)
  } catch (error) {
    console.error('Error fetching financing partners:', error)
    return NextResponse.json({ error: 'Failed to fetch financing partners' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const additionalInfo = formData.get('additionalInfo') as string
    const logoFile = formData.get('logo') as File

    if (!name || !description || !logoFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const bytes = await logoFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filename = `${Date.now()}-${logoFile.name}`
    const logoPath = `/uploads/${filename}`
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    const partner = await prisma.financingPartner.create({
      data: {
        name,
        logo: logoPath,
        description,
        additionalInfo,
      },
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('Error creating financing partner:', error)
    return NextResponse.json({ error: 'Failed to create financing partner' }, { status: 500 })
  }
}

