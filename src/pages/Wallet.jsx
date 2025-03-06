import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdAccountBalance, MdCurrencyBitcoin } from 'react-icons/md';
import { FaEthereum } from 'react-icons/fa';

const walletTypes = {
  fiat: ['INR', 'USD', 'EUR', 'GBP'],
  crypto: ['BTC', 'ETH', 'BNB', 'USDT']
};

const WalletCard = ({ wallet, onEdit, onDelete }) => {
  const getIcon = () => {
    switch(wallet.currency) {
      case 'BTC':
        return <MdCurrencyBitcoin className="text-2xl text-orange-500" />;
      case 'ETH':
        return <FaEthereum className="text-2xl text-blue-500" />;
      default:
        return <MdAccountBalance className="text-2xl text-gray-500" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <h3 className="text-lg font-semibold dark:text-white">{wallet.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.type} - {wallet.currency}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(wallet)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(wallet.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdDelete className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold dark:text-white">
          {wallet.currency} {Number(wallet.balance).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
};

const WalletForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    type: 'fiat',
    currency: '',
    name: '',
    balance: ''
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
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value, currency: '' })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              <option value="fiat">Fiat</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              <option value="">Select currency</option>
              {walletTypes[formData.type].map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Wallet Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter wallet name"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Balance
            </label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Enter balance"
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
            {editData ? 'Update' : 'Add'} Wallet
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const Wallet = () => {
  const [showForm, setShowForm] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [editingWallet, setEditingWallet] = useState(null);

  const handleSubmit = (formData) => {
    if (editingWallet) {
      setWallets(wallets.map(w => 
        w.id === editingWallet.id ? { ...formData, id: w.id } : w
      ));
      setEditingWallet(null);
    } else {
      setWallets([...wallets, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleEdit = (wallet) => {
    setEditingWallet(wallet);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Wallets</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Wallet</span>
        </button>
      </div>

      {showForm && (
        <WalletForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingWallet(null);
          }}
          editData={editingWallet}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map(wallet => (
          <WalletCard
            key={wallet.id}
            wallet={wallet}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Wallet;