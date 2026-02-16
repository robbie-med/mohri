import { Person, TimeCalculation, UserProfile } from '../types'
import { getLifeExpectancy } from '../data/lifeExpectancy'

function calculateAge(birthYear: number, birthMonth: number, atDate?: Date): number {
  const referenceDate = atDate || new Date()
  const currentYear = referenceDate.getFullYear()
  const currentMonth = referenceDate.getMonth() + 1

  let age = currentYear - birthYear
  if (currentMonth < birthMonth) {
    age -= 1
  }
  return age
}

export function calculateTimeLeft(
  person: Person,
  userProfile: UserProfile
): TimeCalculation {
  const personCurrentAge = calculateAge(person.birthYear, person.birthMonth)
  const userCurrentAge = calculateAge(userProfile.birthYear, userProfile.birthMonth)

  // If person has passed, calculate user's age at that time
  let effectiveUserAge = userCurrentAge
  if (person.passedDate) {
    const passedDate = new Date(person.passedDate)
    effectiveUserAge = calculateAge(userProfile.birthYear, userProfile.birthMonth, passedDate)
    console.log('Person passed on:', person.passedDate)
    console.log('User age when person passed:', effectiveUserAge)
    console.log('User current age:', userCurrentAge)
  }

  // Get life expectancy
  const personLifeExpectancy = getLifeExpectancy(personCurrentAge, person.sex)
  const userLifeExpectancy = getLifeExpectancy(userCurrentAge, userProfile.sex)

  // Years remaining is limited by whoever dies first
  const personYearsRemaining = personLifeExpectancy - personCurrentAge
  const userYearsRemaining = userLifeExpectancy - userCurrentAge
  const yearsRemaining = Math.max(0, Math.min(personYearsRemaining, userYearsRemaining))

  // Calculate hours spent so far (up to passed date if applicable)
  let hoursSpentSoFar = 0
  for (const segment of person.timeSegments) {
    const segmentStart = segment.startAge
    const segmentEnd = segment.endAge === null ? effectiveUserAge : Math.min(segment.endAge, effectiveUserAge)

    if (segmentEnd > segmentStart) {
      const yearsInSegment = segmentEnd - segmentStart
      const daysInSegment = yearsInSegment * 365.25
      const hoursInSegment = daysInSegment * segment.hoursPerDay
      hoursSpentSoFar += hoursInSegment
      if (person.passedDate) {
        console.log(`Segment: age ${segmentStart}-${segmentEnd}, ${segment.hoursPerDay}hrs/day = ${hoursInSegment.toFixed(0)} hours`)
      }
    }
  }

  if (person.passedDate) {
    console.log('Total hours together:', hoursSpentSoFar.toFixed(0))
  }

  // Calculate hours remaining estimate
  // Use the last ongoing segment or the most recent one
  const ongoingSegment = person.timeSegments.find(s => s.endAge === null)
  const lastSegment = person.timeSegments[person.timeSegments.length - 1]
  const futureHoursPerDay = ongoingSegment?.hoursPerDay || lastSegment?.hoursPerDay || 1

  const daysRemaining = yearsRemaining * 365.25
  const hoursRemainingEstimate = daysRemaining * futureHoursPerDay

  // Total lifetime estimate
  const totalLifetimeHoursEstimate = hoursSpentSoFar + hoursRemainingEstimate

  // Percentages
  const percentageSpent = totalLifetimeHoursEstimate > 0
    ? (hoursSpentSoFar / totalLifetimeHoursEstimate) * 100
    : 0
  const percentageRemaining = 100 - percentageSpent

  return {
    personId: person.id,
    personCurrentAge,
    personLifeExpectancy,
    yearsRemaining,
    hoursSpentSoFar,
    hoursRemainingEstimate,
    totalLifetimeHoursEstimate,
    percentageSpent,
    percentageRemaining,
    daysRemaining,
    weeksRemaining: daysRemaining / 7,
    monthsRemaining: yearsRemaining * 12,
  }
}

export function formatHours(hours: number): string {
  if (hours < 24) {
    return `${Math.round(hours)} hours`
  } else if (hours < 24 * 7) {
    return `${Math.round(hours / 24)} days`
  } else if (hours < 24 * 365) {
    return `${Math.round(hours / (24 * 7))} weeks`
  } else {
    return `${Math.round(hours / (24 * 365))} years`
  }
}

export function formatDuration(days: number): string {
  if (days < 7) {
    return `${Math.round(days)} days`
  } else if (days < 30) {
    return `${Math.round(days / 7)} weeks`
  } else if (days < 365) {
    return `${Math.round(days / 30)} months`
  } else {
    const years = Math.floor(days / 365)
    const months = Math.round((days % 365) / 30)
    return months > 0 ? `${years} years, ${months} months` : `${years} years`
  }
}
