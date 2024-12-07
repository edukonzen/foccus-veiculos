'use client'

import { useState, useEffect } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CarRegistrationForm } from './car-registration-form'
import Image from 'next/image'

interface Car {
  id: number
  model: string
  manufacturer: string
  year: number
  price: number
  image: string | null
  color: string
  licensePlate: string
  doors: number
  transmission: string
}

export function RegisteredCars() {
  const [cars, setCars] = useState<Car[]>([])
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isAddingNewCar, setIsAddingNewCar] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setCars([])
    }
  }

  const handleEdit = (car: Car) => {
    setSelectedCar(car)
    setIsAddingNewCar(false)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/cars/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete car')
      }
      fetchCars()
    } catch (error) {
      console.error('Error deleting car:', error)
    }
  }

  const handleAddNewCar = () => {
    setSelectedCar(null)
    setIsAddingNewCar(true)
    setIsModalOpen(true)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      const method = isAddingNewCar ? 'POST' : 'PUT'
      const url = isAddingNewCar ? '/api/cars' : `/api/cars/${selectedCar?.id}`

      const response = await fetch(url, {
        method,
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit car data')
      }

      setIsModalOpen(false)
      fetchCars()
    } catch (error) {
      console.error('Error submitting car data:', error)
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
            <CarRegistrationForm 
              initialData={selectedCar} 
              onSubmit={handleSubmit} 
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <Card key={car.id} className="overflow-hidden">
            {car.image ? (
              <Image
                src={car.image}
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

