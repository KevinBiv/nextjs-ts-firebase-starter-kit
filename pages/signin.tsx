import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuth } from '../utils/contexts/AuthContext'

const SigninPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signInWithEmailAndPassword } = useAuth()

  const router = useRouter()

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const result = await signInWithEmailAndPassword(email, password)

    if (result?.success) {
      // Login the user
      router.push('/dashboard')
    }

    if (result?.error) {
      // Do something
      alert(result?.errorMessage)
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

          <button className="px-4 py-3 bg-green-500 w-full">Sign in</button>
        </form>

        <p className="mt-4">
          Dont have an account?{' '}
          <span
            className="hover:opacity-80 cursor-pointer"
            onClick={() => router.push('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default SigninPage
