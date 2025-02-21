import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    const partner = await prisma.financingPartner.findUnique({ where: { id } })
    if (!partner) {
      return NextResponse.json({ error: 'Financing partner not found' }, { status: 404 })
    }
    return NextResponse.json(partner)
  } catch (error) {
    console.error('Error fetching financing partner:', error)
    return NextResponse.json({ error: 'Failed to fetch financing partner' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const additionalInfo = formData.get('additionalInfo') as string
    const logoFile = formData.get('logo') as File | null

    const updateData: Partial<{ name: string; description: string; additionalInfo: string; logo: string }> = { name, description, additionalInfo }

    if (logoFile) {
      const bytes = await logoFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filename = `${Date.now()}-${logoFile.name}`
      const logoPath = `/uploads/${filename}`
      const filepath = path.join(uploadDir, filename)
      await writeFile(filepath, buffer)

      updateData.logo = logoPath
    }

    const partner = await prisma.financingPartner.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(partner)
  } catch (error) {
    console.error('Error updating financing partner:', error)
    return NextResponse.json({ error: 'Failed to update financing partner' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    await prisma.financingPartner.delete({ where: { id } })
    return NextResponse.json({ message: 'Financing partner deleted successfully' })
  } catch (error) {
    console.error('Error deleting financing partner:', error)
    return NextResponse.json({ error: 'Failed to delete financing partner' }, { status: 500 })
  }
}
