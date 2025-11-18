import { useEffect, useState } from 'react'

export default function Journal() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [email, setEmail] = useState('me@example.com')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [items, setItems] = useState([])

  const load = async () => {
    const res = await fetch(`${baseUrl}/api/journal?client_email=${encodeURIComponent(email)}`)
    if (res.ok) setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  const add = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/journal`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_email: email, title, content })
    })
    if (res.ok) { setTitle(''); setContent(''); load() }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-white">Your journal</h1>
      <form onSubmit={add} className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Entry</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" rows={4} />
        </div>
        <button className="px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white">Add entry</button>
      </form>

      <div className="mt-6 space-y-3">
        {items.map(i => (
          <div key={i.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-white font-medium">{i.title}</div>
            <div className="text-slate-300 text-sm mt-1">{i.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
