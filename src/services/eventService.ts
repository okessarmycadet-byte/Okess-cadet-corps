import { supabase } from '../lib/supabase'
import type { CorpsEvent } from '../types'

export async function getPublishedEvents() {
  if (!supabase) return { data: [] as CorpsEvent[], error: 'Supabase is not configured.' }

  const result = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true })

  return { data: (result.data ?? []) as CorpsEvent[], error: result.error?.message ?? null }
}
