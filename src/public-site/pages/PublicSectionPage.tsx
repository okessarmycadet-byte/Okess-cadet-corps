import { useParams } from 'react-router-dom'
import SectionShell from '../../components/shared/SectionShell'
import EmptyState from '../../components/shared/EmptyState'

const sectionContent: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About the Corps',
    description: 'Discover the purpose, identity, values and role of the OKESS Army Cadet Corps.',
  },
  history: {
    title: 'History & Heritage',
    description: 'Explore the history of the Corps through records, photographs, accounts and verified historical submissions.',
  },
  generations: {
    title: 'Corps Generations',
    description: 'A place to recognise generations of cadets, their experiences and their contributions.',
  },
  leadership: {
    title: 'Leadership',
    description: 'Recognising current and former leaders who have served and guided the Corps.',
  },
  honours: {
    title: 'Hall of Honour',
    description: 'Celebrating verified achievements, recognition and distinguished contributions.',
  },
  gallery: {
    title: 'Corps Gallery',
    description: 'Photographs, videos, ceremonies, activities and moments from Corps life.',
  },
  events: {
    title: 'Events & Activities',
    description: 'A record of activities, programmes, events and important occasions.',
  },
  memories: {
    title: 'Corps Memories',
    description: 'Stories, experiences, reflections and memories shared across generations.',
  },
  archives: {
    title: 'Archives & Research',
    description: 'Search and explore the records, people, events and heritage of the Corps.',
  },
  contact: {
    title: 'Contact the Corps',
    description: 'Get in touch with the OKESS Army Cadet Corps.',
  },
}

export default function PublicSectionPage() {
  const { section } = useParams()
  const content = sectionContent[section ?? ''] ?? {
    title: 'Corps',
    description: 'Explore the OKESS Army Cadet Corps.',
  }

  return (
    <SectionShell
      eyebrow="OKESS ARMY CADET CORPS"
      title={content.title}
      description={content.description}
    >
      <EmptyState
        title="Our records are being organised"
        description="This section is being prepared for verified Corps information, photographs and records."
      />
    </SectionShell>
  )
}
