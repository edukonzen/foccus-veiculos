import { useState } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

type AccessLevel = 'admin' | 'user' | 'readonly'

interface User {
  id: number
  name: string
  email: string
  accessLevel: AccessLevel
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', accessLevel: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', accessLevel: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', accessLevel: 'readonly' },
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Settings</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingUser ? editingUser.name : newUser.name} 
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
                  value={editingUser ? editingUser.email : newUser.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              {!editingUser && (
                <div>
                  <Label htmlFor="password">Password</Label>
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
                  <Label htmlFor="newPassword">New Password (leave blank to keep current)</Label>
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
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select 
                  onValueChange={handleAccessLevelChange}
                  value={editingUser ? editingUser.accessLevel : newUser.accessLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">Regular User</SelectItem>
                    <SelectItem value="readonly">Read-Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">{editingUser ? 'Update User' : 'Add User'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Access Level</TableHead>
            <TableHead>Actions</TableHead>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Name</Label>
                          <Input 
                            id="edit-name" 
                            name="name" 
                            value={editingUser?.name || ''} 
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
                            value={editingUser?.email || ''} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-newPassword">New Password (leave blank to keep current)</Label>
                          <Input 
                            id="edit-newPassword" 
                            name="newPassword" 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-accessLevel">Access Level</Label>
                          <Select 
                            onValueChange={handleAccessLevelChange}
                            value={editingUser?.accessLevel || 'user'}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select access level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="user">Regular User</SelectItem>
                              <SelectItem value="readonly">Read-Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button type="submit">Update User</Button>
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