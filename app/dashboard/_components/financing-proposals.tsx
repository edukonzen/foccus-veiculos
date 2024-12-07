'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon, FileText, ImageIcon, Edit2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

interface FinancingProposal {
  id: number
  customerName: string
  customerSurname: string
  dateOfBirth: string
  cpf: string
  rg: string
  isMarried: boolean
  proposalDate: string
  status: 'pending' | 'approved' | 'rejected'
  documents: string[]
  address: string
  proposalValue: number
}

export function FinancingProposals() {
  const [proposals, setProposals] = useState<FinancingProposal[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingProposal, setEditingProposal] = useState<FinancingProposal | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/financing-proposals')
      if (!response.ok) {
        throw new Error('Failed to fetch financing proposals')
      }
      const data = await response.json()
      setProposals(data)
    } catch (error) {
      console.error('Error fetching financing proposals:', error)
    }
  }

  const filteredProposals = proposals.filter(proposal => 
    (proposal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proposal.customerSurname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proposal.cpf.includes(searchTerm)) &&
    (filterStatus === 'all' || proposal.status === filterStatus)
  )

  const handleProposalChange = (field: keyof FinancingProposal, value: string | number | boolean) => {
    if (editingProposal) {
      setEditingProposal({ ...editingProposal, [field]: value })
    }
  }

  const handleSaveProposal = async () => {
    if (editingProposal) {
      try {
        const response = await fetch(`/api/financing-proposals/${editingProposal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProposal),
        })
        if (!response.ok) {
          throw new Error('Failed to update financing proposal')
        }
        fetchProposals()
        setEditingProposal(null)
        setIsModalOpen(false)
      } catch (error) {
        console.error('Error updating financing proposal:', error)
      }
    }
  }

  const handleAddNewProposal = () => {
    setEditingProposal({
      id: 0,
      customerName: '',
      customerSurname: '',
      dateOfBirth: '',
      cpf: '',
      rg: '',
      isMarried: false,
      proposalDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      documents: [],
      address: '',
      proposalValue: 0
    })
    setIsModalOpen(true)
  }

  const handleSubmitNewProposal = async () => {
    if (editingProposal) {
      try {
        const response = await fetch('/api/financing-proposals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProposal),
        })
        if (!response.ok) {
          throw new Error('Failed to create financing proposal')
        }
        fetchProposals()
        setEditingProposal(null)
        setIsModalOpen(false)
      } catch (error) {
        console.error('Error creating financing proposal:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Propostas de Financiamento</h2>
        <Button onClick={handleAddNewProposal}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Proposta
        </Button>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="approved">Aprovado</SelectItem>
            <SelectItem value="rejected">Rejeitado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="w-full rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data da Proposta</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white">
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal.id} className="hover:bg-gray-50">
              <TableCell className="px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <span>{proposal.customerName} {proposal.customerSurname}</span>
                </div>
              </TableCell>
              <TableCell className="px-4">{proposal.cpf}</TableCell>
              <TableCell className="px-4">{proposal.proposalDate}</TableCell>
              <TableCell className="px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  proposal.status === 'approved' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {proposal.status === 'approved' ? 'Aprovado' : proposal.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                </span>
              </TableCell>
              <TableCell className="px-4">
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Ver Detalhes</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Detalhes da Proposta</DialogTitle>
                        <DialogDescription>
                          Proposta de financiamento para {proposal.customerName} {proposal.customerSurname}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Nome Completo</Label>
                          <div>{proposal.customerName} {proposal.customerSurname}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Data de Nascimento</Label>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                            {proposal.dateOfBirth}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>CPF</Label>
                          <div>{proposal.cpf}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>RG</Label>
                          <div>{proposal.rg}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Estado Civil</Label>
                          <div>{proposal.isMarried ? 'Casado(a)' : 'Solteiro(a)'}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Data da Proposta</Label>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                            {proposal.proposalDate}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Endereço</Label>
                          <div>{proposal.address}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Valor da Proposta</Label>
                          <div>{proposal.proposalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-4">
                          <Label>Documentos Anexados</Label>
                          <ul className="list-disc list-inside">
                            {proposal.documents.map((doc, index) => (
                              <li key={index} className="flex items-center">
                                <FileText className="mr-2 h-4 w-4" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setEditingProposal(proposal)}>
                        <Edit2 className="h-4 w-4" />
                        <span className="sr-only">Editar Proposta</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Editar Proposta</DialogTitle>
                        <DialogDescription>
                          Atualizar a proposta para {proposal.customerName} {proposal.customerSurname}
                        </DialogDescription>
                      </DialogHeader>
                      {editingProposal && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="customerName">Nome</Label>
                            <Input
                              id="customerName"
                              value={editingProposal.customerName}
                              onChange={(e) => handleProposalChange('customerName', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="customerSurname">Sobrenome</Label>
                            <Input
                              id="customerSurname"
                              value={editingProposal.customerSurname}
                              onChange={(e) => handleProposalChange('customerSurname', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                            <Input
                              id="dateOfBirth"
                              type="date"
                              value={editingProposal.dateOfBirth}
                              onChange={(e) => handleProposalChange('dateOfBirth', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                              id="cpf"
                              value={editingProposal.cpf}
                              onChange={(e) => handleProposalChange('cpf', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="rg">RG</Label>
                            <Input
                              id="rg"
                              value={editingProposal.rg}
                              onChange={(e) => handleProposalChange('rg', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="isMarried">Estado Civil</Label>
                            <Checkbox
                              id="isMarried"
                              checked={editingProposal.isMarried}
                              onCheckedChange={(checked) => handleProposalChange('isMarried', checked)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="proposalDate">Data da Proposta</Label>
                            <Input
                              id="proposalDate"
                              type="date"
                              value={editingProposal.proposalDate}
                              onChange={(e) => handleProposalChange('proposalDate', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={editingProposal.status}
                              onValueChange={(value: 'pending' | 'approved' | 'rejected') => handleProposalChange('status', value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione o status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="approved">Aprovado</SelectItem>
                                <SelectItem value="rejected">Rejeitado</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="address">Endereço</Label>
                            <Input
                              id="address"
                              value={editingProposal.address}
                              onChange={(e) => handleProposalChange('address', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="proposalValue">Valor da Proposta</Label>
                            <Input
                              id="proposalValue"
                              type="number"
                              value={editingProposal.proposalValue}
                              onChange={(e) => handleProposalChange('proposalValue', parseFloat(e.target.value))}
                            />
                          </div>
                          <Button onClick={handleSaveProposal}>Salvar Alterações</Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

