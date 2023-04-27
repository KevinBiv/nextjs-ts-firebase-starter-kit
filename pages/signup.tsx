import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { authService } from '../utils/services/auth'

const SignupPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypedPassword, setRetypedPassword] = useState('')

  const router = useRouter()

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!email || !password || !retypedPassword) return

    if (password !== retypedPassword) return

    const result = await authService.signUpWithEmailAndPassword(email, password)

    console.log('result =>', result)

    if (result?.success) {
      // Login the user
      router.push('/dashboard')
    }

    if (result?.error) {
      // Do something
    }
  }

  const loginWithGoogleHandler = async () => {
    const result = await authService.signInWithGoogle()

    console.log('result =>', result)

    if (result?.success) {
      // Login the user
      router.push('/dashboard')
    }

    if (result?.error) {
      // Do something
    }
  }

  return (
    <div className="h-screen">
      <div className="container h-full grid place-items-center">
        <form className="w-[350px] space-y-4" onSubmit={onSubmitHandler}>
          <input
            className="block w-full p-4 border border-green-500"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="block w-full p-4 border border-green-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <input
            className="block w-full p-4 border border-green-500"
            type="password"
            placeholder="Retype Password"
            value={retypedPassword}
            onChange={e => setRetypedPassword(e.target.value)}
          />

          <button className="px-4 py-3 bg-green-500 w-full">Sign in</button>
        </form>

        <p className="">OR</p>

        <button onClick={loginWithGoogleHandler}>Sign in Google</button>

        <p className="mt-4">
          Have an account?{' '}
          <span
            className="hover:opacity-80 cursor-pointer"
            onClick={() => router.push('/signin')}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
