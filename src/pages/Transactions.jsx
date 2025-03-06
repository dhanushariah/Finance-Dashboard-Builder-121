import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdFilterList, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Rental', 'Business', 'Dividends', 'Other'],
  expense: [
    'Food & Dining', 
    'Transport',
    'Shopping',
    'Bills & Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Travel',
    'Personal Care',
    'Home',
    'Other'
  ]
};

const TransactionForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
    tags: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    toast.success(`Transaction ${editData ? 'updated' : 'added'} successfully!`);
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
          {editData ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, category: '' })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 pl-7 focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select category</option>
                {categories[formData.type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Note (optional)
            </label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
              placeholder="Add any additional notes"
              rows="2"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-teal-600 transition-colors"
            >
              {editData ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const TransactionRow = ({ transaction, onEdit, onDelete }) => {
  const getEmoji = () => {
    const emojiMap = {
      'Food & Dining': '🍽️',
      'Transport': '🚗',
      'Shopping': '🛍️',
      'Bills & Utilities': '📱',
      'Entertainment': '🎮',
      'Healthcare': '🏥',
      'Education': '📚',
      'Travel': '✈️',
      'Personal Care': '💅',
      'Home': '🏠',
      'Salary': '💰',
      'Freelance': '💻',
      'Investments': '📈',
      'Rental': '🏘️',
      'Business': '💼',
      'Dividends': '💸',
      'Other': '📝'
    };
    return emojiMap[transaction.category] || '💳';
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <td className="py-4 px-4 dark:text-gray-300">
        {format(new Date(transaction.date), 'MMM dd, yyyy')}
      </td>
      <td className="py-4 px-4 dark:text-gray-300">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{getEmoji()}</span>
          <span>{transaction.category}</span>
        </div>
      </td>
      <td className="py-4 px-4 dark:text-gray-300">{transaction.description}</td>
      <td className={`py-4 px-4 text-right font-semibold ${
        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
      }`}>
        {transaction.type === 'expense' ? '- ' : '+ '}
        ₹{Number(transaction.amount).toLocaleString()}
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(transaction)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(transaction.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <MdDelete className="text-gray-500 dark:text-gray-400" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

const Transactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSubmit = (formData) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? { ...formData, id: t.id } : t
      ));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
      toast.success('Transaction deleted successfully');
    }
  };

  const filteredTransactions = transactions
    .filter(t => {
      if (filter === 'all') return true;
      return t.type === filter;
    })
    .filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Transactions</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          <MdAdd className="text-xl" />
          <span>Add Transaction</span>
        </motion.button>
      </div>

      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Search transactions..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <MdFilterList className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {showForm && (
        <TransactionForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
          editData={editingTransaction}
        />
      )}

      <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Category</th>
                <th className="text-left py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Description</th>
                <th className="text-right py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Amount</th>
                <th className="text-right py-4 px-4 text-gray-600 dark:text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;