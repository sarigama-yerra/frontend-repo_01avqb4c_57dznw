export default function TherapistCard({ t, onRequest }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-300 to-sky-300 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{t.name}</h3>
          <span className="text-xs text-slate-300">{t.location || 'Virtual'}</span>
        </div>
        <p className="text-slate-300 text-sm line-clamp-2 mt-1">{t.bio}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {(t.specialties || []).slice(0,4).map((s) => (
            <span key={s} className="text-xs bg-white/10 text-slate-200 px-2 py-1 rounded">{s}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-slate-400">
            {t.virtual ? 'Virtual' : ''} {t.in_person ? '• In-person' : ''}
          </div>
          <button
            onClick={() => onRequest(t)}
            className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white"
          >Request session</button>
        </div>
      </div>
    </div>
  )
}
