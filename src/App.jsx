import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'

function AppContent() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState('home')

  const page = currentPage === 'admin' && !user ? 'login' : currentPage

  return (
    <div>
      <Navbar currentPage={page} setCurrentPage={setCurrentPage} />
      {page === 'home' && <Home />}
      {page === 'login' && <Login setCurrentPage={setCurrentPage} />}
      {page === 'admin' && user && <Admin setCurrentPage={setCurrentPage} />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
