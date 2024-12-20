import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const proposals = await prisma.financingProposal.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(proposals)
  } catch (error) {
    console.error('Error fetching financing proposals:', error)
    return NextResponse.json({ error: 'Failed to fetch financing proposals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
    }

    const proposal = await prisma.financingProposal.create({
      data: {
        customerName: data.customerName,
        cpf: data.cpf,
        proposalDate: new Date(data.proposalDate),
        status: data.status,
        proposalValue: data.proposalValue,
      }
    })
    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error creating financing proposal:', error)
    return NextResponse.json({ error: 'Failed to create financing proposal' }, { status: 500 })
  }
}

