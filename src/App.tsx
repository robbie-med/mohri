import { useState, useEffect } from 'react'
import { Person, UserProfile } from './types'
import PersonCard from './components/PersonCard'
import AddPersonModal from './components/AddPersonModal'
import BirdDayImportModal from './components/BirdDayImportModal'
import SetupModal from './components/SetupModal'
import PersonDetailView from './components/PersonDetailView'
import { calculateTimeLeft } from './utils/calculator'
import './App.css'

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showSetup, setShowSetup] = useState(true)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    const savedPeople = localStorage.getItem('people')

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile))
      setShowSetup(false)
    }
    if (savedPeople) {
      setPeople(JSON.parse(savedPeople))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile))
    }
  }, [userProfile])

  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people))
  }, [people])

  const handleSetupComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowSetup(false)
  }

  const handleAddPerson = (person: Person) => {
    setPeople([...people, person])
    setShowAddModal(false)
  }

  const handleImportPeople = (importedPeople: Person[]) => {
    setPeople([...people, ...importedPeople])
    setShowImportModal(false)
  }

  const handleUpdatePerson = (updatedPerson: Person) => {
    setPeople(people.map(p => p.id === updatedPerson.id ? updatedPerson : p))
    setSelectedPerson(updatedPerson)
  }

  const handleDeletePerson = (personId: string) => {
    setPeople(people.filter(p => p.id !== personId))
    setSelectedPerson(null)
  }

  if (showSetup) {
    return <SetupModal onComplete={handleSetupComplete} />
  }

  if (selectedPerson && userProfile) {
    return (
      <PersonDetailView
        person={selectedPerson}
        userProfile={userProfile}
        onBack={() => setSelectedPerson(null)}
        onUpdate={handleUpdatePerson}
        onDelete={handleDeletePerson}
      />
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Mohri</h1>
        <p className="subtitle">Teach us to number our days, that we may gain a heart of wisdom — Psalm 90:12</p>
      </header>

      <main className="main">
        {people.length === 0 ? (
          <div className="empty-state">
            <div className="icon">⏳</div>
            <h2>Your journey begins</h2>
            <p>
              Time is our most precious gift. Add the people who matter most to understand
              how much time you truly have left with them.
            </p>
            <p style={{ marginBottom: '0.5rem', fontStyle: 'italic', color: 'var(--text-tertiary)' }}>
              "The trouble is, you think you have time." — Buddha
            </p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              Use the menu (☰) to add people or import from BirdDay
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              {people.length} {people.length === 1 ? 'person' : 'people'} in your circle
            </h2>

            <div className="person-grid">
              {people.filter(p => !p.passedDate).map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  userProfile={userProfile!}
                  onClick={() => setSelectedPerson(person)}
                />
              ))}
            </div>

            {/* Remember Section */}
            {people.filter(p => p.passedDate).length > 0 && (
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Remember
                </h2>
                <div className="person-grid">
                  {people.filter(p => p.passedDate).map(person => {
                    const calc = calculateTimeLeft(person, userProfile!)
                    return (
                      <div
                        key={person.id}
                        onClick={() => setSelectedPerson(person)}
                        className="person-card"
                        style={{
                          filter: 'grayscale(100%)',
                          opacity: 0.7
                        }}
                      >
                        <div className="person-card-header">
                          <div>
                            <h3>{person.name}</h3>
                            <p className="relationship">{person.relationship}</p>
                          </div>
                        </div>
                        <div style={{
                          padding: '1.5rem',
                          textAlign: 'center',
                          borderTop: '1px solid var(--border)'
                        }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            {new Date(person.passedDate!).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>
                            {Math.round(calc.hoursSpentSoFar).toLocaleString()} hours together
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {showAddModal && userProfile && (
        <AddPersonModal
          userProfile={userProfile}
          onAdd={handleAddPerson}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showImportModal && userProfile && (
        <BirdDayImportModal
          userProfile={userProfile}
          onAdd={handleImportPeople}
          onClose={() => setShowImportModal(false)}
        />
      )}

      {/* Floating Menu Button */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gold)',
            border: 'none',
            color: 'var(--charcoal)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: 50,
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Menu"
        >
          ☰
        </button>
        {showMenu && (
          <>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 98
              }}
              onClick={() => setShowMenu(false)}
            />
            <div
              style={{
                position: 'fixed',
                bottom: '5rem',
                right: '2rem',
                background: 'var(--charcoal)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                minWidth: '220px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                zIndex: 99
              }}
            >
              <button
                onClick={() => {
                  setShowAddModal(true)
                  setShowMenu(false)
                }}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  borderBottom: '1px solid var(--border)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                ✚ Add Person
              </button>
              <button
                onClick={() => {
                  setShowImportModal(true)
                  setShowMenu(false)
                }}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
              >
                📥 Import from BirdDay
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
