import { supabase } from '../../lib/supabase'
import type { DonationRecord } from '../../types'

export interface DonationReport {
  transactions: DonationRecord[]
  successfulTotal: number
  successfulCount: number
  pendingCount: number
  failedCount: number
  refundedCount: number
}

export async function getDonationReport(
  startDate?: string,
  endDate?: string,
): Promise<DonationReport> {
  const empty: DonationReport = {
    transactions: [],
    successfulTotal: 0,
    successfulCount: 0,
    pendingCount: 0,
    failedCount: 0,
    refundedCount: 0,
  }

  if (!supabase) return empty

  let query = supabase
    .from('donations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000)

  if (startDate) query = query.gte('created_at', startDate)
  if (endDate) query = query.lte('created_at', endDate)

  const { data, error } = await query

  if (error) throw new Error('Unable to load financial records.')

  const transactions = (data ?? []) as DonationRecord[]

  const successful = transactions.filter(
    item => item.payment_status === 'success',
  )

  return {
    transactions,
    successfulTotal: successful.reduce((sum, item) => sum + Number(item.amount), 0),
    successfulCount: successful.length,
    pendingCount: transactions.filter(item => item.payment_status === 'pending').length,
    failedCount: transactions.filter(item => item.payment_status === 'failed').length,
    refundedCount: transactions.filter(item => item.payment_status === 'refunded').length,
  }
}
