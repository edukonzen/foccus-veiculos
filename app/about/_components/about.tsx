import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Sobre a Car Store</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">
              Fundada em 1985, a Car Store tem sido sinônimo de excelência e confiabilidade no mercado automobilístico por quase quatro décadas. Nossa jornada começou com uma visão simples: oferecer aos nossos clientes os melhores carros e o melhor serviço possível.
            </p>
            <p className="mb-4">
              Ao longo dos anos, expandimos nossa oferta de veículos para incluir uma ampla gama de marcas e modelos, desde carros econômicos até veículos de luxo. Nossa equipe de especialistas apaixonados por automóveis está sempre pronta para ajudar você a encontrar o carro perfeito para suas necessidades.
            </p>
            <p>
              Na Car Store, não vendemos apenas carros - construímos relacionamentos. Muitos de nossos clientes estão conosco há gerações, confiando em nós para todas as suas necessidades automotivas.
            </p>
          </div>
          <div className="space-y-4">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Showroom da Car Store"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Equipe da Car Store"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Integridade em todas as nossas interações</li>
            <li>Excelência no atendimento ao cliente</li>
            <li>Compromisso com a qualidade dos veículos</li>
            <li>Inovação contínua em nossos serviços</li>
            <li>Responsabilidade social e ambiental</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
