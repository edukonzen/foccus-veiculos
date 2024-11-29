'use client'

import { useState } from "react"
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

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allCars = [
    { title: "Sedan de Luxo", description: "Elegante e confortável, perfeito para longas viagens.", category: "sedan" },
    { title: "Carro Esportivo", description: "Veículo de alto desempenho para os amantes de adrenalina.", category: "sports" },
    { title: "SUV Elétrico", description: "Ecológico e espaçoso para aventuras em família.", category: "suv" },
    { title: "Hatchback Compacto", description: "Eficiente e fácil de manobrar no trânsito da cidade.", category: "hatchback" },
    { title: "4x4 Off-road", description: "Robusto e capaz para todas as suas aventuras.", category: "suv" },
    { title: "Minivan Familiar", description: "Espaçoso e versátil para famílias em crescimento.", category: "minivan" },
    { title: "Sedan Executivo", description: "Luxo refinado para negócios e prazer.", category: "sedan" },
    { title: "Compacto Elétrico", description: "Carro ecológico para commuters urbanos.", category: "electric" },
    { title: "SUV de Luxo", description: "Conforto premium com capacidades off-road.", category: "suv" },
    { title: "EV de Performance", description: "Potência elétrica encontra desempenho de carro esportivo.", category: "electric" },
  ]

  const filteredCars = selectedCategory === "all"
    ? allCars
    : allCars.filter(car => car.category === selectedCategory)

  const categoryOptions = [
    { value: "all", label: "Todas as Categorias" },
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "sports", label: "Esportivo" },
    { value: "electric", label: "Elétrico" },
    { value: "hatchback", label: "Hatchback" },
    { value: "minivan", label: "Minivan" },
  ]

  const financingPartners = [
    { name: "Banco Auto", logo: "/placeholder.svg", description: "Financiamento flexível para todos os modelos" },
    { name: "Crédito Fácil", logo: "/placeholder.svg", description: "Aprovação rápida e taxas competitivas" },
    { name: "Leasing Premium", logo: "/placeholder.svg", description: "Opções de leasing para carros de luxo" },
    { name: "Financia Tudo", logo: "/placeholder.svg", description: "Soluções personalizadas de financiamento" },
  ]

  const carCarouselItems = filteredCars.map(car => ({
    title: car.title,
    description: car.description,
    imageSrc: "/placeholder.svg",
    buttonText: "Saiba Mais"
  }))

  const partnerCarouselItems = financingPartners.map(partner => ({
    title: partner.name,
    description: partner.description,
    imageSrc: partner.logo,
    buttonText: "Ver Opções",
    buttonVariant: "outline" as const
  }))

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

