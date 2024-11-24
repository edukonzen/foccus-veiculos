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

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const allCars = [
    { title: "Luxury Sedan", description: "Elegant and comfortable, perfect for long drives.", category: "sedan" },
    { title: "Sports Car", description: "High-performance vehicle for thrill-seekers.", category: "sports" },
    { title: "Electric SUV", description: "Eco-friendly and spacious for family adventures.", category: "suv" },
    { title: "Compact Hatchback", description: "Efficient and easy to maneuver in city traffic.", category: "hatchback" },
    { title: "Off-road 4x4", description: "Rugged and capable for all your adventures.", category: "suv" },
    { title: "Family Minivan", description: "Spacious and versatile for growing families.", category: "minivan" },
    { title: "Executive Sedan", description: "Refined luxury for business and pleasure.", category: "sedan" },
    { title: "Electric Compact", description: "Eco-friendly city car for urban commuters.", category: "electric" },
    { title: "Luxury SUV", description: "Premium comfort with off-road capabilities.", category: "suv" },
    { title: "Performance EV", description: "Electric power meets sports car performance.", category: "electric" },
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
                    <SelectValue placeholder="Selecione uma categoria">
                      {categoryOptions.find(option => option.value === selectedCategory)?.label}
                    </SelectValue>
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
      </main>
      <Footer />
    </div>
  )
}

