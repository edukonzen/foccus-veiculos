import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"

interface CarDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  car: {
    id: number
    nome: string
    preco: number
    categoria: string
    ano: number
    modelo: string
    fabricante: string
    cor: string
    placa: string
    portas: number
    transmissao: string
    imagens: string[]
  }
}

export function CarDetailsModal({ isOpen, onClose, car }: CarDetailsModalProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      const nextButton = document.querySelector('[data-carousel-next]') as HTMLButtonElement;
      if (nextButton) {
        nextButton.click();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 flex flex-col">
        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{car.nome}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <Carousel className="w-full" opts={{ loop: true }} plugins={[
                Autoplay({ delay: 6500 })
              ]}>
                <CarouselContent>
                  {car.imagens.map((imagem, index) => (
                    <CarouselItem key={index}>
                      <div className="flex aspect-video items-center justify-center p-1">
                        <Image src={imagem} alt={`${car.nome} - Imagem ${index + 1}`} width={600} height={400} className="w-full object-cover rounded-lg" />
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
                    <p className="text-lg">{car.modelo}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Ano:</p>
                    <p className="text-lg">{car.ano}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Preço:</p>
                    <p className="text-lg font-bold">R$ {car.preco.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Fabricante:</p>
                    <p className="text-lg">{car.fabricante}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Cor:</p>
                    <p className="text-lg">{car.cor}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Placa:</p>
                    <p className="text-lg">{car.placa}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Portas:</p>
                    <p className="text-lg">{car.portas}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">Transmissão:</p>
                    <p className="text-lg">{car.transmissao}</p>
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

