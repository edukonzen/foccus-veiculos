import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">© 2024 Car Store. Todos os direitos reservados.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Termos de Serviço
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacidade
        </Link>
      </nav>
      <div className="flex gap-4 sm:gap-6">
        <Link href="#">
          <Facebook className="h-4 w-4" />
        </Link>
        <Link href="#">
          <Twitter className="h-4 w-4" />
        </Link>
        <Link href="#">
          <Instagram className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  )
}