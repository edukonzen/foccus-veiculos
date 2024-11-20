'use client'

import { useState } from 'react'
import { CalendarIcon, FileText, User, ImageIcon, Edit2, Plus } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Checkbox } from "@/app/components/ui/checkbox"

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
  const [proposals, setProposals] = useState<FinancingProposal[]>([
    {
      id: 1,
      customerName: 'João',
      customerSurname: 'Silva',
      dateOfBirth: '1985-03-15',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      isMarried: true,
      proposalDate: '2023-06-01',
      status: 'pending',
      documents: ['ID.pdf', 'ProofOfIncome.pdf', 'AddressProof.pdf'],
      address: 'Rua das Flores, 123, São Paulo - SP',
      proposalValue: 50000
    },
    {
      id: 2,
      customerName: 'Maria',
      customerSurname: 'Santos',
      dateOfBirth: '1990-07-22',
      cpf: '987.654.321-00',
      rg: '98.765.432-1',
      isMarried: false,
      proposalDate: '2023-06-05',
      status: 'approved',
      documents: ['ID.pdf', 'ProofOfIncome.pdf', 'AddressProof.pdf', 'VehicleInspection.pdf'],
      address: 'Avenida Paulista, 1000, São Paulo - SP',
      proposalValue: 75000
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingProposal, setEditingProposal] = useState<FinancingProposal | null>(null)

  const filteredProposals = proposals.filter(proposal => 
    (proposal.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proposal.customerSurname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     proposal.cpf.includes(searchTerm)) &&
    (filterStatus === 'all' || proposal.status === filterStatus)
  )

  const handleProposalChange = (field: keyof FinancingProposal, value: any) => {
    if (editingProposal) {
      setEditingProposal({ ...editingProposal, [field]: value })
    }
  }

  const handleSaveProposal = () => {
    if (editingProposal) {
      if (editingProposal.id) {
        setProposals(proposals.map(p => p.id === editingProposal.id ? editingProposal : p))
      } else {
        setProposals([...proposals, { ...editingProposal, id: proposals.length + 1 }])
      }
      setEditingProposal(null)
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
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Financing Proposals</h2>
        <Button onClick={handleAddNewProposal}>
          <Plus className="mr-2 h-4 w-4" /> Add Proposal
        </Button>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Input
            placeholder="Search by name or CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="w-full rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Proposal Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
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
                  {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="px-4">
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Proposal Details</DialogTitle>
                        <DialogDescription>
                          Financing proposal for {proposal.customerName} {proposal.customerSurname}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Full Name</Label>
                          <div>{proposal.customerName} {proposal.customerSurname}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Date of Birth</Label>
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
                          <Label>Marital Status</Label>
                          <div>{proposal.isMarried ? 'Married' : 'Single'}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Proposal Date</Label>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                            {proposal.proposalDate}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Address</Label>
                          <div>{proposal.address}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label>Proposal Value</Label>
                          <div>{proposal.proposalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-4">
                          <Label>Attached Documents</Label>
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
                        <span className="sr-only">Edit Proposal</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Edit Proposal</DialogTitle>
                        <DialogDescription>
                          Update the proposal for {proposal.customerName} {proposal.customerSurname}
                        </DialogDescription>
                      </DialogHeader>
                      {editingProposal && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="customerName">First Name</Label>
                            <Input
                              id="customerName"
                              value={editingProposal.customerName}
                              onChange={(e) => handleProposalChange('customerName', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="customerSurname">Last Name</Label>
                            <Input
                              id="customerSurname"
                              value={editingProposal.customerSurname}
                              onChange={(e) => handleProposalChange('customerSurname', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
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
                            <Label htmlFor="isMarried">Marital Status</Label>
                            <Checkbox
                              id="isMarried"
                              checked={editingProposal.isMarried}
                              onCheckedChange={(checked) => handleProposalChange('isMarried', checked)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="proposalDate">Proposal Date</Label>
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
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={editingProposal.address}
                              onChange={(e) => handleProposalChange('address', e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="proposalValue">Proposal Value</Label>
                            <Input
                              id="proposalValue"
                              type="number"
                              value={editingProposal.proposalValue}
                              onChange={(e) => handleProposalChange('proposalValue', parseFloat(e.target.value))}
                            />
                          </div>
                          <Button onClick={handleSaveProposal}>Save Changes</Button>
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