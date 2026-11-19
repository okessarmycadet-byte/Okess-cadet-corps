export type PublishStatus = 'draft' | 'published' | 'archived'

export type VerificationStatus =
  | 'submitted'
  | 'awaiting_verification'
  | 'verified'
  | 'unverified'
  | 'disputed'

export type AdminRole =
  | 'super_admin'
  | 'administrator'
  | 'editor'
  | 'media_officer'
  | 'historian'
  | 'viewer'

export interface Generation {
  id: string
  name: string
  start_year: number | null
  end_year: number | null
  description: string | null
  cover_image: string | null
  status: PublishStatus
}

export interface CorpsMemory {
  id: string
  title: string
  slug: string | null
  content: string
  excerpt: string | null
  author_name: string | null
  generation_id: string | null
  memory_date: string | null
  category: string | null
  tags: string[]
  cover_image: string | null
  featured: boolean
  verification_status: VerificationStatus
  status: PublishStatus
  published_at: string | null
  created_at: string
}

export interface CorpsEvent {
  id: string
  title: string
  description: string | null
  event_type: string | null
  location: string | null
  start_date: string | null
  end_date: string | null
  cover_image: string | null
  status: PublishStatus
}

export interface CorpsLeader {
  id: string
  full_name: string
  position: string
  generation_id: string | null
  start_date: string | null
  end_date: string | null
  biography: string | null
  photo_url: string | null
  status: PublishStatus
  verification_status: VerificationStatus
}

export interface CorpsHonour {
  id: string
  recipient_name: string
  title: string
  description: string | null
  award_date: string | null
  generation_id: string | null
  image_url: string | null
  verification_status: VerificationStatus
  status: PublishStatus
}

export interface DonationRecord {
  id: string
  donor_name: string | null
  donor_email: string | null
  anonymous: boolean
  amount: number
  currency: string
  provider: string
  provider_reference: string
  provider_transaction_id: string | null
  payment_channel: string | null
  payment_status: 'pending' | 'success' | 'failed' | 'abandoned' | 'refunded'
  paid_at: string | null
  verified_at: string | null
  created_at: string
}

export interface AdminNotification {
  id: string
  title: string
  message: string
  notification_type: string
  related_record_id: string | null
  read_at: string | null
  created_at: string
}
