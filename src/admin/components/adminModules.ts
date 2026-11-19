import type { AdminField } from './AdminContentModule';

export const adminModules: Record<string, {
  title: string;
  description: string;
  fields: AdminField[];
}> = {
  memories: {
    title: 'Corps Memories',
    description: 'Preserve cadet stories, personal experiences and memories of the corps.',
    fields: [
      { name: 'title', label: 'Memory title', required: true },
      { name: 'name', label: 'Contributor name' },
      { name: 'generation', label: 'Generation' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'description', label: 'Memory/story', type: 'textarea', required: true }
    ]
  },

  generations: {
    title: 'Generations',
    description: 'Manage the different generations and year groups of the corps.',
    fields: [
      { name: 'title', label: 'Generation name', required: true },
      { name: 'date', label: 'Year or period' },
      { name: 'leader', label: 'Generation leader' },
      { name: 'description', label: 'Generation details', type: 'textarea' }
    ]
  },

  leadership: {
    title: 'Leadership',
    description: 'Manage current and former corps leaders and appointments.',
    fields: [
      { name: 'name', label: 'Full name', required: true },
      { name: 'title', label: 'Rank or position', required: true },
      { name: 'generation', label: 'Generation' },
      { name: 'date', label: 'Service period' },
      { name: 'description', label: 'Biography', type: 'textarea' }
    ]
  },

  events: {
    title: 'Events & Activities',
    description: 'Manage corps activities, parades, training and official events.',
    fields: [
      { name: 'title', label: 'Event title', required: true },
      { name: 'date', label: 'Event date', type: 'date', required: true },
      { name: 'location', label: 'Location' },
      { name: 'description', label: 'Event details', type: 'textarea' }
    ]
  },

  history: {
    title: 'History & Archives',
    description: 'Document the history of the corps and its historical records.',
    fields: [
      { name: 'title', label: 'Record title', required: true },
      { name: 'date', label: 'Year or date' },
      { name: 'source', label: 'Source of information' },
      { name: 'description', label: 'Historical account', type: 'textarea', required: true }
    ]
  },

  honours: {
    title: 'Hall of Honour',
    description: 'Maintain records of honours, achievements and notable service.',
    fields: [
      { name: 'name', label: 'Recipient name', required: true },
      { name: 'title', label: 'Award or honour', required: true },
      { name: 'date', label: 'Award date' },
      { name: 'description', label: 'Achievement details', type: 'textarea' }
    ]
  },

  gallery: {
    title: 'Gallery & Media',
    description: 'Manage photographs, videos and albums from corps activities.',
    fields: [
      { name: 'title', label: 'Media title', required: true },
      { name: 'type', label: 'Media type', type: 'select', options: ['Photo', 'Video', 'Album'] },
      { name: 'date', label: 'Date captured', type: 'date' },
      { name: 'description', label: 'Caption or description', type: 'textarea' }
    ]
  },

  donations: {
    title: 'Donations',
    description: 'Review contributions and donation records. Payment confirmation must be verified by the server.',
    fields: [
      { name: 'title', label: 'Donation reference', required: true },
      { name: 'name', label: 'Donor name (if available)' },
      { name: 'amount', label: 'Amount' },
      { name: 'date', label: 'Date' },
      { name: 'description', label: 'Donation notes', type: 'textarea' }
    ]
  },

  messages: {
    title: 'Messages',
    description: 'Review enquiries and messages submitted through the corps website.',
    fields: [
      { name: 'name', label: 'Sender name', required: true },
      { name: 'email', label: 'Email address' },
      { name: 'title', label: 'Subject', required: true },
      { name: 'description', label: 'Message', type: 'textarea', required: true }
    ]
  }
};
