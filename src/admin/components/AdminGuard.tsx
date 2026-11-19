import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { getCurrentAdmin } from '../services/authService'
import type { AdminProfile } from '../services/authService'

export default function AdminGuard() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    async function checkAccess() {
      try {
        const result = await getCurrentAdmin()
        if (alive) setProfile(result)
      } catch {
        if (alive) setProfile(null)
      } finally {
        if (alive) setLoading(false)
      }
    }

    checkAccess()

    const { data } = supabase?.auth.onAuthStateChange(() => {
      checkAccess()
    }) ?? { data: { subscription: null } }

    return () => {
      alive = false
      data.subscription?.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div className="loading-state">Checking administrator access…</div>
  }

  if (!profile || !profile.active) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
