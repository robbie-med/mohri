import { useState } from 'react'
import { Person, RelationshipType, UserProfile, TimeSegment } from '../types'
import { SCENARIO_TEMPLATES } from '../data/scenarios'

interface Props {
  userProfile: UserProfile
  onAdd: (person: Person) => void
  onClose: () => void
}

export default function AddPersonModal({ userProfile, onAdd, onClose }: Props) {
  const currentYear = new Date().getFullYear()
  const [step, setStep] = useState<'basic' | 'scenario' | 'timeline'>('basic')

  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState(currentYear - 50)
  const [birthMonth, setBirthMonth] = useState(1)
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [relationship, setRelationship] = useState<RelationshipType>('parent')
  const [timeSegments, setTimeSegments] = useState<TimeSegment[]>([])

  const handleBasicNext = () => {
    setStep('scenario')
  }

  const handleScenarioSelect = (scenarioId: string) => {
    const scenario = SCENARIO_TEMPLATES.find(s => s.id === scenarioId)
    if (scenario) {
      setTimeSegments(scenario.segments.map(s => ({ ...s })))
    }
    setStep('timeline')
  }

  const handleAddSegment = () => {
    const lastSegment = timeSegments[timeSegments.length - 1]
    const newStartAge = lastSegment?.endAge || userProfile.currentAge

    setTimeSegments([...timeSegments, {
      startAge: newStartAge,
      endAge: null,
      hoursPerDay: 1,
      description: 'New period'
    }])
  }

  const handleRemoveSegment = (index: number) => {
    if (timeSegments.length > 1) {
      setTimeSegments(timeSegments.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = () => {
    const person: Person = {
      id: Date.now().toString(),
      name,
      birthYear,
      birthMonth,
      sex,
      relationship,
      timeSegments,
      createdAt: new Date().toISOString()
    }
    onAdd(person)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add a Person</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {step === 'basic' && 'Basic information'}
            {step === 'scenario' && 'Choose a time pattern'}
            {step === 'timeline' && 'Review timeline'}
          </p>
        </div>

        {step === 'basic' && (
          <>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter their name"
                  required
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Birth Year</label>
                  <input
                    type="number"
                    min="1900"
                    max={currentYear}
                    value={birthYear}
                    onChange={(e) => setBirthYear(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Birth Month</label>
                  <select value={birthMonth} onChange={(e) => setBirthMonth(parseInt(e.target.value))}>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select value={sex} onChange={(e) => setSex(e.target.value as any)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>Relationship</label>
                <select value={relationship} onChange={(e) => setRelationship(e.target.value as any)}>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="child">Child</option>
                  <option value="spouse">Spouse/Partner</option>
                  <option value="grandparent">Grandparent</option>
                  <option value="relative">Other Relative</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="btn" onClick={handleBasicNext} disabled={!name}>
                Next: Timeline →
              </button>
            </div>
          </>
        )}

        {step === 'scenario' && (
          <>
            <div className="modal-body">
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Choose a preset pattern or customize your own:
              </p>
              <div className="scenario-grid">
                {SCENARIO_TEMPLATES.map(scenario => (
                  <div
                    key={scenario.id}
                    className="scenario-card"
                    onClick={() => handleScenarioSelect(scenario.id)}
                  >
                    <h4>{scenario.name}</h4>
                    <p>{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setStep('basic')}>
                ← Back
              </button>
            </div>
          </>
        )}

        {step === 'timeline' && (
          <>
            <div className="modal-body">
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Timeline Segments</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Showing how much time you've spent with {name}
                </p>
              </div>

              {timeSegments.map((segment, idx) => (
                <div key={idx} className="timeline-segment">
                  <div className="timeline-segment-header">
                    <input
                      type="text"
                      value={segment.description || ''}
                      onChange={(e) => {
                        const newSegments = [...timeSegments]
                        newSegments[idx].description = e.target.value
                        setTimeSegments(newSegments)
                      }}
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
                    {timeSegments.length > 1 && (
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
                        onChange={(e) => {
                          const newSegments = [...timeSegments]
                          newSegments[idx].startAge = parseInt(e.target.value)
                          setTimeSegments(newSegments)
                        }}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: '0.8rem' }}>Your Age End</label>
                      <input
                        type="number"
                        min="0"
                        value={segment.endAge || ''}
                        placeholder="Ongoing"
                        onChange={(e) => {
                          const newSegments = [...timeSegments]
                          newSegments[idx].endAge = e.target.value ? parseInt(e.target.value) : null
                          setTimeSegments(newSegments)
                        }}
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
                        onChange={(e) => {
                          const newSegments = [...timeSegments]
                          newSegments[idx].hoursPerDay = parseFloat(e.target.value)
                          setTimeSegments(newSegments)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddSegment}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                ✚ Add Another Time Period
              </button>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setStep('scenario')}>
                ← Back
              </button>
              <button type="button" className="btn" onClick={handleSubmit}>
                Add Person
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
