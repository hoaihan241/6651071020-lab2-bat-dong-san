import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.tsx'
import ListPage from './pages/ListPage.tsx'
import DetailPage from './pages/DetailPage.tsx'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/item/:id" element={<DetailPage />} />
      </Routes>
    </div>
  )
}