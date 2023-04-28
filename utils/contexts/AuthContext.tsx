import { onAuthStateChanged } from 'firebase/auth'
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

    return result
  }

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    if (!email || !password) {
      return {
        error: true,
        message: 'All fields are required'
      }
    }

    const result = await authService.signInWithEmailAndPassword(email, password)

    return result
  }

  const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    retypedPassword: string
  ) => {
    if (password !== retypedPassword) {
      return {
        error: true,
        message: 'Passwords do not match'
      }
    }

    if (!email || !password || !retypedPassword) {
      return {
        error: true,
        message: 'All fields are required'
      }
    }

    const result = await authService.signUpWithEmailAndPassword(email, password)

    return result
  }

  const signInWithGoogleHandler = async () => {
    const result = await authService.signInWithGoogle()

    return result
  }

  const value = {
    user,
    loading,
    logoutHandler,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signInWithGoogleHandler
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
