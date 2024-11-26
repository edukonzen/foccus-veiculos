'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, User, Menu } from 'lucide-react'
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const navItems = [
    { href: "/home", label: "Início" },
    { href: "/catalog", label: "Catálogo" },
    { href: "/financing", label: "Financiamento" },
    { href: "/about", label: "Sobre Nós" },
    { href: "/contact", label: "Contato" },
  ]

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} passHref>
          <Button variant="ghost" className="text-sm font-medium w-full justify-start hover:bg-gray-800 hover:text-white" onClick={() => setIsOpen(false)}>
            {item.label}
          </Button>
        </Link>
      ))}
    </>
  )

  const SearchForm = () => (
    <form className="relative w-full" onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(false); }}>
      <Input
        className="pl-8 pr-2 py-1 rounded-full w-full bg-gray-800 text-white placeholder-gray-400 border-gray-700"
        placeholder="Buscar carros..."
        type="search"
      />
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </form>
  )

  return (
    <header className="w-full bg-black text-white">
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
            <Button variant="ghost" size="icon" className="hover:bg-gray-800">
              <User className="h-5 w-5 text-white" />
              <span className="sr-only">Perfil</span>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="hover:bg-gray-800">
              <Search className="h-5 w-5 text-white" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleMenu} className="hover:bg-gray-800">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black text-white">
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavLinks />
                  <Button variant="outline" className="w-full text-white hover:bg-gray-800" onClick={() => setIsOpen(false)}>
                    <User className="h-5 w-5 mr-2 text-white" />
                    Login / Registro
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {isSearchOpen && (
          <div className="md:hidden py-2">
            <SearchForm />
          </div>
        )}
      </div>
    </header>
  )
}

