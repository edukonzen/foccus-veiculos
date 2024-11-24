'use client'

import { useState } from 'react'
//import { DollarSign, Settings, User, ChevronDown, LogOut, BookOpen, Users, Plus, Search, Edit, Trash2, FileText } from 'lucide-react'
import { DollarSign, Settings, User, ChevronDown, LogOut, BookOpen, Users} from 'lucide-react'
import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
//import { Label } from "@/components/ui/label"
//import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
//import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RegisteredCars } from './registered-cars'
import { UserSettings } from './user-settings'
import { Customers } from './customers'
import { FinancingProposals } from './financing-proposals'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Customer {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
  cpf: string
}

export default function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('catalog-cars')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const menuItems = [
    { id: 'catalog-cars', name: 'Catalog Cars', icon: BookOpen },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'financing-proposals', name: 'Financing Proposals', icon: DollarSign },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: Settings,
      subItems: [
        { id: 'settings-user', name: 'User', icon: User }
      ]
    },
  ]

  const renderContent = () => {
    switch (selectedItem) {
      case 'catalog-cars':
        return <RegisteredCars />
      case 'customers':
        return <Customers />
      case 'financing-proposals':
        return <FinancingProposals />
      case 'settings':
        return <h2 className="text-2xl font-bold">General Settings</h2>
      case 'settings-user':
        return <UserSettings />
      default:
        return <h2 className="text-2xl font-bold">Select an option</h2>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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
            <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => alert('Logout clicked')}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
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

