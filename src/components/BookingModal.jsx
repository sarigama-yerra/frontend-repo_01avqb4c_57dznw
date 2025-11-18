import { useState } from 'react'

export default function BookingModal({ open, onClose, therapist, onSubmit }) {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [note, setNote] = useState('')

  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    onSubmit({
      therapist_id: therapist.id,
      client_name: clientName,
      client_email: clientEmail,
      note,
      preferred_times: []
    })
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-xl p-5" onClick={(e)=>e.stopPropagation()}>
        <h3 className="text-white font-semibold text-lg">Request a session with {therapist?.name}</h3>
        <form className="mt-4 space-y-3" onSubmit={submit}>
          <div>
            <label className="text-sm text-slate-300">Your name</label>
            <input value={clientName} onChange={(e)=>setClientName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" required />
          </div>
          <div>
            <label className="text-sm text-slate-300">Your email</label>
            <input type="email" value={clientEmail} onChange={(e)=>setClientEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white" required />
          </div>
          <div>
            <label className="text-sm text-slate-300">Notes (optional)</label>
            <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="mt-1 w-full px-3 py-2 rounded bg白/5 border border-white/10 text-white bg-white/5" rows={3} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-200">Cancel</button>
            <button type="submit" className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white">Send request</button>
          </div>
        </form>
      </div>
    </div>
  )
}
