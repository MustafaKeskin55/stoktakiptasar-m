import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Products from './pages/products';
import Orders from './pages/orders';
import Suppliers from './pages/suppliers/index';
import Customers from './pages/customers/index';
import Reports from './pages/reports/index';
import Settings from './pages/settings/index';
import Integrations from './pages/integrations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/integrations" element={<Integrations />} />
      </Routes>
    </Router>
  );
}

export default App; 