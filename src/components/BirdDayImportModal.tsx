import { useState } from 'react'
import initSqlJs, { Database } from 'sql.js'
import { Person, UserProfile, RelationshipType, TimeSegment } from '../types'
import { SCENARIO_TEMPLATES } from '../data/scenarios'

interface Props {
  userProfile: UserProfile
  onAdd: (people: Person[]) => void
  onClose: () => void
}

interface BirdDayPerson {
  id: number
  name: string
  surname: string | null
  birthYear: number
  birthMonth: number
  selected: boolean
  relationship: RelationshipType
  startAge: number
  templateId: string
}

export default function BirdDayImportModal({ userProfile, onAdd, onClose }: Props) {
  const [step, setStep] = useState<'upload' | 'review' | 'confirm'>('upload')
  const [people, setPeople] = useState<BirdDayPerson[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const SQL = await initSqlJs({
        locateFile: (file: string) => `/${file}`
      })
      const db: Database = new SQL.Database(new Uint8Array(arrayBuffer))

      const result = db.exec(`
        SELECT id, name, surname, originalDate
        FROM Event
        WHERE type = 'BIRTHDAY' AND yearMatter = 1
      `)

      if (result.length === 0 || result[0].values.length === 0) {
        setError('No birthdays with years found in this BirdDay export.')
        db.close()
        setLoading(false)
        return
      }

      const parsedPeople: BirdDayPerson[] = result[0].values.map((row: any[]) => {
        const id = row[0] as number
        const name = row[1] as string
        const surname = row[2] as string | null
        const originalDate = row[3] as string
        const [year, month] = originalDate.split('-').map(Number)

        return {
          id,
          name,
          surname,
          birthYear: year,
          birthMonth: month,
          selected: true,
          relationship: 'friend' as RelationshipType,
          startAge: 0,
          templateId: 'traditional-family'
        }
      })

      db.close()
      setPeople(parsedPeople)
      setStep('review')
    } catch (err) {
      setError('Failed to parse BirdDay file. Please make sure it\'s a valid BirdDay export.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleSelect = (id: number) => {
    setPeople(people.map(p => p.id === id ? { ...p, selected: !p.selected } : p))
  }

  const handleSelectAll = () => {
    setPeople(people.map(p => ({ ...p, selected: true })))
  }

  const handleDeselectAll = () => {
    setPeople(people.map(p => ({ ...p, selected: false })))
  }

  const handleUpdatePerson = (id: number, field: keyof BirdDayPerson, value: any) => {
    setPeople(people.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const adjustTemplateForStartAge = (segments: TimeSegment[], startAge: number): TimeSegment[] => {
    if (startAge === 0) return segments.map(s => ({ ...s }))

    // Filter out segments that end before the startAge
    const relevantSegments = segments.filter(seg =>
      seg.endAge === null || seg.endAge > startAge
    )

    if (relevantSegments.length === 0) {
      // If no segments remain, create a default ongoing segment
      return [{ startAge, endAge: null, hoursPerDay: 1, description: 'Custom period' }]
    }

    // Adjust the first segment to start at the specified startAge
    return relevantSegments.map((seg, idx) => {
      if (idx === 0) {
        return { ...seg, startAge }
      }
      return { ...seg }
    })
  }

  const handleImport = () => {
    const selectedPeople = people.filter(p => p.selected)

    const importedPeople: Person[] = selectedPeople.map((p, index) => {
      const template = SCENARIO_TEMPLATES.find(t => t.id === p.templateId)
      const baseSegments = template?.segments || [
        { startAge: 0, endAge: null, hoursPerDay: 1, description: 'Custom period' }
      ]

      const adjustedSegments = adjustTemplateForStartAge(baseSegments, p.startAge)

      const fullName = p.surname ? `${p.name} ${p.surname}` : p.name

      return {
        id: `${Date.now()}-${index}`,
        name: fullName,
        birthYear: p.birthYear,
        birthMonth: p.birthMonth,
        sex: 'male',
        relationship: p.relationship,
        timeSegments: adjustedSegments,
        createdAt: new Date().toISOString()
      }
    })

    onAdd(importedPeople)
  }

  const selectedCount = people.filter(p => p.selected).length

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'auto' }}>
        <div className="modal-header">
          <h2>Import from BirdDay</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {step === 'upload' && 'Upload your BirdDay export file'}
            {step === 'review' && `Review and map ${people.length} ${people.length === 1 ? 'person' : 'people'}`}
          </p>
        </div>

        {step === 'upload' && (
          <>
            <div className="modal-body">
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'var(--slate)',
                borderRadius: '0.5rem',
                border: '2px dashed var(--border)'
              }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📥</p>
                <h3 style={{ marginBottom: '1rem' }}>Choose BirdDay Export File</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Select the SQLite database file exported from BirdDay (may be extensionless)
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="birday-file-input"
                  disabled={loading}
                />
                <label htmlFor="birday-file-input">
                  <button
                    className="btn"
                    onClick={() => document.getElementById('birday-file-input')?.click()}
                    disabled={loading}
                    type="button"
                  >
                    {loading ? 'Parsing...' : 'Select File'}
                  </button>
                </label>
                {error && (
                  <p style={{ color: 'var(--red-muted)', marginTop: '1rem' }}>
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {step === 'review' && (
          <>
            <div className="modal-body">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'var(--slate)',
                borderRadius: '0.25rem'
              }}>
                <div>
                  <strong>{selectedCount}</strong> of <strong>{people.length}</strong> selected for import
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={handleSelectAll}
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                    type="button"
                  >
                    Select All
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleDeselectAll}
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
                    type="button"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div style={{
                maxHeight: '500px',
                overflow: 'auto',
                border: '1px solid var(--border)',
                borderRadius: '0.25rem'
              }}>
                {people.map((person) => (
                  <div
                    key={person.id}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid var(--border)',
                      background: person.selected ? 'var(--charcoal)' : 'var(--slate)',
                      opacity: person.selected ? 1 : 0.6
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                      <input
                        type="checkbox"
                        checked={person.selected}
                        onChange={() => handleToggleSelect(person.id)}
                        style={{ marginTop: '0.5rem' }}
                      />

                      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                            Name
                          </label>
                          <strong style={{ fontSize: '1rem' }}>
                            {person.surname ? `${person.name} ${person.surname}` : person.name}
                          </strong>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Born {person.birthMonth}/{person.birthYear} (Age {new Date().getFullYear() - person.birthYear})
                          </p>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                            Relationship
                          </label>
                          <select
                            value={person.relationship}
                            onChange={(e) => handleUpdatePerson(person.id, 'relationship', e.target.value)}
                            disabled={!person.selected}
                            style={{ width: '100%', fontSize: '0.9rem' }}
                          >
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

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                            Your Age When Met
                          </label>
                          <input
                            type="number"
                            min="0"
                            max={userProfile.currentAge}
                            value={person.startAge}
                            onChange={(e) => handleUpdatePerson(person.id, 'startAge', parseInt(e.target.value) || 0)}
                            disabled={!person.selected}
                            style={{ width: '100%', fontSize: '0.9rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                            Time Pattern
                          </label>
                          <select
                            value={person.templateId}
                            onChange={(e) => handleUpdatePerson(person.id, 'templateId', e.target.value)}
                            disabled={!person.selected}
                            style={{ width: '100%', fontSize: '0.9rem' }}
                          >
                            {SCENARIO_TEMPLATES.filter(t => t.id !== 'custom').map(template => (
                              <option key={template.id} value={template.id}>
                                {template.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setStep('upload')}>
                ← Back
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleImport}
                disabled={selectedCount === 0}
              >
                Import {selectedCount} {selectedCount === 1 ? 'Person' : 'People'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
