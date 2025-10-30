import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import SearchCategories from './pages/SearchCategories'
function App() {
  return (
    <>
      <Routes>
        <Route path="/search-categories" element={<SearchCategories />} />
      </Routes>
    </>
  )
}

export default App
