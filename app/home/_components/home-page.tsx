'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Facebook, Twitter, Instagram } from "lucide-react"
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
import Image from "next/image"

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("")

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

  const filteredCars = selectedCategory === 'allCars' || !selectedCategory
    ? allCars
    : allCars.filter(car => car.category === selectedCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Foccus Veiculos</span>
          <Car className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">Foccus Veiculos</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Inventory
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
          <Button variant="outline">Login</Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Find Your Dream Car
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Explore our wide selection of premium vehicles and drive home your perfect match today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allCars">All Categories</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="sports">Sports Car</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="minivan">Minivan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Cars` : "All Categories"}
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
                          className="rounded-md"
                          height={200}
                          src="/placeholder.svg"
                          style={{
                            width: '100%',
                          }}
                          width={300}
                        />
                        <p className="mt-2 text-sm text-gray-600">{car.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Learn More</Button>
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
      <footer className="w-full max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Car Store. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
        <div className="flex gap-4 sm:gap-6">
          <Link href="#">
            <Facebook className="h-4 w-4" />
          </Link>
          <Link href="#">
            <Twitter className="h-4 w-4" />
          </Link>
          <Link href="#">
            <Instagram className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  )
}
