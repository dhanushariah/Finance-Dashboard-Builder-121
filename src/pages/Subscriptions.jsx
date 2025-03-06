import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdCalendarToday } from 'react-icons/md';

const categories = [
  'Streaming', 'Software', 'Gaming', 'Cloud Storage', 
  'Music', 'Fitness', 'News', 'Other'
];

const billingCycles = ['Monthly', 'Quarterly', 'Yearly'];

const SubscriptionForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    name: '',
    amount: '',
    category: '',
    billingCycle: 'Monthly',
    nextBilling: new Date().toISOString().split('T')[0],
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
              Subscription Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter subscription name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter amount"
            />
          </div>
        </div>

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
              Billing Cycle
            </label>
            <select
              value={formData.billingCycle}
              onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              {billingCycles.map(cycle => (
                <option key={cycle} value={cycle}>{cycle}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Next Billing Date
            </label>
            <input
              type="date"
              value={formData.nextBilling}
              onChange={(e) => setFormData({ ...formData, nextBilling: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
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
            {editData ? 'Update' : 'Add'} Subscription
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const SubscriptionCard = ({ subscription, onEdit, onDelete }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{subscription.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subscription.category}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(subscription)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(subscription.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdDelete className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold dark:text-white">
          ₹{Number(subscription.amount).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {subscription.billingCycle}
        </p>
      </div>
      
      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <MdCalendarToday className="mr-2" />
        Next billing: {new Date(subscription.nextBilling).toLocaleDateString()}
      </div>
    </motion.div>
  );
};

const Subscriptions = () => {
  const [showForm, setShowForm] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscription, setEditingSubscription] = useState(null);

  const calculateTotalMonthly = () => {
    return subscriptions.reduce((total, sub) => {
      let amount = Number(sub.amount);
      switch (sub.billingCycle) {
        case 'Monthly':
          return total + amount;
        case 'Quarterly':
          return total + (amount / 3);
        case 'Yearly':
          return total + (amount / 12);
        default:
          return total;
      }
    }, 0);
  };

  const handleSubmit = (formData) => {
    if (editingSubscription) {
      setSubscriptions(subscriptions.map(s => 
        s.id === editingSubscription.id ? { ...formData, id: s.id } : s
      ));
      setEditingSubscription(null);
    } else {
      setSubscriptions([...subscriptions, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">Subscriptions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monthly Total: ₹{calculateTotalMonthly().toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Subscription</span>
        </button>
      </div>

      {showForm && (
        <SubscriptionForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingSubscription(null);
          }}
          editData={editingSubscription}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map(subscription => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;