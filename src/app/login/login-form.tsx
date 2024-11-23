'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {
  currentTarget: HTMLFormElement;
}

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setToken } = useAuth()

  // Clear form on mount
  useEffect(() => {
    setUsername('')
    setPassword('')
    setError(null)
  }, [])

  const handleSubmit = async (e: LoginFormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
  
    try {
      // Format credentials as username:password before encoding
      const rawCredentials = `${username}:${password}`
      // Encode the credentials string in base64
      const encodedCredentials = Buffer.from(rawCredentials).toString('base64')
      
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`
        },
        // Prevent browser's default auth popup
        credentials: 'omit'
      })
  
      if (response.ok) {
        const authToken = response.headers.get('authorization')
        
        if (authToken) {
          console.log('Login successful, setting token')
          setToken(authToken)
          router.replace('/dashboard')
        } else {
          throw new Error('No authorization token received')
        }
      } else {
        const data = await response.json()
        throw new Error(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 text-emerald-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg bg-white/50"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg bg-white/50"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="flex justify-end text-sm">
            <Link href="/forgot-password" className="text-emerald-600 hover:text-emerald-500">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/signup" className="text-emerald-600 hover:text-emerald-500">
            Sign up
          </Link>
        </div>
      </div>
    </Card>
  )
}