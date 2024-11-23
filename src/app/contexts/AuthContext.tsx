// app/contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  token: string | null
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initial load - check both localStorage and cookies
  useEffect(() => {
    const loadToken = () => {
      // Check localStorage first
      let storedToken = localStorage.getItem('authToken')
      
      // If not in localStorage, check cookies
      if (!storedToken) {
        storedToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('auth-token='))
          ?.split('=')[1] || null
          
        // If found in cookies but not in localStorage, sync it to localStorage
        if (storedToken) {
          console.log('Token found in cookies, syncing to localStorage')
          localStorage.setItem('authToken', storedToken)
        }
      }
      
      setToken(storedToken)
      setIsLoading(false)
    }

    loadToken()
  }, [])

  // Navigation effect
  useEffect(() => {
    if (!isLoading) {
      if (token && pathname === '/login') {
        router.replace('/dashboard')
      }
      else if (!token && pathname !== '/login' && pathname !== '/signup') {
        router.replace('/login')
      }
    }
  }, [token, pathname, isLoading, router])

  const handleSetToken = (newToken: string | null) => {
    console.log('Setting new token:', newToken ? 'token present' : 'token cleared')
    
    if (newToken) {
      // Set in all storage locations
      localStorage.setItem('authToken', newToken)
      document.cookie = `auth-token=${newToken}; path=/; max-age=86400` // 24 hours
      setToken(newToken)
    } else {
      // Clear from all storage locations
      localStorage.removeItem('authToken')
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      setToken(null)
    }
  }

  const logout = () => {
    console.log('Logging out')
    handleSetToken(null)
    router.replace('/login')
  }

  // For debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Auth state changed:', {
        token: token ? 'present' : 'null',
        localStorage: localStorage.getItem('authToken') ? 'present' : 'null',
        cookies: document.cookie.includes('auth-token=') ? 'present' : 'null'
      })
    }
  }, [token])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}