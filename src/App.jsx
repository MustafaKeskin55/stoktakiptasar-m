import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Layout bileşenleri
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

// Sayfa bileşenleri
import Dashboard from './pages/dashboard'
import Products from './pages/products'
import Customers from './pages/customers'
import Suppliers from './pages/suppliers'
import Orders from './pages/orders'
import Reports from './pages/reports'
import Settings from './pages/settings'
import Integrations from './pages/integrations'

function App() {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box flex="1">
        <Navbar />
        <Box as="main" p={4}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/integrations" element={<Integrations />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default App 