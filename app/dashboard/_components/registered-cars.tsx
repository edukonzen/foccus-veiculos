import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StandardFormModal } from "@/components/StandardFormModal"
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEdit = (car: Car) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
  }

  const handleAddNewCar = () => {
    setSelectedCar(null)
    setIsModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCar) {
      if (selectedCar.id) {
        setCars(cars.map(car => car.id === selectedCar.id ? selectedCar : car))
      } else {
        const newCar = {
          ...selectedCar,
          id: Math.max(...cars.map(c => c.id), 0) + 1
        }
        setCars([...cars, newCar])
      }
    }
    setIsModalOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSelectedCar(prev => ({ ...prev!, [name]: name === 'year' || name === 'price' || name === 'doors' ? Number(value) : value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setSelectedCar(prev => ({ ...prev!, [name]: value }))
  }

  const renderFormFields = () => (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="model" className="text-right">
          Model
        </Label>
        <Input
          id="model"
          name="model"
          value={selectedCar?.model || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="manufacturer" className="text-right">
          Manufacturer
        </Label>
        <Input
          id="manufacturer"
          name="manufacturer"
          value={selectedCar?.manufacturer || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="year" className="text-right">
          Year
        </Label>
        <Input
          id="year"
          name="year"
          type="number"
          value={selectedCar?.year || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={selectedCar?.price || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="color" className="text-right">
          Color
        </Label>
        <Input
          id="color"
          name="color"
          value={selectedCar?.color || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="licensePlate" className="text-right">
          License Plate
        </Label>
        <Input
          id="licensePlate"
          name="licensePlate"
          value={selectedCar?.licensePlate || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="doors" className="text-right">
          Number of Doors
        </Label>
        <Input
          id="doors"
          name="doors"
          type="number"
          value={selectedCar?.doors || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="transmission" className="text-right">
          Transmission Type
        </Label>
        <Select
          name="transmission"
          value={selectedCar?.transmission || ''}
          onValueChange={(value) => handleSelectChange('transmission', value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select transmission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="automatic">Automatic</SelectItem>
            <SelectItem value="cvt">CVT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="imageUrl" className="text-right">
          Image URL
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={selectedCar?.imageUrl || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
    </>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Registered Cars</h2>
        <Button onClick={handleAddNewCar}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Car
        </Button>
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
              <Button variant="outline" size="sm" onClick={() => handleEdit(car)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(car.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <StandardFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCar?.id ? 'Edit Car' : 'Add New Car'}
        onSubmit={handleSubmit}
      >
        {renderFormFields()}
      </StandardFormModal>
    </div>
  )
}

