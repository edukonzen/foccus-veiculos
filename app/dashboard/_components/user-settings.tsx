'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

type AccessLevel = 'ADMIN' | 'USER' | 'READONLY'

interface User {
  id: string
  name: string
  email: string
  accessLevel: AccessLevel
  status: boolean
  createdAt: string
  updatedAt: string
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', accessLevel: 'USER' as AccessLevel })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState<'name' | 'email' | 'accessLevel'>('name')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error("Ocorreu um erro ao carregar os usuários. Por favor, tente novamente.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (editingUser) {
      setEditingUser({ ...editingUser, [name]: value })
    } else {
      setNewUser(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAccessLevelChange = (value: AccessLevel) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, accessLevel: value })
    } else {
      setNewUser(prev => ({ ...prev, accessLevel: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingUser) {
        const response = await fetch(`/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: editingUser.name, 
            email: editingUser.email, 
            accessLevel: editingUser.accessLevel,
            status: editingUser.status,
            ...(newPassword ? { password: newPassword } : {})
          }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update user')
        }
        setEditingUser(null)
        toast.success("Usuário atualizado com sucesso!")
      } else {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create user')
        }
        setNewUser({ name: '', email: '', password: '', accessLevel: 'USER' })
        toast.success("Novo usuário criado com sucesso!")
      }
      setNewPassword('')
      setIsModalOpen(false)
      fetchUsers()
    } catch (error) {
      console.error('Error submitting user:', error)
      toast.error(error instanceof Error ? error.message : "Ocorreu um erro. Por favor, tente novamente.")
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          throw new Error('Failed to delete user')
        }
        fetchUsers()
        toast.success("Usuário excluído com sucesso!")
      } catch (error) {
        console.error('Error deleting user:', error)
        toast.error("Ocorreu um erro ao excluir o usuário. Por favor, tente novamente.")
      }
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setNewPassword('')
    setIsModalOpen(true)
  }

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase()
    switch (filterBy) {
      case 'name':
        return user.name.toLowerCase().includes(searchLower)
      case 'email':
        return user.email.toLowerCase().includes(searchLower)
      case 'accessLevel':
        return user.accessLevel.toLowerCase().includes(searchLower)
      default:
        return true
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Configurações de Usuário</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null)
              setIsModalOpen(true)
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingUser ? editingUser.name : newUser.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={editingUser ? editingUser.email : newUser.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  {editingUser ? 'Nova Senha (deixe em branco para manter a atual)' : 'Senha'}
                </Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={editingUser ? newPassword : newUser.password} 
                  onChange={(e) => editingUser ? setNewPassword(e.target.value) : handleInputChange(e)} 
                  required={!editingUser}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessLevel">Nível de Acesso</Label>
                <Select 
                  onValueChange={handleAccessLevelChange}
                  value={editingUser ? editingUser.accessLevel : newUser.accessLevel}
                >
                  <SelectTrigger id="accessLevel">
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="USER">Usuário Regular</SelectItem>
                    <SelectItem value="READONLY">Somente Leitura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editingUser && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    onValueChange={(value) => setEditingUser({...editingUser, status: value === 'true'})}
                    value={editingUser.status.toString()}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Ativo</SelectItem>
                      <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <DialogFooter>
                <Button type="submit">{editingUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterBy} onValueChange={(value: 'name' | 'email' | 'accessLevel') => setFilterBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="email">E-mail</SelectItem>
            <SelectItem value="accessLevel">Nível de Acesso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Nível de Acesso</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Última Atualização</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.accessLevel}</TableCell>
              <TableCell>{user.status ? 'Ativo' : 'Inativo'}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
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

