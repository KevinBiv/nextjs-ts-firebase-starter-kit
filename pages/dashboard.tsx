import type { NextPage } from 'next'

import ProtectedLayout from '../components/protectedLayout'
import { useAuth } from '../utils/contexts/AuthContext'

const DashboardPage: NextPage = () => {
  const { logoutHandler } = useAuth()

  return (
    <ProtectedLayout>
      <div>Dashboard</div>

      <button className="mt-24" onClick={logoutHandler}>
        Log out
      </button>
    </ProtectedLayout>
  )
}

export default DashboardPage
