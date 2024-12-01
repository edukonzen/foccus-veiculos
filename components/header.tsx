'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, User, Menu } from 'lucide-react'
import Image from 'next/image'

const NAV_ITEMS = [
  { href: "/home", label: "Início" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/financing", label: "Financiamento" },
  { href: "/about", label: "Sobre Nós" },
  { href: "/contact", label: "Contato" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])
  const toggleSearch = useCallback(() => setIsSearchOpen(prev => !prev), [])

  const NavLinks = useCallback(() => (
    <>
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>
          <div className="relative px-4 py-2 group rounded-md overflow-hidden">
            <span className="relative z-10 text-sm font-medium text-white transition-colors duration-300">
              {item.label}
            </span>
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      ))}
    </>
  ), [])

  const SearchForm = useCallback(() => (
    <form className="relative w-full" onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(false); }}>
      <Input
        className="pl-8 pr-2 py-1 rounded-full w-full bg-white text-black transition-all focus:ring-2 focus:ring-white"
        placeholder="Buscar carros..."
        type="search"
        aria-label="Buscar carros"
      />
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600" aria-hidden="true" />
    </form>
  ), [])

  const MobileNav = useCallback(() => (
    <div className="md:hidden flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSearch} 
        aria-label="Abrir busca" 
        className="text-white hover:bg-white/20 hover:backdrop-blur-sm transition-all"
      >
        <Search className="h-6 w-6" />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Abrir menu" 
            className="text-white hover:bg-white/20 hover:backdrop-blur-sm transition-all ml-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[280px] sm:w-[350px] bg-white p-6 transition-transform duration-300 ease-in-out"
        >
          <nav className="flex flex-col space-y-6 mt-12">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  className="text-lg font-medium w-full justify-start text-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="w-full text-black border-black hover:bg-black hover:text-white transition-all duration-200" 
              onClick={() => setIsOpen(false)}
            >
              <User className="h-5 w-5 mr-2" />
              Login / Registro
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  ), [isOpen, toggleMenu, toggleSearch])

  return (
    <header className="w-full border-b border-gray-800 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center justify-center">
            <Image 
              src="/icons/foccus-veiculos-foto.png" 
              alt="Foccus Veículos Logo" 
              width={142} 
              height={80} 
              className="h-20 w-36" 
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            <NavLinks />
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-64">
              <SearchForm />
            </div>
            <div className="relative group rounded-md overflow-hidden">
              <Link href="/auth">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Perfil do usuário" 
                  className="relative z-10 text-white transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
          <MobileNav />
        </div>
        {isSearchOpen && (
          <div className="md:hidden py-2">
            <SearchForm />
          </div>
        )}
      </div>

      <style jsx global>{`
        .sheet-close {
          position: absolute !important;
          right: 1rem !important;
          top: 1rem !important;
          height: 32px !important;
          width: 32px !important;
          padding: 0 !important;
          transition: all 0.2s ease-in-out !important;
        }
        .sheet-close:hover {
          background-color: #000 !important;
          color: #fff !important;
        }
        .sheet-close > svg {
          height: 24px !important;
          width: 24px !important;
        }
      `}</style>
    </header>
  )
}

