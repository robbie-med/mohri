// US Social Security Administration Life Expectancy Data (2023)
// Source: SSA Period Life Table

export interface LifeExpectancyData {
  age: number
  male: number  // Years remaining
  female: number
}

// Simplified life expectancy table (age -> years remaining)
export const LIFE_EXPECTANCY_TABLE: LifeExpectancyData[] = [
  { age: 0, male: 76.3, female: 81.3 },
  { age: 10, male: 67.0, female: 72.0 },
  { age: 20, male: 57.3, female: 62.2 },
  { age: 25, male: 52.5, female: 57.4 },
  { age: 30, male: 47.7, female: 52.6 },
  { age: 35, male: 42.9, female: 47.8 },
  { age: 40, male: 38.2, female: 43.0 },
  { age: 45, male: 33.6, female: 38.3 },
  { age: 50, male: 29.2, female: 33.7 },
  { age: 55, male: 25.0, female: 29.3 },
  { age: 60, male: 21.0, female: 25.0 },
  { age: 65, male: 17.5, female: 20.9 },
  { age: 70, male: 14.2, female: 17.0 },
  { age: 75, male: 11.2, female: 13.4 },
  { age: 80, male: 8.5, female: 10.2 },
  { age: 85, male: 6.3, female: 7.5 },
  { age: 90, male: 4.6, female: 5.4 },
  { age: 95, male: 3.3, female: 3.9 },
  { age: 100, male: 2.3, female: 2.7 },
]

export function getLifeExpectancy(currentAge: number, sex: 'male' | 'female'): number {
  // Find the closest age in the table
  let closestEntry = LIFE_EXPECTANCY_TABLE[0]
  let minDiff = Math.abs(currentAge - closestEntry.age)

  for (const entry of LIFE_EXPECTANCY_TABLE) {
    const diff = Math.abs(currentAge - entry.age)
    if (diff < minDiff) {
      minDiff = diff
      closestEntry = entry
    }
  }

  const yearsRemaining = sex === 'male' ? closestEntry.male : closestEntry.female
  return currentAge + yearsRemaining
}

export function getYearsRemaining(currentAge: number, sex: 'male' | 'female'): number {
  return getLifeExpectancy(currentAge, sex) - currentAge
}
