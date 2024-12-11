'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Image from 'next/image'

interface Photo {
  id?: number
  url: string
  file?: File
}

interface Car {
  id: number
  model: string
  manufacturer: string
  year: number
  price: number
  color: string
  licensePlate: string
  doors: number
  transmission: string
  category: string
  photos: Photo[]
}

const carCategories = [
  "Hatch", "Sedan", "SUV", "Picape", "Minivan", "Conversível", "Cupê", "Esportivo",
  "Wagon (Perua)", "Utilitário", "Off-Road", "Elétrico", "Híbrido", "Compacto", "Luxo"
]

export function RegisteredCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isAddingNewCar, setIsAddingNewCar] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<Car, 'id'>>({
    model: '',
    manufacturer: '',
    year: new Date().getFullYear(),
    price: 0,
    color: '',
    licensePlate: '',
    doors: 4,
    transmission: 'automático',
    category: '',
    photos: []
  })

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars')
      if (!response.ok) {
        throw new Error('Failed to fetch cars')
      }
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error('Error fetching cars:', error)
      toast.error('Erro ao carregar os carros')
      setCars([])
    }
  }

  const handleEdit = (car: Car) => {
    setSelectedCar(car)
    setFormData({
      ...car,
      photos: car.photos
    })
    setIsAddingNewCar(false)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este carro?')) {
      try {
        const response = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
        if (!response.ok) {
          throw new Error('Failed to delete car')
        }
        toast.success('Carro excluído com sucesso')
        fetchCars()
      } catch (error) {
        console.error('Error deleting car:', error)
        toast.error('Erro ao excluir o carro')
      }
    }
  }

  const handleAddNewCar = () => {
    setSelectedCar(null)
    setFormData({
      model: '',
      manufacturer: '',
      year: new Date().getFullYear(),
      price: 0,
      color: '',
      licensePlate: '',
      doors: 4,
      transmission: 'automático',
      category: '',
      photos: []
    })
    setIsAddingNewCar(true)
    setIsModalOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos: Photo[] = Array.from(e.target.files).map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }))
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }))
    }
  }

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'photos') {
          formDataToSend.append(key, String(value))
        }
      })

      formData.photos.forEach((photo) => {
        if (photo.file instanceof File) {
          formDataToSend.append(`photos`, photo.file, photo.file.name)
        } else if (photo.url) {
          formDataToSend.append(`existingPhotos`, photo.url)
        }
      })

      const method = isAddingNewCar ? 'POST' : 'PUT'
      const url = isAddingNewCar ? '/api/cars' : `/api/cars/${selectedCar?.id}`

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit car data')
      }

      toast.success(isAddingNewCar ? 'Carro adicionado com sucesso' : 'Carro atualizado com sucesso')
      setIsModalOpen(false)
      fetchCars()
    } catch (error) {
      console.error('Error submitting car data:', error)
      toast.error(`Erro ao salvar os dados do carro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Carros Cadastrados</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNewCar}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo Carro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isAddingNewCar ? 'Adicionar Novo Carro' : 'Editar Carro'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model">Modelo</Label>
                  <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="manufacturer">Fabricante</Label>
                  <Input id="manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="year">Ano</Label>
                  <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input id="color" name="color" value={formData.color} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="licensePlate">Placa</Label>
                  <Input id="licensePlate" name="licensePlate" value={formData.licensePlate} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="doors">Número de Portas</Label>
                  <Input id="doors" name="doors" type="number" value={formData.doors} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="transmission">Tipo de Transmissão</Label>
                  <Select name="transmission" value={formData.transmission} onValueChange={(value) => handleSelectChange('transmission', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de transmissão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="automático">Automático</SelectItem>
                      <SelectItem value="cvt">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {carCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="photos">Fotos do Carro</Label>
                <Input id="photos" name="photos" type="file" onChange={handleFileChange} accept="image/*" multiple />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={photo.url}
                      alt={`Preview ${index}`}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button type="submit">{isAddingNewCar ? 'Adicionar Carro' : 'Atualizar Carro'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <Card key={car.id} className="overflow-hidden">
            {car.photos.length > 0 ? (
              <Image
                src={car.photos[0].url}
                alt={`${car.manufacturer} ${car.model}`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{car.manufacturer} {car.model}</h3>
              <p className="text-sm text-gray-600">Ano: {car.year}</p>
              <p className="text-sm text-gray-600">Cor: {car.color}</p>
              <p className="text-sm text-gray-600">Placa: {car.licensePlate}</p>
              <p className="text-sm text-gray-600">Categoria: {car.category}</p>
              <p className="text-sm font-bold mt-2">R$ {car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

