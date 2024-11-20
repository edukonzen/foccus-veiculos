'use client'

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Slider } from "@/app/components/ui/slider"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"


const carTypes = [
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV" },
  { id: "sports", label: "Esportivo" },
  { id: "electric", label: "Elétrico" },
  { id: "hatchback", label: "Hatchback" },
  { id: "minivan", label: "Minivan" },
]

const cars = [
  { id: 1, model: "Civic", manufacturer: "Honda", year: 2022, price: 120000, color: "Prata", licensePlate: "ABC1234", doors: 4, transmission: "Automático", image: "/placeholder.svg", type: "sedan" },
  { id: 2, model: "Corolla", manufacturer: "Toyota", year: 2023, price: 130000, color: "Branco", licensePlate: "DEF5678", doors: 4, transmission: "Automático", image: "/placeholder.svg", type: "sedan" },
  { id: 3, model: "Golf", manufacturer: "Volkswagen", year: 2021, price: 110000, color: "Azul", licensePlate: "GHI9012", doors: 4, transmission: "Manual", image: "/placeholder.svg", type: "hatchback" },
  { id: 4, model: "X5", manufacturer: "BMW", year: 2023, price: 350000, color: "Preto", licensePlate: "JKL3456", doors: 5, transmission: "Automático", image: "/placeholder.svg", type: "suv" },
  { id: 5, model: "Model 3", manufacturer: "Tesla", year: 2022, price: 280000, color: "Vermelho", licensePlate: "MNO7890", doors: 4, transmission: "Automático", image: "/placeholder.svg", type: "electric" },
  { id: 6, model: "911", manufacturer: "Porsche", year: 2023, price: 750000, color: "Amarelo", licensePlate: "PQR1234", doors: 2, transmission: "Automático", image: "/placeholder.svg", type: "sports" },
  { id: 7, model: "Sienna", manufacturer: "Toyota", year: 2022, price: 200000, color: "Cinza", licensePlate: "STU5678", doors: 5, transmission: "Automático", image: "/placeholder.svg", type: "minivan" },
  { id: 8, model: "Mustang", manufacturer: "Ford", year: 2021, price: 300000, color: "Vermelho", licensePlate: "VWX9012", doors: 2, transmission: "Manual", image: "/placeholder.svg", type: "sports" },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [yearRange, setYearRange] = useState([2021, 2023])

  const filteredCars = cars.filter(car => 
    (searchTerm === "" || car.model.toLowerCase().includes(searchTerm.toLowerCase()) || car.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTypes.length === 0 || selectedTypes.includes(car.type)) &&
    (car.year >= yearRange[0] && car.year <= yearRange[1])
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Inventário de Carros</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Buscar</h2>
                  <Input
                    type="text"
                    placeholder="Buscar por modelo ou fabricante"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Tipos de Carro</h2>
                  {carTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={(checked) => {
                          setSelectedTypes(
                            checked
                              ? [...selectedTypes, type.id]
                              : selectedTypes.filter((id) => id !== type.id)
                          )
                        }}
                      />
                      <label
                        htmlFor={type.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Ano</h2>
                  <Slider
                    min={2021}
                    max={2023}
                    step={1}
                    value={yearRange}
                    onValueChange={setYearRange}
                  />
                  <div className="flex justify-between mt-2">
                    <span>{yearRange[0]}</span>
                    <span>{yearRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCars.map((car) => (
                  <Card key={car.id}>
                    <CardContent className="p-4">
                      <img
                        src={car.image}
                        alt={`${car.manufacturer} ${car.model}`}
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                      <h3 className="font-semibold text-lg mb-2">{car.manufacturer} {car.model}</h3>
                      <p className="text-sm text-gray-600 mb-1">Ano: {car.year}</p>
                      <p className="text-sm text-gray-600 mb-1">Preço: R$ {car.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mb-1">Cor: {car.color}</p>
                      <p className="text-sm text-gray-600 mb-1">Placa: {car.licensePlate}</p>
                      <p className="text-sm text-gray-600 mb-1">Portas: {car.doors}</p>
                      <p className="text-sm text-gray-600">Transmissão: {car.transmission}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Ver Detalhes</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}