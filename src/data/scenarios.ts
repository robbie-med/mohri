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
    id: 'parent-elder-care',
    name: 'Parent Elder Care',
    description: 'Parent moves back in with you during their final years. Providing daily care.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 12, description: 'Living at home - Daily interaction' },
      { startAge: 18, endAge: 55, hoursPerDay: 0.3, description: 'Adult - Occasional visits' },
      { startAge: 55, endAge: null, hoursPerDay: 8, description: 'Caregiving - Parent moved in' },
    ]
  },
  {
    id: 'estranged-reconciled',
    name: 'Estranged Then Reconciled',
    description: 'Relationship broke down, then rebuilt later in life.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 8, description: 'Childhood - Normal contact' },
      { startAge: 18, endAge: 35, hoursPerDay: 0, description: 'Estranged - No contact' },
      { startAge: 35, endAge: null, hoursPerDay: 1, description: 'Reconciled - Regular contact' },
    ]
  },
  {
    id: 'long-distance',
    name: 'Long Distance Relationship',
    description: 'Spouse or partner living apart temporarily, then together.',
    segments: [
      { startAge: 25, endAge: 28, hoursPerDay: 2, description: 'Dating long-distance - Daily calls' },
      { startAge: 28, endAge: null, hoursPerDay: 12, description: 'Married - Living together' },
    ]
  },
  {
    id: 'college-friend',
    name: 'College Friend',
    description: 'Met in college as roommates or close friends, maintained friendship.',
    segments: [
      { startAge: 18, endAge: 22, hoursPerDay: 4, description: 'College - Daily interaction' },
      { startAge: 22, endAge: null, hoursPerDay: 0.5, description: 'Adult - Regular catch-ups' },
    ]
  },
  {
    id: 'grandparent-close',
    name: 'Grandparent (Close)',
    description: 'Involved grandparent who spent significant time during childhood.',
    segments: [
      { startAge: 0, endAge: 12, hoursPerDay: 3, description: 'Childhood - Frequent visits, babysitting' },
      { startAge: 12, endAge: 18, hoursPerDay: 1, description: 'Teenage - Still involved' },
      { startAge: 18, endAge: null, hoursPerDay: 0.3, description: 'Adult - Holiday visits' },
    ]
  },
  {
    id: 'work-colleague',
    name: 'Work Colleague Turned Friend',
    description: 'Coworker who became a close friend, stayed in touch after.',
    segments: [
      { startAge: 30, endAge: 35, hoursPerDay: 2, description: 'Worked together - Daily interaction' },
      { startAge: 35, endAge: null, hoursPerDay: 0.75, description: 'Stay in touch - Regular meetups' },
    ]
  },
  {
    id: 'child-from-birth',
    name: 'Child (From Birth)',
    description: 'Your own child, living at home then becoming independent.',
    segments: [
      { startAge: 0, endAge: 18, hoursPerDay: 10, description: 'Raising child - Daily care' },
      { startAge: 18, endAge: 22, hoursPerDay: 2, description: 'College - Frequent contact' },
      { startAge: 22, endAge: null, hoursPerDay: 1, description: 'Independent adult child' },
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
