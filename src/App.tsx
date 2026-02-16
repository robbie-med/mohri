import { useState, useEffect } from 'react'
import { Person, UserProfile } from './types'
import PersonCard from './components/PersonCard'
import AddPersonModal from './components/AddPersonModal'
import BirdDayImportModal from './components/BirdDayImportModal'
import SetupModal from './components/SetupModal'
import PersonDetailView from './components/PersonDetailView'
import './App.css'

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showSetup, setShowSetup] = useState(true)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

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
        <h1>Memento Mori</h1>
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
            <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-tertiary)' }}>
              "The trouble is, you think you have time." — Buddha
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn" onClick={() => setShowAddModal(true)}>
                ✚ Add Your First Person
              </button>
              <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
                📥 Import from BirdDay
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                {people.length} {people.length === 1 ? 'person' : 'people'} in your circle
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-small btn-secondary" onClick={() => setShowImportModal(true)}>
                  📥 Import from BirdDay
                </button>
                <button className="btn btn-small" onClick={() => setShowAddModal(true)}>
                  ✚ Add Person
                </button>
              </div>
            </div>

            <div className="person-grid">
              {people.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  userProfile={userProfile!}
                  onClick={() => setSelectedPerson(person)}
                />
              ))}
            </div>
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
    </div>
  )
}

export default App
