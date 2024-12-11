'use client'

import { useState } from 'react'
import { DollarSign, Settings, User, ChevronDown, LogOut, Users, Car } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RegisteredCars } from './registered-cars'
import { UserSettings } from './user-settings'
import { Customers } from './customers'
import { FinancingProposals } from './financing-proposals'
import { FinancingSettings } from './financing-settings'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('carros-cadastrados')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const menuItems = [
    { id: 'carros-cadastrados', name: 'Carros Cadastrados', icon: Car },
    { id: 'clientes', name: 'Clientes', icon: Users },
    { id: 'propostas-financiamento', name: 'Propostas de Financiamento', icon: DollarSign },
    { 
      id: 'configuracoes', 
      name: 'Configurações', 
      icon: Settings,
      subItems: [
        { id: 'configuracoes-usuario', name: 'Usuário', icon: User },
        { id: 'configuracoes-financiamento', name: 'Financiamento', icon: DollarSign }
      ]
    },
  ]

  const renderContent = () => {
    switch (selectedItem) {
      case 'carros-cadastrados':
        return <RegisteredCars />
      case 'clientes':
        return <Customers />
      case 'propostas-financiamento':
        return <FinancingProposals />
      case 'configuracoes-financiamento':
        return <FinancingSettings />
      case 'configuracoes':
        return <h2 className="text-2xl font-bold">Configurações Gerais</h2>
      case 'configuracoes-usuario':
        return <UserSettings />
      default:
        return <h2 className="text-2xl font-bold">Selecione uma opção</h2>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Painel de Controle</h1>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.subItems ? (
                  <Collapsible 
                    open={isSettingsOpen}
                    onOpenChange={setIsSettingsOpen}
                  >
                    <CollapsibleTrigger className="flex items-center w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => setSelectedItem(subItem.id)}
                          className={`flex items-center w-full px-4 py-2 text-left pl-12 ${
                            selectedItem === subItem.id ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <subItem.icon className="w-5 h-5 mr-3" />
                          {subItem.name}
                        </button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <button
                    onClick={() => setSelectedItem(item.id)}
                    className={`flex items-center w-full px-4 py-2 text-left ${
                      selectedItem === item.id ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>
          <div className="absolute bottom-0 w-64 p-4">
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => alert('Logout clicado')}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

