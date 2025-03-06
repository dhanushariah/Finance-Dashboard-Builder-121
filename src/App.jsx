import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Wallet from './pages/Wallet';
import Investments from './pages/Investments';
import Goals from './pages/Goals';
import Budget from './pages/Budget';
import Subscriptions from './pages/Subscriptions';
import DebtsEMI from './pages/DebtsEMI';
import Notes from './pages/Notes';
import Taxes from './pages/Taxes';
import Tools from './pages/Tools';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Help from './pages/Help';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="investments" element={<Investments />} />
          <Route path="goals" element={<Goals />} />
          <Route path="budget" element={<Budget />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="debts" element={<DebtsEMI />} />
          <Route path="notes" element={<Notes />} />
          <Route path="taxes" element={<Taxes />} />
          <Route path="tools" element={<Tools />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;