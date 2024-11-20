'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

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
    { id: 1, firstName: 'John', lastName: 'Doe', dateOfBirth: '1990-01-01', phone: '(11) 99999-9999', email: 'john@example.com', address: '123 Main St, City', cpf: '123.456.789-00' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },
    { id: 3, firstName: 'Eduardo', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },
    { id: 4, firstName: 'Edinal', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },
    { id: 5, firstName: 'Elaine', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },
    { id: 6, firstName: 'Fabiola', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },
    { id: 7, firstName: 'José', lastName: 'Smith', dateOfBirth: '1985-05-15', phone: '(11) 88888-8888', email: 'jane@example.com', address: '456 Elm St, Town', cpf: '987.654.321-00' },

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
  const [isEditing, setIsEditing] = useState(false)
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
      setIsEditing(false)
      setConfirmationMessage('Customer information updated successfully!')
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
      setConfirmationMessage('New customer added successfully!')
    }
    setIsModalOpen(false)
    setTimeout(() => setConfirmationMessage(''), 3000) // Clear message after 3 seconds
  }

  const handleDelete = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id))
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsEditing(true)
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingCustomer(null)
              setIsEditing(false)
              setIsModalOpen(true)
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName" 
                  value={editingCustomer ? editingCustomer.firstName : newCustomer.firstName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={editingCustomer ? editingCustomer.lastName : newCustomer.lastName} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={editingCustomer ? editingCustomer.email : newCustomer.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={editingCustomer ? editingCustomer.phone : newCustomer.phone} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input 
                  id="dateOfBirth" 
                  name="dateOfBirth" 
                  type="date" 
                  value={editingCustomer ? editingCustomer.dateOfBirth : newCustomer.dateOfBirth} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={editingCustomer ? editingCustomer.address : newCustomer.address} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input 
                  id="cpf" 
                  name="cpf" 
                  value={editingCustomer ? editingCustomer.cpf : newCustomer.cpf} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="submit">
                  {editingCustomer ? 'Save Changes' : 'Add Customer'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setEditingCustomer(null)
                  setIsEditing(false)
                  setIsModalOpen(false)
                }}>
                  Cancel
                </Button>
              </div>
            </form>
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
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterBy} onValueChange={setFilterBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="cpf">CPF</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
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
                      <Button variant="outline" size="sm" onClick={() => {
                        handleEdit(customer)
                        setIsModalOpen(true)
                      }}>
                        <FileText className="w-4 h-4" />
                        <span className="sr-only">Edit Customer</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Customer</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-firstName">First Name</Label>
                          <Input 
                            id="edit-firstName" 
                            name="firstName" 
                            value={editingCustomer?.firstName || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-lastName">Last Name</Label>
                          <Input 
                            id="edit-lastName" 
                            name="lastName" 
                            value={editingCustomer?.lastName || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-email">Email</Label>
                          <Input 
                            id="edit-email" 
                            name="email" 
                            type="email" 
                            value={editingCustomer?.email || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-phone">Phone</Label>
                          <Input 
                            id="edit-phone" 
                            name="phone" 
                            value={editingCustomer?.phone || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                          <Input 
                            id="edit-dateOfBirth" 
                            name="dateOfBirth" 
                            type="date" 
                            value={editingCustomer?.dateOfBirth || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-address">Address</Label>
                          <Input 
                            id="edit-address" 
                            name="address" 
                            value={editingCustomer?.address || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-cpf">CPF</Label>
                          <Input 
                            id="edit-cpf" 
                            name="cpf" 
                            value={editingCustomer?.cpf || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="submit">Save Changes</Button>
                          <Button type="button" variant="outline" onClick={() => {
                            setEditingCustomer(null)
                            setIsEditing(false)
                            setIsModalOpen(false)
                          }}>
                            Cancel
                          </Button>
                        </div>
                      </form>
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