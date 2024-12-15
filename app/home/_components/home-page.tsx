'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomCarousel } from "@/components/CustomCarousel"
import Link from 'next/link'

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

interface FinancingPartner {
  id: string
  name: string
  description: string
  logo: string
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) throw new Error('Failed to fetch cars');
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [])

  const filteredCars = selectedCategory === "all"
    ? cars
    : cars.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase())

  const categoryOptions = [
    { value: "all", label: "Todas as Categorias" },
    { value: "hatch", label: "Hatch" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "picape", label: "Picape" },
    { value: "minivan", label: "Minivan" },
    { value: "conversivel", label: "Conversível" },
    { value: "coupe", label: "Cupê" },
    { value: "esportivo", label: "Esportivo" },
    { value: "wagon", label: "Wagon (Perua)" },
    { value: "utilitario", label: "Utilitário" },
    { value: "offroad", label: "Off-Road" },
    { value: "eletrico", label: "Elétrico" },
    { value: "hibrido", label: "Híbrido" },
    { value: "compacto", label: "Compacto" },
    { value: "luxo", label: "Luxo" },
  ]

  const carCarouselItems = filteredCars.map(car => ({
    title: `${car.manufacturer} ${car.model}`,
    description: `${car.year} - ${car.transmission} - ${car.doors} portas`,
    imageSrc: car.photos[0]?.url || "/placeholder.svg",
    buttonText: "Saiba Mais"
  }))

  const mockedFinancingPartners: FinancingPartner[] = [
    {
      id: "1",
      name: "Banco Auto",
      description: "Financiamento flexível para todos os modelos",
      logo: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Crédito Fácil",
      description: "Aprovação rápida e taxas competitivas",
      logo: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Leasing Premium",
      description: "Opções de leasing para carros de luxo",
      logo: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Financia Tudo",
      description: "Soluções personalizadas de financiamento",
      logo: "/placeholder.svg"
    }
  ]

  const partnerCarouselItems = mockedFinancingPartners.map(partner => ({
    title: partner.name,
    description: partner.description,
    imageSrc: partner.logo,
    buttonText: "Ver Opções",
    buttonVariant: "outline" as const
  }))

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Encontre o Carro dos Seus Sonhos
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Explore nossa ampla seleção de veículos premium e leve para casa o seu carro perfeito hoje.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                  <SelectTrigger className="w-full bg-white text-black">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <CustomCarousel
          key={selectedCategory}
          items={carCarouselItems}
          title={selectedCategory === "all" ? "Todas as Categorias" : `Carros ${categoryOptions.find(option => option.value === selectedCategory)?.label}`}
          backgroundColor="bg-gray-100"
        />

        <CustomCarousel
          items={partnerCarouselItems}
          title="Nossos Parceiros de Financiamento"
          imageAspectRatio="16/9"
          imageHeight={96}
          titleClamp={2}
          descriptionClamp={2}
          backgroundColor="bg-white"
        />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
              Pronto para Encontrar seu Carro Ideal?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-8">
              Nossa equipe está pronta para ajudar você a encontrar o veículo perfeito e as melhores condições de financiamento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/catalogo">Ver Catálogo Completo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contato">Fale com um Consultor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

