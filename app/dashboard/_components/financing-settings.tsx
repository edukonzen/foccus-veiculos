'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import Image from 'next/image'
import { Trash2, Edit, Plus, Upload } from 'lucide-react'

interface FinancingPartner {
  id: string
  name: string
  logo: string
  description: string
  additionalInfo: string
}

export function FinancingSettings() {
  const [partners, setPartners] = useState<FinancingPartner[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPartner, setCurrentPartner] = useState<FinancingPartner | null>(null)
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchPartners()
  }, [])

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
      toast.error('Erro ao carregar os parceiros de financiamento')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const url = currentPartner ? `/api/financing/${currentPartner.id}` : '/api/financing'
      const method = currentPartner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to save financing partner')
      }

      const savedPartner = await response.json()
      
      setPartners(prev => 
        currentPartner
          ? prev.map(p => p.id === savedPartner.id ? savedPartner : p)
          : [...prev, savedPartner]
      )
      
      setIsDialogOpen(false)
      setCurrentPartner(null)
      setPreviewLogo(null)
      toast.success(currentPartner ? 'Parceiro atualizado com sucesso' : 'Novo parceiro adicionado com sucesso')
    } catch (error) {
      console.error('Error saving financing partner:', error)
      toast.error('Erro ao salvar o parceiro de financiamento')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este parceiro?')) {
      try {
        const response = await fetch(`/api/financing/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete financing partner')
        }

        setPartners(prev => prev.filter(p => p.id !== id))
        toast.success('Parceiro excluído com sucesso')
      } catch (error) {
        console.error('Error deleting financing partner:', error)
        toast.error('Erro ao excluir o parceiro de financiamento')
      }
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Parceiros de Financiamento</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setCurrentPartner(null); setPreviewLogo(null); }}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Parceiro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentPartner ? 'Editar Parceiro' : 'Adicionar Novo Parceiro'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" defaultValue={currentPartner?.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Escolher arquivo
                  </Button>
                  {(previewLogo || currentPartner?.logo) && (
                    <div className="relative w-16 h-16">
                      <Image
                        src={previewLogo || currentPartner?.logo || ''}
                        alt="Logo preview"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" name="description" defaultValue={currentPartner?.description} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Informações Adicionais</Label>
                <Textarea id="additionalInfo" name="additionalInfo" defaultValue={currentPartner?.additionalInfo} />
              </div>
              <Button type="submit" className="w-full">
                {currentPartner ? 'Atualizar' : 'Adicionar'} Parceiro
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map(partner => (
          <Card key={partner.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{partner.name}</span>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => { setCurrentPartner(partner); setPreviewLogo(null); setIsDialogOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(partner.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="aspect-video relative">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="text-sm">{partner.description}</p>
              {partner.additionalInfo && (
                <div>
                  <h4 className="font-semibold text-sm">Informações Adicionais:</h4>
                  <p className="text-sm">{partner.additionalInfo}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

