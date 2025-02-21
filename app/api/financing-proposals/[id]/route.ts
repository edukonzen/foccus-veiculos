import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    const data = await request.json()

    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
    }

    const updatedProposal = await prisma.financingProposal.update({
      where: { id: parseInt(id) },
      data: {
        customerName: data.customerName,
        cpf: data.cpf,
        proposalDate: new Date(data.proposalDate),
        status: data.status,
        proposalValue: data.proposalValue,
      }
    })
    return NextResponse.json(updatedProposal)
  } catch (error) {
    console.error('Error updating financing proposal:', error)
    return NextResponse.json({ error: 'Failed to update financing proposal' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/')[3] // Extrai o id da URL
    await prisma.financingProposal.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ message: 'Financing proposal deleted successfully' })
  } catch (error) {
    console.error('Error deleting financing proposal:', error)
    return NextResponse.json({ error: 'Failed to delete financing proposal' }, { status: 500 })
  }
}
