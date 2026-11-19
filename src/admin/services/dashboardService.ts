import { supabase } from '../../lib/supabase'

async function countRows(
  table: string,
  filters: Array<[string, string]> = [],
) {
  if (!supabase) return null

  let query = supabase.from(table).select('*', { count: 'exact', head: true })

  for (const [column, value] of filters) {
    query = query.eq(column, value)
  }

  const { count, error } = await query

  if (error) return null

  return count ?? 0
}

export async function getDashboardMetrics() {
  if (!supabase) {
    return {
      connected: false,
      memories: null,
      generations: null,
      events: null,
      media: null,
      pendingMemories: null,
      donations: null,
    }
  }

  const [
    memories,
    generations,
    events,
    media,
    pendingMemories,
    donations,
  ] = await Promise.all([
    countRows('memories', [['status', 'published']]),
    countRows('generations', [['status', 'published']]),
    countRows('events', [['status', 'published']]),
    countRows('media_items', [['status', 'published']]),
    countRows('memories', [['verification_status', 'awaiting_verification']]),
    countRows('donations', [['payment_status', 'success']]),
  ])

  return {
    connected: true,
    memories,
    generations,
    events,
    media,
    pendingMemories,
    donations,
  }
}
