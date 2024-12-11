import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useRef, useState } from "react"

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

interface CarDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  car: Car
}

export function CarDetailsModal({ isOpen, onClose, car }: CarDetailsModalProps) {
  const [api, setApi] = useState<CarouselApi>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) return

    const autoAdvance = () => {
      api.scrollNext()
    }

    intervalRef.current = setInterval(autoAdvance, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 flex flex-col">
        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{car.manufacturer} {car.model}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <Carousel className="w-full" setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                  {car.photos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="flex aspect-video items-center justify-center p-1">
                        <Image src={photo.url || "/placeholder.svg"} alt={`${car.manufacturer} ${car.model} - Imagem ${index + 1}`} width={600} height={400} className="w-full object-cover rounded-lg" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
              <Card>
                <CardContent className="grid grid-cols-2 gap-4 p-6">
                  <div>
                    <p className="font-semibold text-gray-600">Modelo:</p>
                    <p className="text-lg">{car.model}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Fabricante:</p>
                    <p className="text-lg">{car.manufacturer}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Ano:</p>
                    <p className="text-lg">{car.year}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Preço:</p>
                    <p className="text-lg font-bold">R$ {car.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Cor:</p>
                    <p className="text-lg">{car.color}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Placa:</p>
                    <p className="text-lg">{car.licensePlate}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Portas:</p>
                    <p className="text-lg">{car.doors}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Transmissão:</p>
                    <p className="text-lg">{car.transmission}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Categoria:</p>
                    <p className="text-lg">{car.category}</p>
                  </div>
                </CardContent>
              </Card>
              <div className="text-center text-sm text-gray-600 mt-4">
                Role para baixo para ver mais detalhes
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

