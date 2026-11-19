import { supabase } from '../../lib/supabase'

export interface AuditEntry {
  action: string
  resource_type?: string
  resource_id?: string
  details?: Record<string, unknown>
}

export async function recordAdminAction(entry: AuditEntry) {
  if (!supabase) throw new Error('Backend unavailable.')

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError) throw userError

  const result = await supabase.from('audit_logs').insert({
    admin_id: userData.user?.id ?? null,
    action: entry.action,
    resource_type: entry.resource_type ?? null,
    resource_id: entry.resource_id ?? null,
    details: entry.details ?? {},
  })

  if (result.error) throw result.error
}
