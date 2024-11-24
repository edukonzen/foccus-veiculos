'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from 'next/image'
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {selectedCategory === "all" ? "Todas as Categorias" : `Carros ${categoryOptions.find(option => option.value === selectedCategory)?.label}`}
            </h2>
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl xl:max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredCars.map((car, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{car.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Image
                          alt={car.title}
                          className="w-full h-48 object-cover rounded-md"
                          height={200}
                          src="/placeholder.svg"
                          style={{
                            objectFit: "cover",
                          }}
                          width={300}
                        />
                        <p className="mt-2 text-sm text-gray-600">{car.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Saiba Mais</Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Nossos Parceiros de Financiamento
            </h2>
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-5xl xl:max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {financingPartners.map((partner, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{partner.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Image
                          alt={partner.name}
                          className="w-full h-24 object-contain rounded-md"
                          height={96}
                          src={partner.logo}
                          style={{
                            objectFit: "contain",
                          }}
                          width={200}
                        />
                        <p className="mt-2 text-sm text-gray-600">{partner.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Ver Opções</Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
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
                <Link href="/catalog">Ver Catálogo Completo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Fale com um Consultor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

