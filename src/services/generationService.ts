import { supabase } from '../lib/supabase'
import type { Generation } from '../types'

export async function getPublishedGenerations() {
  if (!supabase) return { data: [] as Generation[], error: 'Supabase is not configured.' }

  const result = await supabase
    .from('generations')
    .select('*')
    .eq('status', 'published')
    .order('start_year', { ascending: true })

  return { data: (result.data ?? []) as Generation[], error: result.error?.message ?? null }
}
