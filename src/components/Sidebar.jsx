import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdSubscriptions,
  MdNoteAlt,
  MdCalculate,
  MdAnalytics,
  MdSettings,
  MdHelpOutline,
  MdLogout,
  MdBuildCircle,
  MdShowChart,
  MdHomeRepairService
} from 'react-icons/md';
import { BsCardChecklist } from 'react-icons/bs';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const menuItems = [
  { path: '/', icon: <MdDashboard />, label: 'Dashboard' },
  { path: '/transactions', icon: <FaMoneyBillTransfer />, label: 'Transactions' },
  { path: '/wallet', icon: <MdAccountBalanceWallet />, label: 'Wallet' },
  { path: '/investments', icon: <MdShowChart />, label: 'Investments' },
  { path: '/goals', icon: <MdAttachMoney />, label: 'Goals' },
  { path: '/budget', icon: <BsCardChecklist />, label: 'Budget' },
  { path: '/subscriptions', icon: <MdSubscriptions />, label: 'Subscriptions' },
  { path: '/debts', icon: <MdAttachMoney />, label: 'Debts & EMI' },
  { path: '/notes', icon: <MdNoteAlt />, label: 'Notes' },
  { path: '/taxes', icon: <MdCalculate />, label: 'Taxes' },
  { path: '/tools', icon: <MdHomeRepairService />, label: 'Tools' },
  { path: '/analytics', icon: <MdAnalytics />, label: 'Analytics' },
  { path: '/settings', icon: <MdSettings />, label: 'Settings' },
  { path: '/help', icon: <MdHelpOutline />, label: 'Help' },
];

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-screen w-64 bg-gradient-to-b from-sidebarGradientStart to-sidebarGradientEnd text-white p-4 shadow-xl"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold mb-8 pl-2 flex items-center"
      >
        <span className="text-white">xpense</span>
        <span className="text-primary">.ai</span>
      </motion.div>

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/80'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}

        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: menuItems.length * 0.05 }}
          className="flex items-center space-x-3 px-4 py-2.5 rounded-lg w-full hover:bg-white/10 text-white/80"
        >
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;