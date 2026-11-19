import { supabase } from '../lib/supabase'
import type { CorpsMemory } from '../types'

export async function getPublishedMemories(limit = 20) {
  if (!supabase) return { data: [] as CorpsMemory[], error: 'Supabase is not configured.' }

  const result = await supabase
    .from('memories')
    .select('*')
    .eq('status', 'published')
    .eq('verification_status', 'verified')
    .order('memory_date', { ascending: false })
    .limit(limit)

  return { data: (result.data ?? []) as CorpsMemory[], error: result.error?.message ?? null }
}

export async function getMemoryBySlug(slug: string) {
  if (!supabase) return { data: null, error: 'Supabase is not configured.' }

  const result = await supabase
    .from('memories')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('verification_status', 'verified')
    .maybeSingle()

  return { data: result.data as CorpsMemory | null, error: result.error?.message ?? null }
}

export async function searchMemories(searchTerm: string, limit = 30) {
  if (!supabase) return { data: [] as CorpsMemory[], error: 'Supabase is not configured.' }

  const term = searchTerm.trim()
  if (!term) return getPublishedMemories(limit)

  const result = await supabase
    .from('memories')
    .select('*')
    .eq('status', 'published')
    .eq('verification_status', 'verified')
    .or(`title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`)
    .order('memory_date', { ascending: false })
    .limit(limit)

  return { data: (result.data ?? []) as CorpsMemory[], error: result.error?.message ?? null }
}
