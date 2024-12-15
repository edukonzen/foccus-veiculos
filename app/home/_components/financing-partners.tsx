'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancingPartner {
  id: string
  name: string
  logo: string
  description: string
  additionalInfo: string
}

export function FinancingPartners() {
  const [partners, setPartners] = useState<FinancingPartner[]>([])

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/financing')
        if (!response.ok) {
          throw new Error('Failed to fetch financing partners')
        }
        const data = await response.json()
        setPartners(data)
      } catch (error) {
        console.error('Error fetching financing partners:', error)
      }
    }

    fetchPartners()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {partners.map(partner => (
        <Card key={partner.id}>
          <CardHeader>
            <CardTitle>{partner.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative mb-4">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <CardDescription>{partner.description}</CardDescription>
            {partner.additionalInfo && (
              <p className="mt-2 text-sm text-gray-600">{partner.additionalInfo}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

