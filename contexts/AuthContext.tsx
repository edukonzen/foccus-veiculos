'use client'

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { resetSessionTimeout, clearSessionTimeout } from '@/utils/sessionManager';

interface User {
  id: string
  name: string
  email: string
  accessLevel: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
    clearSessionTimeout();
    router.push('/')
  }, [router]);

  const handleActivity = useCallback(() => {
    if (user) {
      resetSessionTimeout(logout);
    }
  }, [user, logout]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      resetSessionTimeout(logout);
    }
  }, [logout]);

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearSessionTimeout();
    };
  }, [handleActivity]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      resetSessionTimeout(logout);
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

