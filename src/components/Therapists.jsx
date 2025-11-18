import { useEffect, useState } from 'react'
import TherapistCard from './TherapistCard'
import BookingModal from './BookingModal'

export default function Therapists() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState('')
  const [virtual, setVirtual] = useState('')
  const [inPerson, setInPerson] = useState('')
  const [selected, setSelected] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchTherapists = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (language) params.set('language', language)
      if (virtual) params.set('virtual', virtual === 'true')
      if (inPerson) params.set('in_person', inPerson === 'true')
      const res = await fetch(`${baseUrl}/api/therapists?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTherapists() }, [])

  const submitBooking = async (payload) => {
    try {
      const res = await fetch(`${baseUrl}/api/booking-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to send request')
      setSelected(null)
      alert('Request sent! We\'ll email you once the therapist responds.')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-white">Find a therapist</h1>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          placeholder="Search by name, specialty..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white"
        />
        <input
          placeholder="Language (e.g., English)"
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
          className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white"
        />
        <select value={virtual} onChange={(e)=>setVirtual(e.target.value)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white">
          <option value="">Virtual & In-person</option>
          <option value="true">Virtual</option>
          <option value="false">Not virtual</option>
        </select>
        <select value={inPerson} onChange={(e)=>setInPerson(e.target.value)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white">
          <option value="">All Locations</option>
          <option value="true">In-person</option>
          <option value="false">Not in-person</option>
        </select>
        <div className="md:col-span-4 flex gap-2">
          <button onClick={fetchTherapists} className="px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white">Search</button>
          <button onClick={()=>{setSearch('');setLanguage('');setVirtual('');setInPerson('');fetchTherapists()}} className="px-3 py-2 rounded bg-white/10 text-slate-200">Clear</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {loading && <p className="text-slate-300">Loading...</p>}
        {error && <p className="text-red-300">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-slate-300">No therapists found. Try seeding data from the test page then refresh.</p>
        )}
        {items.map(t => (
          <TherapistCard key={t.id} t={t} onRequest={setSelected} />
        ))}
      </div>

      <BookingModal open={!!selected} therapist={selected} onClose={()=>setSelected(null)} onSubmit={submitBooking} />
    </div>
  )
}
