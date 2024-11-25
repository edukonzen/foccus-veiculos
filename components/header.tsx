import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Car, Search, User } from 'lucide-react'

export function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="flex items-center justify-center" href="/">
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">FoccusCars</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              <Link href="/home" passHref>
                <Button variant="ghost" className="text-sm font-medium">
                  Início
                </Button>
              </Link>
              <Link href="/catalog" passHref>
                <Button variant="ghost" className="text-sm font-medium">
                  Catálogo
                </Button>
              </Link>
              <Link href="/financing" passHref>
                <Button variant="ghost" className="text-sm font-medium">
                  Financiamento
                </Button>
              </Link>
              <Link href="/about" passHref>
                <Button variant="ghost" className="text-sm font-medium">
                  Sobre Nós
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="ghost" className="text-sm font-medium">
                  Contato
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <form className="relative">
              <Input
                className="pl-8 pr-2 py-1 rounded-full"
                placeholder="Buscar carros..."
                type="search"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="sr-only">Abrir menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

