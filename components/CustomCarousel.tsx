import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import type { AutoplayOptionsType } from "embla-carousel-autoplay"
//import type { Options as AutoplayOptions } from "embla-carousel-autoplay"

interface CarouselItem {
  title: string
  description: string
  imageSrc: string
  buttonText: string
  buttonVariant?: "default" | "outline"
}

interface CustomCarouselProps {
  items: CarouselItem[]
  title: string
  imageAspectRatio?: string
  imageHeight?: number
  titleClamp?: number
  descriptionClamp?: number
  backgroundColor?: string
}

const autoplayOptions: AutoplayOptionsType = {
  delay: 5000,
  rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

export function CustomCarousel({
  items,
  title,
  imageAspectRatio = "4/3",
  //imageHeight = 200,
  titleClamp = 1,
  descriptionClamp = 3,
  backgroundColor = "bg-gray-100"
}: CustomCarouselProps) {
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${backgroundColor}`}>
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {title}
        </h2>
        <div className="relative px-4 sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay(autoplayOptions),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {items.map((item, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className={`line-clamp-${titleClamp}`}>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className={`relative mb-4 w-full`} style={{ paddingTop: `${(parseInt(imageAspectRatio.split('/')[1]) / parseInt(imageAspectRatio.split('/')[0])) * 100}%` }}>
                        <div className="absolute inset-0">
                          <Image
                            alt={item.title}
                            className="rounded-md object-cover w-full h-full"
                            src={typeof item.imageSrc === 'string' ? item.imageSrc : ''}
                            width={300}
                            height={200}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                      <p className={`text-sm text-gray-600 line-clamp-${descriptionClamp}`}>{item.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button variant={item.buttonVariant || "default"} className="w-full">{item.buttonText}</Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute -left-12 top-1/2" />
              <CarouselNext className="absolute -right-12 top-1/2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

