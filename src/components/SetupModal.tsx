import { useState } from 'react'
import { UserProfile } from '../types'

interface Props {
  onComplete: (profile: UserProfile) => void
}

export default function SetupModal({ onComplete }: Props) {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const [birthYear, setBirthYear] = useState(currentYear - 30)
  const [birthMonth, setBirthMonth] = useState(1)
  const [sex, setSex] = useState<'male' | 'female'>('male')

  const calculateAge = () => {
    let age = currentYear - birthYear
    if (currentMonth < birthMonth) age -= 1
    return age
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onComplete({
      birthYear,
      birthMonth,
      currentAge: calculateAge(),
      sex
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Welcome</h2>
          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
            First, tell us about yourself
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
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
                <select value={birthMonth} onChange={(e) => setBirthMonth(parseInt(e.target.value))} required>
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
              <label>Sex (for life expectancy calculation)</label>
              <select value={sex} onChange={(e) => setSex(e.target.value as any)} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--slate)', borderRadius: '0.25rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                You are currently <strong style={{ color: 'var(--gold)' }}>{calculateAge()}</strong> years old.
                This information is stored locally on your device.
              </p>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn">
              Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
