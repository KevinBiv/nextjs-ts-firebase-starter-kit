import {
  GoogleAuthProvider,
  OAuthCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import { auth } from '../config/firebase'

export const authService = {
  signInWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, provider)

      const credential: OAuthCredential | null =
        GoogleAuthProvider.credentialFromResult(response)

      return {
        success: true,
        token: credential?.accessToken,
        user: response.user
      }
    } catch (error: any) {
      if (error) {
        return {
          error: true,
          errorCode: error?.code,
          errorMessage: error?.message,
          email: error?.email,
          credential: GoogleAuthProvider.credentialFromError(error)
        }
      }
    }
  },

  signInWithEmailAndPassword: async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)

      return {
        success: true,
        user: response.user
      }
    } catch (error: any) {
      if (error) {
        return {
          error: true,
          errorCode: error?.code,
          errorMessage: error?.message
        }
      }
    }
  },

  signUpWithEmailAndPassword: async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      return {
        success: true,
        user: response.user
      }
    } catch (error: any) {
      if (error) {
        return {
          error: true,
          errorCode: error?.code,
          errorMessage: error?.message
        }
      }
    }
  },

  signOut: async () => {
    try {
      await signOut(auth)

      return {
        success: true,
        message: 'Log out successful'
      }
    } catch (error: any) {
      if (error) {
        return {
          error: true,
          message: 'An error occured'
        }
      }
    }
  }
}
