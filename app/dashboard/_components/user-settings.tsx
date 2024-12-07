'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AccessLevel = 'admin' | 'user' | 'readonly'

interface User {
  id: number
  name: string
  email: string
  accessLevel: AccessLevel
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', accessLevel: 'user' as AccessLevel })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setMessage({ type: 'error', text: 'Ocorreu um erro ao carregar os usuários. Por favor, tente novamente.' })
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
          body: JSON.stringify({ ...editingUser, password: newPassword }),
        })
        if (!response.ok) {
          throw new Error('Failed to update user')
        }
        setEditingUser(null)
      } else {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
        if (!response.ok) {
          throw new Error('Failed to create user')
        }
        setNewUser({ name: '', email: '', password: '', accessLevel: 'user' })
      }
      setNewPassword('')
      fetchUsers()
      setIsModalOpen(false)
      setMessage({ type: 'success', text: editingUser ? 'Usuário atualizado com sucesso!' : 'Novo usuário criado com sucesso!' })
    } catch (error) {
      console.error('Error submitting user:', error)
      setMessage({ type: 'error', text: 'Ocorreu um erro. Por favor, tente novamente.' })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      fetchUsers()
      setMessage({ type: 'success', text: 'Usuário excluído com sucesso!' })
    } catch (error) {
      console.error('Error deleting user:', error)
      setMessage({ type: 'error', text: 'Ocorreu um erro. Por favor, tente novamente.' })
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setNewPassword('')
    setIsModalOpen(true)
  }

  return (
    <div>
      {message && (
        <div className={`p-4 mb-4 text-sm rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`} role="alert">
          {message.text}
        </div>
      )}
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
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuário Regular</SelectItem>
                    <SelectItem value="readonly">Somente Leitura</SelectItem>
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
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.accessLevel}</TableCell>
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

