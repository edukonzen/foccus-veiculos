import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Settings } from 'lucide-react'
import { storeAddress, storeNumber1, storeNumber2 } from "@/app/contact/_components/contact";


export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/dashboard">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Settings href="/dashboard" className="mr-2 h-4 w-4" />
               Configurações
             </Button>
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Catálogo de Carros
                </Link>
              </li>
              <li>
                <Link href="/financing" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Opções de Financiamento
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="text-sm text-gray-600 not-italic">
              <p>{storeAddress}</p>
              <p className="mt-2">
                <a href={`tel:${storeNumber1},${storeNumber2}`} className="hover:text-primary transition-colors">
                  {storeNumber1} / {storeNumber2}
                </a>
              </p>
              <p>
                <a href="mailto:contato@foccuscars.com" className="hover:text-primary transition-colors">
                  contato@foccuscars.com
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-2">
              Fique por dentro das novidades e ofertas especiais!
            </p>
            <form className="space-y-2">
              <Input
                className="w-full"
                placeholder="Seu e-mail"
                type="email"
                required
              />
              <Button type="submit" className="w-full">
                Inscrever-se
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; 2024 FoccusCars. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

