import { ScenarioTemplate } from '../types'

export const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  {
    id: 'traditional-family',
    name: 'Traditional Family (Left Home at 18)',
    description: 'Lived at home until 18, then moved away for college/work. Typical visits during holidays and occasional weekends.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 12, description: 'Living at home - Daily interaction' },
      { startAge: 18, endAge: 25, hoursPerDay: 0.5, description: 'College/Early career - Holiday visits' },
      { startAge: 25, endAge: null, hoursPerDay: 0.3, description: 'Independent adult - Occasional visits' },
    ]
  },
  {
    id: 'strong-family-nearby',
    name: 'Strong Family (Living Nearby)',
    description: 'Remained close to family. Frequent visits and regular interaction throughout life.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 14, description: 'Living at home - Constant presence' },
      { startAge: 18, endAge: 25, hoursPerDay: 3, description: 'Young adult - Weekly dinners' },
      { startAge: 25, endAge: null, hoursPerDay: 2, description: 'Adult - Regular visits' },
    ]
  },
  {
    id: 'homeschool-close',
    name: 'Homeschooled (Very Close)',
    description: 'Homeschooled and lived at home through college. Exceptionally close family bond.',
    segments: [
      { startAge: 0, endAge: 22, hoursPerDay: 18, description: 'Homeschooled - Nearly constant togetherness' },
      { startAge: 22, endAge: null, hoursPerDay: 2, description: 'Adult - Maintained closeness' },
    ]
  },
  {
    id: 'distant-family',
    name: 'Distant Family',
    description: 'Limited contact. Moved far away or strained relationship.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 8, description: 'Childhood - Moderate interaction' },
      { startAge: 18, endAge: null, hoursPerDay: 0.1, description: 'Adult - Rare contact' },
    ]
  },
  {
    id: 'foster-care',
    name: 'Foster Care / Separated',
    description: 'Foster care or separated from biological parents. Minimal or no contact.',
    segments: [
      { startAge: 0, endAge: 5, hoursPerDay: 8, description: 'Early childhood' },
      { startAge: 5, endAge: null, hoursPerDay: 0, description: 'Separated - No contact' },
    ]
  },
  {
    id: 'spouse-traditional',
    name: 'Spouse (Traditional Marriage)',
    description: 'Met in mid-20s, married, living together.',
    segments: [
      { startAge: 25, endAge: null, hoursPerDay: 12, description: 'Married - Living together' },
    ]
  },
  {
    id: 'close-friend',
    name: 'Close Friend (Lifelong)',
    description: 'Best friend since childhood. Regular contact throughout life.',
    segments: [
      { startAge: 8, endAge: 18, hoursPerDay: 3, description: 'School years - Daily hangouts' },
      { startAge: 18, endAge: null, hoursPerDay: 0.5, description: 'Adult - Regular catch-ups' },
    ]
  },
  {
    id: 'sibling-close',
    name: 'Sibling (Very Close)',
    description: 'Close sibling relationship. Grew up together, maintained connection.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 8, description: 'Childhood - Shared home' },
      { startAge: 18, endAge: null, hoursPerDay: 1, description: 'Adult - Regular contact' },
    ]
  },
  {
    id: 'custom',
    name: 'Custom (Build Your Own)',
    description: 'Create your own timeline from scratch.',
    segments: [
      { startAge: 0, endAge: null, hoursPerDay: 4, description: 'Edit this segment' },
    ]
  }
]
