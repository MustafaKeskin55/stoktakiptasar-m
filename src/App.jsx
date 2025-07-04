import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Box, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react'

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
import Login from './pages/auth/Login'

// Auth servisi
import { isAuthenticated } from './services/authService'

// Layout bileşeni
const DashboardLayout = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Sayfa değiştiğinde mobil cihazlarda sidebar'ı otomatik kapat
  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Flex minH="100vh" bg="gray.50">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar} 
      />
      
      <Box 
        flex="1" 
        ml={{ base: 0, lg: isSidebarCollapsed ? "70px" : "280px" }}
        transition="margin-left 0.3s ease"
        w={{ base: "100%", lg: "auto" }}
      >
        <Navbar isSidebarCollapsed={isSidebarCollapsed} />
        <Box 
          as="main" 
          p={{ base: 3, md: 6 }}
          pt={{ base: "70px", md: "75px" }}
          minH="calc(100vh - 60px)"
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

// Protected Route bileşeni
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/"
        element={<Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <Suppliers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/integrations"
        element={
          <ProtectedRoute>
            <Integrations />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App 