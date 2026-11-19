import { z } from 'zod'
import { supabase } from '../lib/supabase'

const contactSchema = z.object({
  sender_name: z.string().trim().min(2).max(100),
  sender_email: z.string().trim().email().max(254),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10).max(5000),
})

export type ContactSubmission = z.infer<typeof contactSchema>

export async function submitContactMessage(input: ContactSubmission) {
  const validated = contactSchema.safeParse(input)

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message ?? 'Please check your information.',
    }
  }

  if (!supabase) {
    return { success: false, error: 'Contact service is not connected yet.' }
  }

  const result = await supabase.from('contact_messages').insert({
    sender_name: validated.data.sender_name,
    sender_email: validated.data.sender_email,
    subject: validated.data.subject || null,
    message: validated.data.message,
  })

  if (result.error) {
    return { success: false, error: 'Your message could not be sent.' }
  }

  return { success: true, error: null }
}
