import { supabase } from '../../lib/supabase'

export interface InitializeDonationInput {
  amount: number
  donor_name?: string
  donor_email?: string
  anonymous: boolean
}

export interface InitializeDonationResponse {
  authorization_url: string
  reference: string
}

export async function initializeDonation(input: InitializeDonationInput) {
  if (!supabase) throw new Error('Donation service is not configured.')

  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw new Error('Enter a valid donation amount.')
  }

  if (input.amount < 1) {
    throw new Error('The minimum donation is GHS 1.')
  }

  const { data, error } = await supabase.functions.invoke(
    'initialize-donation',
    { body: input },
  )

  if (error) throw new Error('Unable to start payment. Please try again.')

  const result = data as InitializeDonationResponse

  if (!result?.authorization_url || !result?.reference) {
    throw new Error('The payment provider returned an invalid response.')
  }

  return result
}

export async function verifyDonation(reference: string) {
  if (!supabase) throw new Error('Donation service is not configured.')

  const { data, error } = await supabase.functions.invoke(
    'verify-donation',
    { body: { reference } },
  )

  if (error) throw new Error('We could not verify your payment yet.')

  return data
}
