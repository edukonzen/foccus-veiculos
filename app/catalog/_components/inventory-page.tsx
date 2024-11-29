'use client'

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CarDetailsModal } from "@/components/CarDetailsModal"
import Image from 'next/image'

// Dados de exemplo para os carros
const carros = [
  { 
    id: 1, 
    nome: "Sedan Luxuoso", 
    preco: 120000, 
    categoria: "sedan", 
    ano: 2022, 
    modelo: "Sedan", 
    fabricante: "FoccusCars",
    cor: "Prata",
    placa: "ABC1234",
    portas: 4,
    transmissao: "Automática",
    imagens: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  { 
    id: 2, 
    nome: "SUV Esportivo", 
    preco: 150000, 
    categoria: "suv", 
    ano: 2023, 
    modelo: "SUV", 
    fabricante: "FoccusCars",
    cor: "Preto",
    placa: "DEF5678",
    portas: 5,
    transmissao: "Automática",
    imagens: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  { 
    id: 3, 
    nome: "Hatch Econômico", 
    preco: 80000, 
    categoria: "hatch", 
    ano: 2021, 
    modelo: "Hatch", 
    fabricante: "FoccusCars",
    cor: "Branco",
    placa: "GHI9012",
    portas: 5,
    transmissao: "Manual",
    imagens: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  { 
    id: 4, 
    nome: "Picape Robusta", 
    preco: 180000, 
    categoria: "picape", 
    ano: 2023, 
    modelo: "Picape", 
    fabricante: "FoccusCars",
    cor: "Vermelho",
    placa: "JKL3456",
    portas: 4,
    transmissao: "Automática",
    imagens: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
]

const modelos = ["Sedan", "SUV", "Hatch", "Picape"]

export default function InventoryPage() {
  const [busca, setBusca] = useState("")
  const [anoMin, setAnoMin] = useState("")
  const [anoMax, setAnoMax] = useState("")
  const [valorMin, setValorMin] = useState("")
  const [valorMax, setValorMax] = useState("")
  const [modelosSelecionados, setModelosSelecionados] = useState<string[]>([])
  const [carroSelecionado, setCarroSelecionado] = useState<typeof carros[0] | null>(null)

  const carrosFiltrados = carros.filter(carro => 
    carro.nome.toLowerCase().includes(busca.toLowerCase()) &&
    (anoMin === "" || carro.ano >= parseInt(anoMin)) &&
    (anoMax === "" || carro.ano <= parseInt(anoMax)) &&
    (valorMin === "" || carro.preco >= parseInt(valorMin)) &&
    (valorMax === "" || carro.preco <= parseInt(valorMax)) &&
    (modelosSelecionados.length === 0 || modelosSelecionados.includes(carro.modelo))
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Catálogo de Veículos</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4 space-y-6">
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
              <h2 className="text-lg font-semibold mb-2">Modelos</h2>
              {modelos.map((modelo) => (
                <div key={modelo} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={modelo}
                    checked={modelosSelecionados.includes(modelo)}
                    onCheckedChange={(checked) => {
                      setModelosSelecionados(
                        checked
                          ? [...modelosSelecionados, modelo]
                          : modelosSelecionados.filter((m) => m !== modelo)
                      )
                    }}
                  />
                  <label
                    htmlFor={modelo}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {modelo}
                  </label>
                </div>
              ))}
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

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carrosFiltrados.map(carro => (
                <Card key={carro.id}>
                  <CardHeader>
                    <CardTitle>{carro.nome}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={carro.imagens[0]}
                      alt={carro.nome}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <p className="text-2xl font-bold">R$ {carro.preco.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 capitalize">{carro.categoria}</p>
                    <p className="text-sm text-gray-500">Ano: {carro.ano}</p>
                    <p className="text-sm text-gray-500">Modelo: {carro.modelo}</p>
                  </CardContent>
                  <CardFooter>
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

