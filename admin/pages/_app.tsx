import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user && router.pathname !== '/login') {
        router.push('/login')
      } else if (user && router.pathname === '/login') {
        router.push('/dashboard')
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (router.pathname === '/login') {
    return <>{children}</>
  }

  if (!user) {
    return null
  }

  return <Layout>{children}</Layout>
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminAuthProvider>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </AdminAuthProvider>
  )
}