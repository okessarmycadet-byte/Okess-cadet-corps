import { supabase } from '../../lib/supabase'

export async function getContactInbox() {
  if (!supabase) return { data: [], error: 'Backend unavailable.' }

  const result = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return {
    data: result.data ?? [],
    error: result.error?.message ?? null,
  }
}

export async function updateContactMessageStatus(
  id: string,
  status: 'unread' | 'read' | 'replied' | 'archived',
) {
  if (!supabase) throw new Error('Backend unavailable.')

  const result = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', id)

  if (result.error) throw result.error
}
