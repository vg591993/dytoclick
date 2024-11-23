// app/login/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from './login-form'

export default async function LoginPage() {
  // Server-side check for token
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')
  
  if (token) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}

// document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
