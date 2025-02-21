'use client'

import { useState, useEffect } from 'react'
import { Edit2, Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface FinancingProposal {
  id: number
  customerName: string
  cpf: string
  proposalDate: string
  status: 'pending' | 'approved' | 'rejected'
  proposalValue: number
}

export function FinancingProposals() {
  const [proposals, setProposals] = useState<FinancingProposal[]>([])
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
      toast.error('Failed to fetch financing proposals')
    }
  }

  const handleProposalChange = (field: keyof FinancingProposal, value: string | number) => {
    if (editingProposal) {
      setEditingProposal({ ...editingProposal, [field]: value })
    }
  }

  const handleSaveProposal = async () => {
    if (editingProposal) {
      try {
        const url = editingProposal.id ? `/api/financing-proposals/${editingProposal.id}` : '/api/financing-proposals'
        const method = editingProposal.id ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingProposal),
        })
        
        if (!response.ok) {
          throw new Error('Failed to save financing proposal')
        }
        
        fetchProposals()
        setEditingProposal(null)
        setIsModalOpen(false)
        toast.success(editingProposal.id ? 'Proposal updated successfully' : 'New proposal added successfully')
      } catch (error) {
        console.error('Error saving financing proposal:', error)
        toast.error('Failed to save financing proposal')
      }
    }
  }

  const handleDeleteProposal = async (id: number) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      try {
        const response = await fetch(`/api/financing-proposals/${id}`, {
          method: 'DELETE',
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete financing proposal')
        }
        
        fetchProposals()
        toast.success('Proposal deleted successfully')
      } catch (error) {
        console.error('Error deleting financing proposal:', error)
        toast.error('Failed to delete financing proposal')
      }
    }
  }

  const handleAddNewProposal = () => {
    setEditingProposal({
      id: 0,
      customerName: '',
      cpf: '',
      proposalDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      proposalValue: 0
    })
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Propostas de Financiamento</h2>
        <Button onClick={handleAddNewProposal}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Proposta
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Cliente</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data da Proposta</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor da Proposta</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>{proposal.customerName}</TableCell>
              <TableCell>{proposal.cpf}</TableCell>
              <TableCell>{new Date(proposal.proposalDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  proposal.status === 'approved' ? 'bg-green-100 text-green-800' :
                  proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {proposal.status === 'approved' ? 'Aprovado' : proposal.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                </span>
              </TableCell>
              <TableCell>{proposal.proposalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => {
                  setEditingProposal(proposal)
                  setIsModalOpen(true)
                }}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProposal(proposal.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingProposal?.id ? 'Editar Proposta' : 'Nova Proposta'}</DialogTitle>
          </DialogHeader>
          {editingProposal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerName" className="text-right">
                  Nome do Cliente
                </Label>
                <Input
                  id="customerName"
                  value={editingProposal.customerName}
                  onChange={(e) => handleProposalChange('customerName', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cpf" className="text-right">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={editingProposal.cpf}
                  onChange={(e) => handleProposalChange('cpf', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proposalDate" className="text-right">
                  Data da Proposta
                </Label>
                <Input
                  id="proposalDate"
                  type="date"
                  value={editingProposal.proposalDate}
                  onChange={(e) => handleProposalChange('proposalDate', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={editingProposal.status}
                  onValueChange={(value: 'pending' | 'approved' | 'rejected') => handleProposalChange('status', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="approved">Aprovado</SelectItem>
                    <SelectItem value="rejected">Rejeitado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="proposalValue" className="text-right">
                  Valor da Proposta
                </Label>
                <Input
                  id="proposalValue"
                  type="number"
                  value={editingProposal.proposalValue}
                  onChange={(e) => handleProposalChange('proposalValue', parseFloat(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveProposal}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

