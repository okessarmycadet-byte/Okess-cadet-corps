import { supabase } from '../../lib/supabase'
import type { AdminNotification } from '../../types'

export async function getAdminNotifications(limit = 30) {
  if (!supabase) {
    return { data: [] as AdminNotification[], error: 'Backend unavailable.' }
  }

  const result = await supabase
    .from('admin_notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  return {
    data: (result.data ?? []) as AdminNotification[],
    error: result.error?.message ?? null,
  }
}

export async function markNotificationRead(id: string) {
  if (!supabase) throw new Error('Backend unavailable.')

  const result = await supabase
    .from('admin_notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id)

  if (result.error) throw result.error
}

export async function markAllNotificationsRead() {
  if (!supabase) throw new Error('Backend unavailable.')

  const result = await supabase
    .from('admin_notifications')
    .update({ read_at: new Date().toISOString() })
    .is('read_at', null)

  if (result.error) throw result.error
}
