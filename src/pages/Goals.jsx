import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const GoalForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    name: '',
    targetAmount: '',
    savedAmount: '',
    deadline: '',
    category: '',
    description: '',
    image: null,
    imageUrl: ''
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {editData ? 'Edit Goal' : 'Add New Goal'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Goal Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter goal name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              >
                <option value="">Select category</option>
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Property">Property</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Amount *
              </label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter target amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Saved Amount
              </label>
              <input
                type="number"
                value={formData.savedAmount}
                onChange={(e) => setFormData({ ...formData, savedAmount: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter saved amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deadline *
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Add description for your goal"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Goal Image
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-700'}
                hover:border-primary dark:hover:border-primary transition-colors`}
            >
              <input {...getInputProps()} />
              {formData.imageUrl ? (
                <div className="relative">
                  <img
                    src={formData.imageUrl}
                    alt="Goal preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <MdDelete />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <MdAdd className="mx-auto text-4xl text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload goal image'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-teal-600"
            >
              {editData ? 'Update' : 'Add'} Goal
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const progress = (Number(goal.savedAmount) / Number(goal.targetAmount)) * 100;
  const remaining = Number(goal.targetAmount) - Number(goal.savedAmount);
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard rounded-xl shadow-lg overflow-hidden"
    >
      {goal.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={goal.imageUrl}
            alt={goal.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold dark:text-white">{goal.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{goal.category}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(goal)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MdEdit className="text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <MdDelete className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="w-20 h-20">
            <CircularProgressbar
              value={progress}
              text={`${Math.round(progress)}%`}
              styles={buildStyles({
                textSize: '1.5rem',
                pathColor: '#00B8A9',
                textColor: '#00B8A9',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Target</span>
              <span className="font-semibold dark:text-white">
                ₹{Number(goal.targetAmount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-300">Saved</span>
              <span className="font-semibold text-green-500">
                ₹{Number(goal.savedAmount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Remaining</span>
              <span className="font-semibold text-red-500">
                ₹{remaining.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {daysLeft > 0 ? (
            <p>{daysLeft} days left to achieve this goal</p>
          ) : (
            <p className="text-red-500">Goal deadline has passed</p>
          )}
        </div>

        {goal.description && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {goal.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const Goals = () => {
  const [showForm, setShowForm] = useState(false);
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSubmit = (formData) => {
    if (editingGoal) {
      setGoals(goals.map(g => 
        g.id === editingGoal.id ? { ...formData, id: g.id } : g
      ));
      setEditingGoal(null);
      toast.success('Goal updated successfully');
    } else {
      setGoals([...goals, { ...formData, id: Date.now() }]);
      toast.success('Goal added successfully');
    }
    setShowForm(false);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(g => g.id !== id));
      toast.success('Goal deleted successfully');
    }
  };

  const categories = ['all', 'Savings', 'Investment', 'Property', 'Education', 'Travel', 'Vehicle', 'Other'];
  const filteredGoals = goals.filter(goal => 
    selectedCategory === 'all' || goal.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Financial Goals</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {showForm && (
        <GoalForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingGoal(null);
          }}
          editData={editingGoal}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGoals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Goals;