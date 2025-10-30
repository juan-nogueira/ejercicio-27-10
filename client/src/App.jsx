import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import SearchCategories from './pages/SearchCategories'
import SearchProducts from './pages/SearchProducts'
function App() {
  return (
    <>
      <Routes>
        <Route path="/search-categories" element={<SearchCategories />} />
        <Route path="/search-products" element={<SearchProducts />} />
      </Routes>
    </>
  )
}

export default App
