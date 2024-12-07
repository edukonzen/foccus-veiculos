'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StandardFormModal } from "@/components/StandardFormModal"

interface Customer {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  cpf: string
}

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    cpf: ''
  })
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers')
      if (!response.ok) {
        throw new Error('Failed to fetch customers')
      }
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingCustomer) {
      setEditingCustomer({ ...editingCustomer, [name]: value })
    } else {
      setNewCustomer(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCustomer) {
        const response = await fetch(`/api/customers/${editingCustomer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingCustomer),
        })
        if (!response.ok) {
          throw new Error('Failed to update customer')
        }
        setEditingCustomer(null)
        setConfirmationMessage('Informações do cliente atualizadas com sucesso!')
      } else {
        const response = await fetch('/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCustomer),
        })
        if (!response.ok) {
          throw new Error('Failed to create customer')
        }
        setNewCustomer({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          phone: '',
          email: '',
          address: '',
          cpf: ''
        })
        setConfirmationMessage('Novo cliente adicionado com sucesso!')
      }
      setIsModalOpen(false)
      fetchCustomers()
    } catch (error) {
      console.error('Error submitting customer:', error)
      setConfirmationMessage('Ocorreu um erro. Por favor, tente novamente.')
    }
    setTimeout(() => setConfirmationMessage(''), 3000)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete customer')
      }
      fetchCustomers()
      setConfirmationMessage('Cliente excluído com sucesso!')
    } catch (error) {
      console.error('Error deleting customer:', error)
      setConfirmationMessage('Ocorreu um erro ao excluir o cliente. Por favor, tente novamente.')
    }
    setTimeout(() => setConfirmationMessage(''), 3000)
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsModalOpen(true)
  }

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cpf.includes(searchTerm)

    if (filterBy === 'all') return matchesSearch
    if (filterBy === 'name') return customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterBy === 'email') return customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    if (filterBy === 'cpf') return customer.cpf.toLowerCase().includes(searchTerm)

    return matchesSearch
  })

  const renderFormFields = () => (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="firstName" className="text-right">
          Nome
        </Label>
        <Input
          id="firstName"
          name="firstName"
          value={editingCustomer ? editingCustomer.firstName : newCustomer.firstName}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="lastName" className="text-right">
          Sobrenome
        </Label>
        <Input
          id="lastName"
          name="lastName"
          value={editingCustomer ? editingCustomer.lastName : newCustomer.lastName}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={editingCustomer ? editingCustomer.email : newCustomer.email}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Telefone
        </Label>
        <Input
          id="phone"
          name="phone"
          value={editingCustomer ? editingCustomer.phone : newCustomer.phone}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dateOfBirth" className="text-right">
          Nascimento
        </Label>
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={editingCustomer ? editingCustomer.dateOfBirth : newCustomer.dateOfBirth}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="address" className="text-right">
          Endereço
        </Label>
        <Input
          id="address"
          name="address"
          value={editingCustomer ? editingCustomer.address : newCustomer.address}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="cpf" className="text-right">
          CPF
        </Label>
        <Input
          id="cpf"
          name="cpf"
          value={editingCustomer ? editingCustomer.cpf : newCustomer.cpf}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
    </>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Clientes</h2>
        <Button onClick={() => {
          setEditingCustomer(null)
          setIsModalOpen(true)
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>
      {confirmationMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{confirmationMessage}</span>
        </div>
      )}
      <div className="flex space-x-2 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="email">E-mail</SelectItem>
            <SelectItem value="cpf">CPF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.map(customer => (
            <TableRow key={customer.id}>
              <TableCell>{customer.firstName} {customer.lastName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(customer)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(customer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <StandardFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
        onSubmit={handleSubmit}
      >
        {renderFormFields()}
      </StandardFormModal>
    </div>
  )
}

