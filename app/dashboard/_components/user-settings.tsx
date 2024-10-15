import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
}

export function UserSettings() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ])
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    setUsers([...users, { id, name: newUser.name, email: newUser.email }])
    setNewUser({ name: '', email: '', password: '' })
  }

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">User Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={newUser.name} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={newUser.email} onChange={handleInputChange} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={newUser.password} onChange={handleInputChange} required />
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Existing Users</h3>
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveUser(user.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}