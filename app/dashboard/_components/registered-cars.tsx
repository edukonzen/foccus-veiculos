import { useState } from 'react'
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
  imageUrl: string
  color: string
  licensePlate: string
  doors: number
  transmission: string
}

export function RegisteredCars() {
  const [cars, setCars] = useState<Car[]>([
    { id: 1, model: "Model S", manufacturer: "Tesla", year: 2022, price: 89990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Vermelho", licensePlate: "ABC-1234", doors: 4, transmission: "automático" },
    { id: 2, model: "F-150", manufacturer: "Ford", year: 2023, price: 59990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Azul", licensePlate: "XYZ-7890", doors: 4, transmission: "automático" },
    { id: 3, model: "Civic", manufacturer: "Honda", year: 2022, price: 22990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Prata", licensePlate: "DEF-4567", doors: 4, transmission: "manual" },
    { id: 4, model: "Série 3", manufacturer: "BMW", year: 2023, price: 41990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Preto", licensePlate: "GHI-7890", doors: 4, transmission: "automático" },
  ])

  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [isAddingNewCar, setIsAddingNewCar] = useState(false)

  const handleEdit = (car: Car) => {
    setSelectedCar(car)
    setIsAddingNewCar(false)
  }

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
  }

  const handleAddNewCar = () => {
    setSelectedCar(null)
    setIsAddingNewCar(true)
  }

  const handleSubmitCar = (carData: Omit<Car, 'id'>) => {
    if (isAddingNewCar) {
      const newCar = {
        ...carData,
        id: Math.max(...cars.map(c => c.id), 0) + 1
      }
      setCars([...cars, newCar])
    } else {
      setCars(cars.map(car => car.id === selectedCar?.id ? { ...carData, id: car.id } : car))
    }
    setSelectedCar(null)
    setIsAddingNewCar(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Carros Cadastrados</h2>
        <Dialog>
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
              initialData={isAddingNewCar ? null : selectedCar} 
              onSubmit={handleSubmitCar} 
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <Card key={car.id} className="overflow-hidden">
            <Image
              src={car.imageUrl}
              alt={`${car.manufacturer} ${car.model}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{car.manufacturer} {car.model}</h3>
              <p className="text-sm text-gray-600">Ano: {car.year}</p>
              <p className="text-sm text-gray-600">Cor: {car.color}</p>
              <p className="text-sm text-gray-600">Placa: {car.licensePlate}</p>
              <p className="text-sm font-bold mt-2">R$ {car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar Carro</DialogTitle>
                  </DialogHeader>
                  <CarRegistrationForm initialData={selectedCar} onSubmit={handleSubmitCar} />
                </DialogContent>
              </Dialog>
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

