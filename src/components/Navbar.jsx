import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold">
            <span className="inline-block w-6 h-6 bg-gradient-to-tr from-indigo-400 to-sky-400 rounded"></span>
            MindConnect
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink to="/therapists" className={navLink}>Find therapists</NavLink>
            <NavLink to="/journal" className={navLink}>Journal</NavLink>
            <NavLink to="/messages" className={navLink}>Messages</NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
