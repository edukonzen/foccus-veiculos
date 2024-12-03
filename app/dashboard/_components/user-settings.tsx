import { useState } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AccessLevel = 'admin' | 'user' | 'readonly'

interface User {
  id: number
  name: string
  email: string
  password?: string
  accessLevel: AccessLevel
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', password: 'senha123', accessLevel: 'admin' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', password: 'senha456', accessLevel: 'user' },
    { id: 3, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', password: 'senha789', accessLevel: 'readonly' },
  ])

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', accessLevel: 'user' as AccessLevel })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState('')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...editingUser, password: newPassword || user.password } : user))
      setEditingUser(null)
    } else {
      const id = Math.max(...users.map(u => u.id), 0) + 1
      setUsers([...users, { id, ...newUser }])
      setNewUser({ name: '', email: '', password: '', accessLevel: 'user' })
    }
    setNewPassword('')
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setNewPassword('')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Configurações de Usuário</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
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
              {!editingUser && (
                <div>
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={newUser.password} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
              )}
              {editingUser && (
                <div>
                  <Label htmlFor="newPassword">Nova Senha (deixe em branco para manter a atual)</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                  />
                </div>
              )}
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
              <Button type="submit">{editingUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</Button>
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
              <TableCell className="capitalize">{user.accessLevel === 'admin' ? 'Administrador' : user.accessLevel === 'user' ? 'Usuário Regular' : 'Somente Leitura'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Usuário</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Nome</Label>
                          <Input 
                            id="edit-name" 
                            name="name" 
                            value={editingUser?.name || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-email">E-mail</Label>
                          <Input 
                            id="edit-email" 
                            name="email" 
                            type="email" 
                            value={editingUser?.email || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-newPassword">Nova Senha (deixe em branco para manter a atual)</Label>
                          <Input 
                            id="edit-newPassword" 
                            name="newPassword" 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-accessLevel">Nível de Acesso</Label>
                          <Select 
                            onValueChange={handleAccessLevelChange}
                            value={editingUser?.accessLevel || 'user'}
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
                        <Button type="submit">Atualizar Usuário</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
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

