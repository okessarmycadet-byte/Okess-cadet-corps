import { supabase } from '../../lib/supabase'
import { recordAdminAction } from './auditService'

const allowedTables = [
  'memories',
  'history_records',
  'generations',
  'leadership',
  'honours',
  'events',
  'albums',
] as const

export type ManagedTable = (typeof allowedTables)[number]

function assertTable(table: string): asserts table is ManagedTable {
  if (!allowedTables.includes(table as ManagedTable)) {
    throw new Error('Unsupported content collection.')
  }
}

export async function createContent(
  table: ManagedTable,
  content: Record<string, unknown>,
) {
  assertTable(table)

  if (!supabase) throw new Error('Backend not connected.')

  const { data, error } = await supabase
    .from(table)
    .insert(content)
    .select()
    .single()

  if (error) throw error

  await recordAdminAction({
    action: 'create_record',
    resource_type: table,
    resource_id: data.id,
  })

  return data
}

export async function updateContent(
  table: ManagedTable,
  id: string,
  content: Record<string, unknown>,
) {
  assertTable(table)

  if (!supabase) throw new Error('Backend not connected.')

  const { data, error } = await supabase
    .from(table)
    .update({ ...content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  await recordAdminAction({
    action: 'update_record',
    resource_type: table,
    resource_id: id,
  })

  return data
}

export async function changeContentStatus(
  table: ManagedTable,
  id: string,
  status: 'draft' | 'published' | 'archived',
) {
  assertTable(table)

  if (!supabase) throw new Error('Backend not connected.')

  const { error } = await supabase
    .from(table)
    .update({
      status,
      updated_at: new Date().toISOString(),
      ...(status === 'published' && table === 'memories'
        ? { published_at: new Date().toISOString() }
        : {}),
    })
    .eq('id', id)

  if (error) throw error

  await recordAdminAction({
    action: `status_${status}`,
    resource_type: table,
    resource_id: id,
  })
}
