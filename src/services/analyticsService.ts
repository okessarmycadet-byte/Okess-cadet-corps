import { supabase } from '../lib/supabase'

const allowedEvents = new Set([
  'page_view',
  'archive_search',
  'memory_view',
  'event_view',
  'album_view',
  'donation_page_view',
])

export async function trackSiteEvent(
  eventName: string,
  pagePath?: string,
  metadata: Record<string, unknown> = {},
) {
  if (!supabase || !allowedEvents.has(eventName)) return

  // Avoid collecting sensitive data or unrestricted personal information.
  const safeMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([key]) =>
      ['content_type', 'content_id', 'category'].includes(key),
    ),
  )

  await supabase.from('site_analytics').insert({
    event_name: eventName,
    page_path: pagePath?.slice(0, 300) ?? null,
    event_metadata: safeMetadata,
  })
}
