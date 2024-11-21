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
    { id: 1, model: "Model S", manufacturer: "Tesla", year: 2022, price: 89990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Red", licensePlate: "ABC123", doors: 4, transmission: "automatic" },
    { id: 2, model: "F-150", manufacturer: "Ford", year: 2023, price: 59990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Blue", licensePlate: "XYZ789", doors: 4, transmission: "automatic" },
    { id: 3, model: "Civic", manufacturer: "Honda", year: 2022, price: 22990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Silver", licensePlate: "DEF456", doors: 4, transmission: "manual" },
    { id: 4, model: "3 Series", manufacturer: "BMW", year: 2023, price: 41990, imageUrl: "/placeholder.svg?height=200&width=300", color: "Black", licensePlate: "GHI789", doors: 4, transmission: "automatic" },
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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Catalog Cars</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddNewCar}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isAddingNewCar ? 'Add New Car' : 'Edit Car'}</DialogTitle>
            </DialogHeader>
            <CarRegistrationForm 
              initialData={isAddingNewCar ? null : selectedCar} 
              onSubmit={handleSubmitCar} 
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <p className="text-sm text-gray-600">Year: {car.year}</p>
              <p className="text-sm text-gray-600">Color: {car.color}</p>
              <p className="text-sm text-gray-600">License Plate: {car.licensePlate}</p>
              <p className="text-sm font-bold mt-2">${car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Car</DialogTitle>
                  </DialogHeader>
                  <CarRegistrationForm initialData={selectedCar} onSubmit={handleSubmitCar} />
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
