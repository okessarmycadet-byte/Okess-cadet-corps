import { supabase } from '../../lib/supabase'
import type { AdminRole } from '../../types'

export interface AdminProfile {
  id: string
  full_name: string
  role: AdminRole
  active: boolean
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) throw new Error('Supabase has not been configured.')

  const result = await supabase.auth.signInWithPassword({ email, password })

  if (result.error) throw result.error

  const profile = await getAdminProfile(result.data.user.id)

  if (!profile || !profile.active) {
    await supabase.auth.signOut()
    throw new Error('This account is not authorised to access administration.')
  }

  return profile
}

export async function signOutAdmin() {
  if (!supabase) return
  const result = await supabase.auth.signOut()
  if (result.error) throw result.error
}

export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
  if (!supabase) return null

  const result = await supabase
    .from('admin_profiles')
    .select('id,full_name,role,active')
    .eq('id', userId)
    .maybeSingle()

  if (result.error) throw result.error

  return result.data as AdminProfile | null
}

export async function getCurrentAdmin() {
  if (!supabase) return null

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) return null

  return getAdminProfile(data.user.id)
}
