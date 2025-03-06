import React from 'react';
import { motion } from 'framer-motion';
import { MdEdit } from 'react-icons/md';

const DashboardWidget = ({ title, amount, onEdit, className }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 dark:text-gray-300">{title}</h3>
        <button 
          onClick={onEdit}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <MdEdit className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <p className="text-3xl font-semibold dark:text-white">₹{amount.toLocaleString()}</p>
    </motion.div>
  );
};

export default DashboardWidget;