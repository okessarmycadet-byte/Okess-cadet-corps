import { supabase } from '../lib/supabase'

export type ArchiveResultType =
  | 'memory'
  | 'history'
  | 'event'
  | 'generation'
  | 'honour'
  | 'leader'

export interface ArchiveSearchResult {
  id: string
  type: ArchiveResultType
  title: string
  description: string
  date: string | null
  href: string
}

export async function searchCorpsArchive(term: string): Promise<{
  data: ArchiveSearchResult[]
  error: string | null
}> {
  if (!supabase) return { data: [], error: 'Archive database is not connected.' }

  const query = term.trim()

  if (query.length < 2) return { data: [], error: null }

  const [
    memories,
    history,
    events,
    generations,
    honours,
    leaders,
  ] = await Promise.all([
    supabase.from('memories').select('id,title,excerpt,memory_date').eq('status', 'published').eq('verification_status', 'verified').ilike('title', `%${query}%`).limit(10),
    supabase.from('history_records').select('id,title,event_date,era').eq('status', 'published').eq('verification_status', 'verified').ilike('title', `%${query}%`).limit(10),
    supabase.from('events').select('id,title,description,start_date').eq('status', 'published').ilike('title', `%${query}%`).limit(10),
    supabase.from('generations').select('id,name,description,start_year,end_year').eq('status', 'published').ilike('name', `%${query}%`).limit(10),
    supabase.from('honours').select('id,title,recipient_name,award_date').eq('status', 'published').eq('verification_status', 'verified').ilike('recipient_name', `%${query}%`).limit(10),
    supabase.from('leadership').select('id,full_name,position,start_date').eq('status', 'published').eq('verification_status', 'verified').ilike('full_name', `%${query}%`).limit(10),
  ])

  const errors = [memories, history, events, generations, honours, leaders]
    .map(result => result.error?.message)
    .filter(Boolean)

  const results: ArchiveSearchResult[] = [
    ...(memories.data ?? []).map(row => ({
      id: row.id,
      type: 'memory' as const,
      title: row.title,
      description: row.excerpt ?? 'Corps memory',
      date: row.memory_date,
      href: `/memories/${row.id}`,
    })),
    ...(history.data ?? []).map(row => ({
      id: row.id,
      type: 'history' as const,
      title: row.title,
      description: row.era ?? 'Historical record',
      date: row.event_date,
      href: `/history/${row.id}`,
    })),
    ...(events.data ?? []).map(row => ({
      id: row.id,
      type: 'event' as const,
      title: row.title,
      description: row.description ?? 'Corps event',
      date: row.start_date,
      href: `/events/${row.id}`,
    })),
    ...(generations.data ?? []).map(row => ({
      id: row.id,
      type: 'generation' as const,
      title: row.name,
      description: row.description ?? 'Corps generation',
      date: row.start_year ? String(row.start_year) : null,
      href: `/generations/${row.id}`,
    })),
    ...(honours.data ?? []).map(row => ({
      id: row.id,
      type: 'honour' as const,
      title: row.title,
      description: row.recipient_name,
      date: row.award_date,
      href: `/honours/${row.id}`,
    })),
    ...(leaders.data ?? []).map(row => ({
      id: row.id,
      type: 'leader' as const,
      title: row.full_name,
      description: row.position,
      date: row.start_date,
      href: `/leadership/${row.id}`,
    })),
  ]

  results.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

  return { data: results, error: errors.length ? errors.join('; ') : null }
}
