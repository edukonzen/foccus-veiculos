'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

export default function FinanciamentoPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const financingPartners = [
    { name: "Banco Auto", logo: "/placeholder.svg", description: "Financiamento flexível para todos os modelos" },
    { name: "Crédito Fácil", logo: "/placeholder.svg", description: "Aprovação rápida e taxas competitivas" },
    { name: "Leasing Premium", logo: "/placeholder.svg", description: "Opções de leasing para carros de luxo" },
    { name: "Financia Tudo", logo: "/placeholder.svg", description: "Soluções personalizadas de financiamento" },
  ]

  const financingPlans = [
    { id: "basico", name: "Plano Básico", description: "Financiamento padrão com taxas atrativas", rate: "A partir de 0,99% a.m." },
    { id: "flexivel", name: "Plano Flexível", description: "Parcelas adaptáveis à sua necessidade", rate: "A partir de 1,19% a.m." },
    { id: "premium", name: "Plano Premium", description: "Benefícios exclusivos para carros de luxo", rate: "A partir de 0,89% a.m." },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Opções de Financiamento
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Encontre a melhor forma de financiar o carro dos seus sonhos. Oferecemos diversas opções para atender às suas necessidades.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {financingPlans.map((plan) => (
                <Card key={plan.id} className={`${selectedPlan === plan.id ? 'border-primary' : ''}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <p className="font-semibold">{plan.rate}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selecionado" : "Selecionar"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
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
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quais documentos são necessários para o financiamento?</AccordionTrigger>
                <AccordionContent>
                  Geralmente, você precisará de documento de identidade, CPF, comprovante de renda e de residência. Documentos adicionais podem ser solicitados dependendo da instituição financeira e do valor do financiamento.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Qual é o prazo máximo para financiamento de um carro?</AccordionTrigger>
                <AccordionContent>
                  O prazo máximo pode variar, mas geralmente é possível financiar um carro em até 60 meses (5 anos). Alguns bancos podem oferecer prazos mais longos em casos específicos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>É possível fazer uma simulação de financiamento online?</AccordionTrigger>
                <AccordionContent>
                  Sim, oferecemos uma ferramenta de simulação online onde você pode inserir o valor do veículo, entrada e prazo desejados para obter uma estimativa das parcelas. Para uma cotação mais precisa, entre em contato com nossa equipe.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

