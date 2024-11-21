import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Car {
  id?: number
  model: string
  manufacturer: string
  year: number
  price: number
  imageUrl: string
  color: string
  licensePlate: string
  doors: number
  transmission: string
}

interface CarRegistrationFormProps {
  initialData?: Car | null
  onSubmit: (car: Omit<Car, 'id'>) => void
}

export function CarRegistrationForm({ initialData, onSubmit }: CarRegistrationFormProps) {
  const [formData, setFormData] = useState<Omit<Car, 'id'>>({
    model: '',
    manufacturer: '',
    year: new Date().getFullYear(),
    price: 0,
    imageUrl: '',
    color: '',
    licensePlate: '',
    doors: 4,
    transmission: 'automatic'
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === 'year' || name === 'price' || name === 'doors' ? Number(value) : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="year">Year</Label>
          <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input id="color" name="color" value={formData.color} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="doors">Number of Doors</Label>
          <Input id="doors" name="doors" type="number" value={formData.doors} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="transmission">Transmission Type</Label>
          <Select name="transmission" value={formData.transmission} onValueChange={(value) => handleSelectChange('transmission', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select transmission type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="cvt">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
      </div>
      <Button type="submit">{initialData ? 'Update Car' : 'Add Car'}</Button>
    </form>
  )
}