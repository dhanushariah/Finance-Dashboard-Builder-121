import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = (rate / 12) / 100;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi);
};

const DebtForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    name: '',
    type: 'Personal Loan',
    amount: '',
    remainingAmount: '',
    interestRate: '',
    tenure: '',
    startDate: new Date().toISOString().split('T')[0],
    emi: '',
    lender: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emi = calculateEMI(Number(formData.amount), Number(formData.interestRate), Number(formData.tenure));
    onSubmit({ ...formData, emi });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan/Debt Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter loan name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter total amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Remaining Amount
            </label>
            <input
              type="number"
              value={formData.remainingAmount}
              onChange={(e) => setFormData({ ...formData, remainingAmount: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter remaining amount"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tenure (months)
            </label>
            <input
              type="number"
              value={formData.tenure}
              onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter tenure in months"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lender
            </label>
            <input
              type="text"
              value={formData.lender}
              onChange={(e) => setFormData({ ...formData, lender: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter lender name"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
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
            {editData ? 'Update' : 'Add'} Debt/EMI
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const DebtCard = ({ debt, onEdit, onDelete }) => {
  const progress = ((Number(debt.amount) - Number(debt.remainingAmount)) / Number(debt.amount)) * 100;
  const monthsLeft = Number(debt.tenure) - Math.floor(
    (new Date() - new Date(debt.startDate)) / (1000 * 60 * 60 * 24 * 30)
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{debt.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{debt.type}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(debt)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(debt.id)}
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
            <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
            <span className="font-semibold dark:text-white">
              ₹{Number(debt.amount).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">EMI</span>
            <span className="font-semibold text-primary">
              ₹{Number(debt.emi).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Remaining</span>
            <span className="font-semibold text-red-500">
              ₹{Number(debt.remainingAmount).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">Interest Rate</span>
          <span className="dark:text-white">{debt.interestRate}% p.a.</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">Lender</span>
          <span className="dark:text-white">{debt.lender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Months Left</span>
          <span className="dark:text-white">{monthsLeft} months</span>
        </div>
      </div>
    </motion.div>
  );
};

const DebtsEMI = () => {
  const [showForm, setShowForm] = useState(false);
  const [debts, setDebts] = useState([]);
  const [editingDebt, setEditingDebt] = useState(null);

  const handleSubmit = (formData) => {
    if (editingDebt) {
      setDebts(debts.map(d => 
        d.id === editingDebt.id ? { ...formData, id: d.id } : d
      ));
      setEditingDebt(null);
    } else {
      setDebts([...debts, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (debt) => {
    setEditingDebt(debt);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.remainingAmount), 0);
  const totalEMI = debts.reduce((sum, debt) => sum + Number(debt.emi), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">Debts & EMI</h1>
          <div className="mt-2 space-x-4">
            <span className="text-gray-500 dark:text-gray-400">
              Total Debt: ₹{totalDebt.toLocaleString()}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              Monthly EMI: ₹{totalEMI.toLocaleString()}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Debt/EMI</span>
        </button>
      </div>

      {showForm && (
        <DebtForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingDebt(null);
          }}
          editData={editingDebt}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {debts.map(debt => (
          <DebtCard
            key={debt.id}
            debt={debt}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DebtsEMI;