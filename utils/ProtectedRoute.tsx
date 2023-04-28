import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'

interface ProtectedRouteType {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteType) => {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user.uid) {
      router.push('/signin')
    }
  }, [loading, router, user])

  //TODO: Fix glitch

  if (loading) {
    //TODO: Add actual Loader component
    return <div>Loading...</div>
  }

  if (!user.uid) return null

  return <>{children}</>
}

export default ProtectedRoute
