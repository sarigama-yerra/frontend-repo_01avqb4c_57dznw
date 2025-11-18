import { useEffect, useState } from 'react'

export default function Messages() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [therapistId, setTherapistId] = useState('')
  const [clientEmail, setClientEmail] = useState('me@example.com')
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const load = async () => {
    const params = new URLSearchParams()
    if (therapistId) params.set('therapist_id', therapistId)
    if (clientEmail) params.set('client_email', clientEmail)
    const res = await fetch(`${baseUrl}/api/messages?${params.toString()}`)
    if (res.ok) setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  const send = async (e) => {
    e.preventDefault()
    const payload = {
      therapist_id: therapistId || 'unknown',
      client_email: clientEmail,
      from_email: clientEmail,
      to_email: 'therapist@example.com',
      content: text
    }
    const res = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) { setText(''); load() }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-white">Messages</h1>
      <form onSubmit={send} className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Therapist ID (optional)" value={therapistId} onChange={(e)=>setTherapistId(e.target.value)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white" />
          <input placeholder="Your email" value={clientEmail} onChange={(e)=>setClientEmail(e.target.value)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white" />
        </div>
        <div>
          <textarea placeholder="Type a message" value={text} onChange={(e)=>setText(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" rows={3} />
        </div>
        <button className="px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
      </form>

      <div className="mt-6 space-y-3">
        {items.map(m => (
          <div key={m.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-slate-300 text-xs">{m.from_email} → {m.to_email}</div>
            <div className="text-white mt-1">{m.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
