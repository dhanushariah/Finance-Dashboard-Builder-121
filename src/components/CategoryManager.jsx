import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';

const CategoryManager = ({ categories, onCategoryChange, type = 'expense' }) => {
  const [newCategory, setNewCategory] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      toast.error('Category already exists');
      return;
    }

    onCategoryChange([...categories, newCategory.trim()]);
    setNewCategory('');
    setShowInput(false);
    toast.success('Category added successfully');
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you sure you want to delete "${category}" category?`)) {
      onCategoryChange(categories.filter(c => c !== category));
      toast.success('Category deleted successfully');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-white">
          {type.charAt(0).toUpperCase() + type.slice(1)} Categories
        </h3>
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center space-x-2 text-primary hover:text-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Category</span>
        </button>
      </div>

      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter category name"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
          >
            Add
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="px-4 py-2 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="dark:text-gray-300">{category}</span>
            <button
              onClick={() => handleDeleteCategory(category)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <MdDelete className="text-red-500" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;