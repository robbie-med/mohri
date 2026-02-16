import { Person, UserProfile } from '../types'
import { calculateTimeLeft, formatDuration } from '../utils/calculator'

interface Props {
  person: Person
  userProfile: UserProfile
  onClick: () => void
}

export default function PersonCard({ person, userProfile, onClick }: Props) {
  const calc = calculateTimeLeft(person, userProfile)
  const currentYear = new Date().getFullYear()

  return (
    <div className="person-card" onClick={onClick}>
      <div className="person-card-header">
        <div>
          <h3>{person.name}</h3>
          <p className="relationship">{person.relationship}</p>
        </div>
        <div className="age">
          Age {calc.personCurrentAge}
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-label">
          <span className="spent">{calc.percentageSpent.toFixed(1)}% spent</span>
          <span className="remaining">{calc.percentageRemaining.toFixed(1)}% remaining</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${calc.percentageSpent}%` }} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <div className="stat-value">{calc.yearsRemaining.toFixed(1)}</div>
          <div className="stat-label">Years Left</div>
        </div>
        <div className="stat">
          <div className="stat-value">{formatDuration(calc.daysRemaining)}</div>
          <div className="stat-label">Time Remaining</div>
        </div>
      </div>
    </div>
  )
}
