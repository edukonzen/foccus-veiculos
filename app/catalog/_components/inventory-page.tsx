'use client'

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CarDetailsModal } from "@/components/CarDetailsModal"
import Image from 'next/image'

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
  photos: { url: string }[]
}

const categories = [
  "Hatch",
  "Sedan",
  "SUV",
  "Picape",
  "Minivan",
  "Conversível",
  "Cupê",
  "Esportivo",
  "Wagon (Perua)",
  "Utilitário",
  "Off-Road",
  "Elétrico",
  "Híbrido",
  "Compacto",
  "Luxo"
]

const transmissions = ["Manual", "Automático", "CVT"]

export default function InventoryPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [busca, setBusca] = useState("")
  const [anoMin, setAnoMin] = useState("")
  const [anoMax, setAnoMax] = useState("")
  const [valorMin, setValorMin] = useState("")
  const [valorMax, setValorMax] = useState("")
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([])
  const [transmissoesSelecionadas, setTransmissoesSelecionadas] = useState<string[]>([])
  const [carroSelecionado, setCarroSelecionado] = useState<Car | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars')
        if (!response.ok) {
          throw new Error('Failed to fetch cars')
        }
        const data = await response.json()
        setCars(data)
        setFilteredCars(data)
      } catch (error) {
        console.error('Error fetching cars:', error)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    const filtered = cars.filter(carro => 
      (carro.model.toLowerCase().includes(busca.toLowerCase()) || 
       carro.manufacturer.toLowerCase().includes(busca.toLowerCase())) &&
      (anoMin === "" || carro.year >= parseInt(anoMin)) &&
      (anoMax === "" || carro.year <= parseInt(anoMax)) &&
      (valorMin === "" || carro.price >= parseInt(valorMin)) &&
      (valorMax === "" || carro.price <= parseInt(valorMax)) &&
      (categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(carro.category)) &&
      (transmissoesSelecionadas.length === 0 || transmissoesSelecionadas.includes(carro.transmission))
    )
    setFilteredCars(filtered)
  }, [cars, busca, anoMin, anoMax, valorMin, valorMax, categoriasSelecionadas, transmissoesSelecionadas])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Veículos</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/5 space-y-6">
            <div>
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <Input
                id="busca"
                placeholder="Buscar veículos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Categorias</h2>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                {categories.map((categoria) => (
                  <div key={categoria} className="flex items-center space-x-2">
                    <Checkbox
                      id={categoria}
                      checked={categoriasSelecionadas.includes(categoria)}
                      onCheckedChange={(checked) => {
                        setCategoriasSelecionadas(
                          checked
                            ? [...categoriasSelecionadas, categoria]
                            : categoriasSelecionadas.filter((c) => c !== categoria)
                        )
                      }}
                    />
                    <label
                      htmlFor={categoria}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {categoria}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Tipo de Transmissão</h2>
              <div className="space-y-2">
                {transmissions.map((transmissao) => (
                  <div key={transmissao} className="flex items-center space-x-2">
                    <Checkbox
                      id={transmissao}
                      checked={transmissoesSelecionadas.includes(transmissao)}
                      onCheckedChange={(checked) => {
                        setTransmissoesSelecionadas(
                          checked
                            ? [...transmissoesSelecionadas, transmissao]
                            : transmissoesSelecionadas.filter((t) => t !== transmissao)
                        )
                      }}
                    />
                    <label
                      htmlFor={transmissao}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {transmissao}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Ano</h2>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="De"
                  value={anoMin}
                  onChange={(e) => setAnoMin(e.target.value)}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Até"
                  value={anoMax}
                  onChange={(e) => setAnoMax(e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Valor</h2>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="De"
                  value={valorMin}
                  onChange={(e) => setValorMin(e.target.value)}
                  className="w-1/2"
                />
                <Input
                  type="number"
                  placeholder="Até"
                  value={valorMax}
                  onChange={(e) => setValorMax(e.target.value)}
                  className="w-1/2"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCars.map(carro => (
                <Card key={carro.id} className="flex flex-col h-full">
                  <CardHeader className="flex-grow-0">
                    <CardTitle className="text-lg">{carro.manufacturer} {carro.model}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={carro.photos[0]?.url || "/placeholder.svg"}
                        alt={`${carro.manufacturer} ${carro.model}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className="text-xl font-bold mb-2">R$ {carro.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 capitalize">{carro.category}</p>
                    <p className="text-sm text-gray-500">Ano: {carro.year}</p>
                    <p className="text-sm text-gray-500">Transmissão: {carro.transmission}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full" onClick={() => setCarroSelecionado(carro)}>Ver Detalhes</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {carroSelecionado && (
        <CarDetailsModal
          isOpen={!!carroSelecionado}
          onClose={() => setCarroSelecionado(null)}
          car={carroSelecionado}
        />
      )}
    </div>
  )
}

