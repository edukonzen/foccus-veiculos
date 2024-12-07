import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const proposals = await prisma.financingProposal.findMany()
    return NextResponse.json(proposals)
  } catch (error) {
    console.error('Error fetching financing proposals:', error)
    return NextResponse.json({ error: 'Failed to fetch financing proposals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const proposal = await prisma.financingProposal.create({ data })
    return NextResponse.json(proposal)
  } catch (error) {
    console.error('Error creating financing proposal:', error)
    return NextResponse.json({ error: 'Failed to create financing proposal' }, { status: 500 })
  }
}

