import { HashRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { TutorialPage } from './pages/TutorialPage'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials/:tutorialId/*" element={<TutorialPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  )
}
