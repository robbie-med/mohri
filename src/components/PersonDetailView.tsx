import { useState } from 'react'
import { Person, UserProfile, TimeSegment } from '../types'
import { calculateTimeLeft, formatHours } from '../utils/calculator'
import { getYearsRemaining } from '../data/lifeExpectancy'

interface Props {
  person: Person
  userProfile: UserProfile
  onBack: () => void
  onUpdate: (person: Person) => void
  onDelete: (personId: string) => void
}

export default function PersonDetailView({ person, userProfile, onBack, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSegments, setEditedSegments] = useState<TimeSegment[]>(person.timeSegments)

  const calc = calculateTimeLeft(person, userProfile)
  const currentYear = new Date().getFullYear()

  const handleDelete = () => {
    if (confirm(`Remove ${person.name} from your circle?`)) {
      onDelete(person.id)
    }
  }

  const handleSaveChanges = () => {
    onUpdate({
      ...person,
      timeSegments: editedSegments
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedSegments(person.timeSegments)
    setIsEditing(false)
  }

  const handleAddSegment = () => {
    const lastSegment = editedSegments[editedSegments.length - 1]
    const newStartAge = lastSegment?.endAge || userProfile.currentAge

    setEditedSegments([...editedSegments, {
      startAge: newStartAge,
      endAge: null,
      hoursPerDay: 1,
      description: 'New period'
    }])
  }

  const handleRemoveSegment = (index: number) => {
    if (editedSegments.length > 1) {
      setEditedSegments(editedSegments.filter((_, i) => i !== index))
    }
  }

  const handleSegmentChange = (index: number, field: keyof TimeSegment, value: any) => {
    const newSegments = [...editedSegments]
    newSegments[index] = { ...newSegments[index], [field]: value }
    setEditedSegments(newSegments)
  }

  return (
    <div className="app">
      <header className="header">
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--gold)',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '0.5rem'
          }}
        >
          ← Back
        </button>
        <h1>{person.name}</h1>
        <p className="subtitle">{person.relationship} • Age {calc.personCurrentAge}</p>
      </header>

      <main className="main" style={{ maxWidth: '900px' }}>
        {/* Main Stats */}
        <div style={{
          background: 'var(--charcoal)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div className="progress-section" style={{ marginBottom: '2rem' }}>
            <div className="progress-label">
              <span className="spent" style={{ fontSize: '1.1rem' }}>
                {calc.percentageSpent.toFixed(1)}% of your time together has passed
              </span>
              <span className="remaining" style={{ fontSize: '1.1rem' }}>
                {calc.percentageRemaining.toFixed(1)}% remains
              </span>
            </div>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div className="progress-fill" style={{ width: `${calc.percentageSpent}%` }} />
            </div>
          </div>

          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '2rem' }}>
            <div className="stat">
              <div className="stat-value" style={{ fontSize: '2rem' }}>
                {calc.yearsRemaining.toFixed(1)}
              </div>
              <div className="stat-label">Years Remaining</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ fontSize: '2rem' }}>
                {Math.round(calc.daysRemaining).toLocaleString()}
              </div>
              <div className="stat-label">Days Remaining</div>
            </div>
            <div className="stat">
              <div className="stat-value" style={{ fontSize: '2rem' }}>
                {Math.round(calc.weeksRemaining).toLocaleString()}
              </div>
              <div className="stat-label">Weeks Remaining</div>
            </div>
          </div>
        </div>

        {/* Life Expectancy Info */}
        <div style={{
          background: 'var(--charcoal)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Life Expectancy</h3>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Expected lifespan:
              </p>
              <p style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>
                {calc.personLifeExpectancy.toFixed(0)} years old
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                Born {person.birthMonth}/{person.birthYear}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Your expected lifespan:
              </p>
              <p style={{ fontSize: '1.5rem', color: 'var(--gold)' }}>
                {(userProfile.currentAge + getYearsRemaining(userProfile.currentAge, userProfile.sex)).toFixed(0)} years old
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                Born {userProfile.birthMonth}/{userProfile.birthYear}
              </p>
            </div>
          </div>
          <p style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'var(--slate)',
            borderRadius: '0.25rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}>
            Time remaining is limited by whoever is expected to pass first.
          </p>
        </div>

        {/* Hours Breakdown */}
        <div style={{
          background: 'var(--charcoal)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Time Together</h3>
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Hours Spent
              </p>
              <p style={{ fontSize: '1.3rem', color: 'var(--red-muted)' }}>
                {formatHours(calc.hoursSpentSoFar)}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Hours Remaining
              </p>
              <p style={{ fontSize: '1.3rem', color: 'var(--green-muted)' }}>
                {formatHours(calc.hoursRemainingEstimate)}
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Total Lifetime
              </p>
              <p style={{ fontSize: '1.3rem', color: 'var(--gold)' }}>
                {formatHours(calc.totalLifetimeHoursEstimate)}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Segments */}
        <div style={{
          background: 'var(--charcoal)',
          border: '1px solid var(--border)',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Timeline</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-small"
                style={{ background: 'var(--gold-dim)' }}
              >
                ✎ Edit Timeline
              </button>
            )}
          </div>

          {isEditing ? (
            <>
              {editedSegments.map((segment, idx) => (
                <div key={idx} className="timeline-segment">
                  <div className="timeline-segment-header">
                    <input
                      type="text"
                      value={segment.description || ''}
                      onChange={(e) => handleSegmentChange(idx, 'description', e.target.value)}
                      placeholder={`Period ${idx + 1}`}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        padding: 0,
                        flex: 1
                      }}
                    />
                    {editedSegments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSegment(idx)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--red-muted)',
                          cursor: 'pointer',
                          padding: '0.25rem'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="segment-controls">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}>Your Age Start</label>
                      <input
                        type="number"
                        min="0"
                        value={segment.startAge}
                        onChange={(e) => handleSegmentChange(idx, 'startAge', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}>Your Age End</label>
                      <input
                        type="number"
                        min="0"
                        value={segment.endAge || ''}
                        placeholder="Ongoing"
                        onChange={(e) => handleSegmentChange(idx, 'endAge', e.target.value ? parseInt(e.target.value) : null)}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}>Hours/Day</label>
                      <input
                        type="number"
                        min="0"
                        max="24"
                        step="0.5"
                        value={segment.hoursPerDay}
                        onChange={(e) => handleSegmentChange(idx, 'hoursPerDay', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddSegment}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                ✚ Add Another Period
              </button>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSaveChanges} className="btn">
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              {person.timeSegments.map((segment, idx) => (
                <div key={idx} style={{
                  padding: '1rem',
                  background: 'var(--slate)',
                  borderRadius: '0.25rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {segment.description || `Period ${idx + 1}`}
                    </strong>
                    <span style={{ color: 'var(--gold)' }}>
                      {segment.hoursPerDay} hrs/day
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Your age {segment.startAge} → {segment.endAge === null ? 'present' : segment.endAge}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={handleDelete} className="btn" style={{ background: 'var(--red-muted)' }}>
            Remove Person
          </button>
        </div>
      </main>
    </div>
  )
}
