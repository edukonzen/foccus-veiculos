'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, User, Menu } from 'lucide-react'
import Image from "next/image"
export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const navItems = [
    { href: "/home", label: "Início" },
    { href: "/catalog", label: "Catálogo" },
    { href: "/financing", label: "Financiamento" },
    { href: "/about", label: "Sobre Nós" },
    { href: "/contact", label: "Contato" },
  ]

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button 
            variant="ghost" 
            className={`text-sm font-medium ${mobile ? 'w-full justify-start py-4 text-black hover:bg-gray-100' : 'text-white hover:bg-gray-800'} transition-colors duration-200`}
            onClick={() => mobile && setIsOpen(false)}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  )

  const SearchForm = () => (
    <form className="relative w-full" onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(false); }}>
      <Input
        className="pl-10 pr-4 py-2 rounded-full w-full bg-white text-black placeholder-gray-500 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary"
        placeholder="Buscar carros..."
        type="search"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
    </form>
  )

  return (
    <header className="w-full bg-black text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link className="flex items-center justify-center" href="/">
             <Image src="/icons/foccus-veiculos-foto.png" alt="Logo" className="h-16 w-32" width={128} height={256} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              <NavLinks />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <SearchForm />
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 transition-colors duration-200">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="text-white hover:bg-gray-800 transition-colors duration-200">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 transition-colors duration-200">
                <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white p-0">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold text-black">Menu</h2>
                  </div>
                  <nav className="flex flex-col flex-grow p-4">
                    <NavLinks mobile />
                    <div className="mt-auto pt-8 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        className="w-full text-black hover:bg-gray-100 border-gray-300 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Login / Registro
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {isSearchOpen && (
          <div className="md:hidden py-4">
            <SearchForm />
          </div>
        )}
      </div>
    </header>
  )
}