import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import ReactECharts from 'echarts-for-react';

const categories = [
  'Housing', 'Transportation', 'Food', 'Utilities',
  'Insurance', 'Healthcare', 'Savings', 'Entertainment',
  'Shopping', 'Personal Care', 'Education', 'Other'
];

const BudgetForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    category: '',
    amount: '',
    spent: '0',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Budget Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter budget amount"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Spent Amount
            </label>
            <input
              type="number"
              value={formData.spent}
              onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter spent amount"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter description"
            />
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
            {editData ? 'Update' : 'Add'} Budget
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const progress = (Number(budget.spent) / Number(budget.amount)) * 100;
  const remaining = Number(budget.amount) - Number(budget.spent);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{budget.category}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{budget.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(budget)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(budget.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdDelete className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-300">Budget</span>
          <span className="font-semibold dark:text-white">
            ₹{Number(budget.amount).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-300">Spent</span>
          <span className="font-semibold text-red-500">
            ₹{Number(budget.spent).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Remaining</span>
          <span className="font-semibold text-green-500">
            ₹{remaining.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full ${
              progress > 90 ? 'bg-red-500' : progress > 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {Math.round(progress)}% of budget used
        </p>
      </div>
    </motion.div>
  );
};

const Budget = () => {
  const [showForm, setShowForm] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);

  const handleSubmit = (formData) => {
    if (editingBudget) {
      setBudgets(budgets.map(b => 
        b.id === editingBudget.id ? { ...formData, id: b.id } : b
      ));
      setEditingBudget(null);
    } else {
      setBudgets([...budgets, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const getPieChartOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ₹{c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: 'Budget Distribution',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: budgets.map(budget => ({
          name: budget.category,
          value: Number(budget.amount)
        }))
      }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">Budget Planning</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Total Budget: ₹{budgets.reduce((sum, b) => sum + Number(b.amount), 0).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Budget</span>
        </button>
      </div>

      {showForm && (
        <BudgetForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingBudget(null);
          }}
          editData={editingBudget}
        />
      )}

      {budgets.length > 0 && (
        <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Budget Distribution</h2>
          <ReactECharts option={getPieChartOption()} style={{ height: '400px' }} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map(budget => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Budget;