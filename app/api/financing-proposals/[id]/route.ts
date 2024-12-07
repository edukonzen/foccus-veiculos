import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const proposal = await prisma.financingProposal.findUnique({ where: { id } })
    if (!proposal) {
      return NextResponse.json({ error: 'Financing proposal not found' }, { status: 404 })
    }
    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error fetching financing proposal:', error)
    return NextResponse.json({ error: 'Failed to fetch financing proposal' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    const proposal = await prisma.financingProposal.update({ where: { id }, data })
    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error updating financing proposal:', error)
    return NextResponse.json({ error: 'Failed to update financing proposal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    await prisma.financingProposal.delete({ where: { id } })
    return NextResponse.json({ message: 'Financing proposal deleted successfully' })
  } catch (error) {
    console.error('Error deleting financing proposal:', error)
    return NextResponse.json({ error: 'Failed to delete financing proposal' }, { status: 500 })
  }
}

