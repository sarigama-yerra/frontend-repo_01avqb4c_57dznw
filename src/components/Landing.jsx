import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.12),transparent_35%)]" />
      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Find the right therapist, book with confidence</h1>
          <p className="mt-4 text-slate-300 text-lg">Search licensed professionals by specialization, language, and availability. Request a session in minutes.</p>
          <div className="mt-8 flex gap-3">
            <Link to="/therapists" className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium">Browse therapists</Link>
            <a href="/test" className="px-5 py-3 rounded-lg bg-white/10 text-slate-200">System status</a>
          </div>
        </div>
      </div>
    </div>
  )
}
