export interface Person {
  id: string
  name: string
  birthYear: number
  birthMonth: number  // 1-12
  sex: 'male' | 'female'
  relationship: RelationshipType
  timeSegments: TimeSegment[]
  notes?: string
  passedDate?: string  // ISO date string when person passed away
  createdAt: string
}

export type RelationshipType =
  | 'parent'
  | 'sibling'
  | 'child'
  | 'spouse'
  | 'grandparent'
  | 'relative'
  | 'friend'
  | 'other'

export interface TimeSegment {
  startAge: number  // Your age when this segment started
  endAge: number | null  // Your age when it ended (null = ongoing)
  hoursPerDay: number  // Average hours per day with this person
  description?: string  // e.g., "Lived at home", "College years", etc.
}

export interface UserProfile {
  birthYear: number
  birthMonth: number  // 1-12
  currentAge: number
  sex: 'male' | 'female'
}

export interface TimeCalculation {
  personId: string
  personCurrentAge: number
  personLifeExpectancy: number
  yearsRemaining: number

  hoursSpentSoFar: number
  hoursRemainingEstimate: number
  totalLifetimeHoursEstimate: number

  percentageSpent: number
  percentageRemaining: number

  daysRemaining: number
  weeksRemaining: number
  monthsRemaining: number
}

export interface ScenarioTemplate {
  id: string
  name: string
  description: string
  segments: Omit<TimeSegment, 'id'>[]
}
