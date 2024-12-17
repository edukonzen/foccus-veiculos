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
  createdAt: string
  updatedAt: string
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', accessLevel: 'USER' as AccessLevel })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      setError("Ocorreu um erro ao carregar os usuários. Por favor, tente novamente.")
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
    setError(null)
    try {
      if (editingUser) {
        const response = await fetch(`/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name: editingUser.name, 
            email: editingUser.email, 
            accessLevel: editingUser.accessLevel,
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
      setError(error instanceof Error ? error.message : "Ocorreu um erro. Por favor, tente novamente.")
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
        alert("Usuário excluído com sucesso!")
      } catch (error) {
        console.error('Error deleting user:', error)
        setError("Ocorreu um erro ao excluir o usuário. Por favor, tente novamente.")
      }
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setNewPassword('')
    setIsModalOpen(true)
  }

  return (
    <div>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Configurações de Usuário</h2>
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
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingUser ? editingUser.name : newUser.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
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
              <div>
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
              <div>
                <Label htmlFor="accessLevel">Nível de Acesso</Label>
                <Select 
                  onValueChange={handleAccessLevelChange}
                  value={editingUser ? editingUser.accessLevel : newUser.accessLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="USER">Usuário Regular</SelectItem>
                    <SelectItem value="READONLY">Somente Leitura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">{editingUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Nível de Acesso</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead>Última Atualização</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.accessLevel.toLowerCase()}</TableCell>
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

