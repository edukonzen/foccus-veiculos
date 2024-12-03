'use client'

import { useState } from 'react'
import { Plus, Trash2, FileText } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogOverlay } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, firstName: 'João', lastName: 'Silva', dateOfBirth: '1990-01-01', phone: '(11) 99999-9999', email: 'joao@exemplo.com', address: 'Rua Principal, 123, Cidade', cpf: '123.456.789-00' },
    { id: 2, firstName: 'Maria', lastName: 'Santos', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'maria@exemplo.com', address: 'Avenida Central, 456, Cidade', cpf: '987.654.321-00' },
    { id: 3, firstName: 'Eduardo', lastName: 'Oliveira', dateOfBirth: '1988-07-20', phone: '(11) 77777-7777', email: 'eduardo@exemplo.com', address: 'Rua das Flores, 789, Cidade', cpf: '456.789.123-00' },
    { id: 4, firstName: 'Ana', lastName: 'Rodrigues', dateOfBirth: '1992-03-10', phone: '(11) 66666-6666', email: 'ana@exemplo.com', address: 'Avenida dos Pássaros, 321, Cidade', cpf: '789.123.456-00' },
    { id: 5, firstName: 'Carlos', lastName: 'Ferreira', dateOfBirth: '1983-11-05', phone: '(11) 55555-5555', email: 'carlos@exemplo.com', address: 'Rua do Comércio, 654, Cidade', cpf: '321.654.987-00' },
  ])
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingCustomer) {
      setEditingCustomer({ ...editingCustomer, [name]: value })
    } else {
      setNewCustomer(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCustomer) {
      setCustomers(customers.map(customer => customer.id === editingCustomer.id ? editingCustomer : customer))
      setEditingCustomer(null)
      setConfirmationMessage('Informações do cliente atualizadas com sucesso!')
    } else {
      const id = Math.max(...customers.map(c => c.id), 0) + 1
      setCustomers([...customers, { id, ...newCustomer }])
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
    setTimeout(() => setConfirmationMessage(''), 3000) // Limpa a mensagem após 3 segundos
  }

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id))
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
    if (filterBy === 'cpf') return customer.cpf.includes(searchTerm)

    return matchesSearch
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Clientes</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCustomer(null)
              setIsModalOpen(true)
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogOverlay className="bg-black/30" />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
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
            </form>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingCustomer ? 'Salvar Alterações' : 'Adicionar Cliente'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(customer)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Cliente</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-firstName" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="edit-firstName"
                            name="firstName"
                            value={editingCustomer?.firstName || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-lastName" className="text-right">
                            Sobrenome
                          </Label>
                          <Input
                            id="edit-lastName"
                            name="lastName"
                            value={editingCustomer?.lastName || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-email" className="text-right">
                            E-mail
                          </Label>
                          <Input
                            id="edit-email"
                            name="email"
                            type="email"
                            value={editingCustomer?.email || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-phone" className="text-right">
                            Telefone
                          </Label>
                          <Input
                            id="edit-phone"
                            name="phone"
                            value={editingCustomer?.phone || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-dateOfBirth" className="text-right">
                            Nascimento
                          </Label>
                          <Input
                            id="edit-dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={editingCustomer?.dateOfBirth || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-address" className="text-right">
                            Endereço
                          </Label>
                          <Input
                            id="edit-address"
                            name="address"
                            value={editingCustomer?.address || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-cpf" className="text-right">
                            CPF
                          </Label>
                          <Input
                            id="edit-cpf"
                            name="cpf"
                            value={editingCustomer?.cpf || ''}
                            onChange={handleInputChange}
                            className="col-span-3"
                            required
                          />
                        </div>
                      </form>
                      <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                          Salvar Alterações
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(customer.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

