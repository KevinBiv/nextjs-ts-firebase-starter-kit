import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { authService } from '../services/auth'

interface UserType {
  email: string | null
  uid: string | null
}

interface AuthContextProviderType {
  children: React.ReactNode
}

const AuthContext = createContext({})

export const useAuth = () => useContext<any>(AuthContext)

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null })
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid
        })
      } else {
        setUser({ email: null, uid: null })
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logoutHandler = async () => {
    const result = await authService.signOut()

    console.log('result =>', result)

    if (result?.success) {
      // Login the user
      router.push('/signin')
    }

    if (result?.error) {
      // Do something
    }
  }

  const value = { user, loading, logoutHandler }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
