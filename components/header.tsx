import Link from "next/link"
import { Button } from "./ui/button"
import { Car } from 'lucide-react'

export function Header() {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" href="/home">
        <span className="sr-only">Car Store</span>
        <Car className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">Car Store</span>
      </Link>
      <nav className="flex items-center gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/home">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/catalog">
          Inventário
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/about">
          Sobre
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/contact">
          Contato
        </Link>
        <Button variant="outline">
          Login
        </Button>
      </nav>
    </header>
  )
}