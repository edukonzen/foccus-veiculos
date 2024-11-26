'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin } from 'lucide-react'

const storeInfo = {
  address: "AV. SÃO BORJA, 232 RIO BRANCO - SÃO LEOPOLDO/RS",
  number1: "(51) 98144-4422",
  number2: "(51) 98186-0421",
  email: "contato@carstore.com"
};

export const { address: storeAddress, number1: storeNumber1, number2: storeNumber2, email: storeEmail } = storeInfo;

export default function ContatoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Entre em Contato</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Estamos aqui para ajudar! Se você tiver alguma dúvida sobre nossos veículos, serviços ou precisar de assistência, não hesite em entrar em contato conosco.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="mr-2" />
                <span>{storeNumber1} / {storeNumber2}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2" />
                <span>{ storeEmail }</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <span>{storeAddress}</span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <Button className="w-full" onClick={() => window.open('https://wa.me/5551981444422', '_blank')}>
                Fale conosco pelo WhatsApp
              </Button>
              <Button className="w-full" variant="outline" onClick={() => window.location.href = 'mailto:contato@carstore.com'}>
                Envie-nos um e-mail
              </Button>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Nome</label>
                <input type="text" id="name" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">E-mail</label>
                <input type="email" id="email" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">Mensagem</label>
                <textarea id="message" rows={4} className="w-full p-2 border rounded" required></textarea>
              </div>
              <Button type="submit" className="w-full">Enviar Mensagem</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
