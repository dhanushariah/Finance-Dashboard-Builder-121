import React from 'react';
import { motion } from 'framer-motion';
import CategoryManager from './CategoryManager';

const CategoryManagerModal = ({ isOpen, onClose, categories, onCategoryChange, type }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg w-full max-w-lg"
      >
        <CategoryManager
          categories={categories}
          onCategoryChange={onCategoryChange}
          type={type}
        />
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryManagerModal;