import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Therapists from './components/Therapists'
import Journal from './components/Journal'
import Messages from './components/Messages'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200">
      <Navbar />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      <footer className="mt-16 py-10 text-center text-slate-400">Built for demo purposes.</footer>
    </div>
  )
}

export default App
