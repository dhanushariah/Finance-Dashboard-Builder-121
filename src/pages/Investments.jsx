import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdDelete, MdEdit, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ReactECharts from 'echarts-for-react';
import { useTheme } from '../hooks/useTheme';
import toast from 'react-hot-toast';

const categories = [
  'Stocks',
  'Mutual Funds',
  'Fixed Deposits',
  'Real Estate',
  'Gold',
  'Cryptocurrency',
  'Bonds',
  'PPF',
  'NPS',
  'Others'
];

const InvestmentForm = ({ onSubmit, onClose, editData }) => {
  const [formData, setFormData] = useState(editData || {
    name: '',
    category: '',
    amount: '',
    currentValue: '',
    startDate: new Date().toISOString().split('T')[0],
    description: '',
    returns: '',
    goal: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.category) {
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
          {editData ? 'Edit Investment' : 'Add New Investment'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investment Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter investment name"
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
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Invested Amount *
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter invested amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Value
              </label>
              <input
                type="number"
                value={formData.currentValue}
                onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter current value"
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
                Expected Returns (% p.a)
              </label>
              <input
                type="number"
                value={formData.returns}
                onChange={(e) => setFormData({ ...formData, returns: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter expected returns"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
              placeholder="Add notes about this investment"
              rows="2"
            />
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
              {editData ? 'Update' : 'Add'} Investment
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const InvestmentCard = ({ investment, onEdit, onDelete }) => {
  const returns = ((Number(investment.currentValue) - Number(investment.amount)) / Number(investment.amount)) * 100;
  const isProfit = returns >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{investment.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{investment.category}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(investment)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdEdit className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(investment.id)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <MdDelete className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={Math.abs(returns)}
            text={`${Math.round(returns)}%`}
            styles={buildStyles({
              textSize: '1.5rem',
              pathColor: isProfit ? '#10B981' : '#EF4444',
              textColor: isProfit ? '#10B981' : '#EF4444',
              trailColor: '#d6d6d6',
            })}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">Invested</span>
            <span className="font-semibold dark:text-white">
              ₹{Number(investment.amount).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-300">Current Value</span>
            <span className="font-semibold text-primary">
              ₹{Number(investment.currentValue).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Returns</span>
            <span className={`font-semibold flex items-center ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
              {isProfit ? <MdTrendingUp className="mr-1" /> : <MdTrendingDown className="mr-1" />}
              {Math.abs(returns).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600 dark:text-gray-300">Start Date</span>
          <span className="dark:text-white">
            {new Date(investment.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Expected Returns</span>
          <span className="dark:text-white">{investment.returns}% p.a.</span>
        </div>
      </div>
    </motion.div>
  );
};

const InvestmentPerformanceChart = ({ investments }) => {
  const { isDarkMode } = useTheme();
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Invested Amount', 'Current Value'],
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    yAxis: {
      type: 'category',
      data: investments.map(inv => inv.name),
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    series: [
      {
        name: 'Invested Amount',
        type: 'bar',
        data: investments.map(inv => Number(inv.amount))
      },
      {
        name: 'Current Value',
        type: 'bar',
        data: investments.map(inv => Number(inv.currentValue))
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

const Investments = () => {
  const [showForm, setShowForm] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isDarkMode } = useTheme();

  const handleSubmit = (formData) => {
    if (editingInvestment) {
      setInvestments(investments.map(i => 
        i.id === editingInvestment.id ? { ...formData, id: i.id } : i
      ));
      setEditingInvestment(null);
      toast.success('Investment updated successfully');
    } else {
      setInvestments([...investments, { ...formData, id: Date.now() }]);
      toast.success('Investment added successfully');
    }
    setShowForm(false);
  };

  const handleEdit = (investment) => {
    setEditingInvestment(investment);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      setInvestments(investments.filter(i => i.id !== id));
      toast.success('Investment deleted successfully');
    }
  };

  const getPieChartOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ₹{c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    series: [
      {
        name: 'Portfolio Distribution',
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
        data: categories.map(category => ({
          name: category,
          value: investments
            .filter(inv => inv.category === category)
            .reduce((sum, inv) => sum + Number(inv.currentValue), 0)
        })).filter(item => item.value > 0)
      }
    ]
  });

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalValue = investments.reduce((sum, inv) => sum + Number(inv.currentValue), 0);
  const totalReturns = ((totalValue - totalInvested) / totalInvested) * 100;

  const filteredInvestments = investments.filter(inv => 
    selectedCategory === 'all' || inv.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold dark:text-white">Investment Portfolio</h1>
          <div className="mt-2 space-x-4">
            <span className="text-gray-500 dark:text-gray-400">
              Total Invested: ₹{totalInvested.toLocaleString()}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              Current Value: ₹{totalValue.toLocaleString()}
            </span>
            <span className={`${totalReturns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              Returns: {totalReturns.toFixed(2)}%
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          <MdAdd className="text-xl" />
          <span>Add Investment</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <InvestmentForm
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingInvestment(null);
          }}
          editData={editingInvestment}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Portfolio Distribution</h2>
          <ReactECharts option={getPieChartOption()} style={{ height: '400px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Investment Performance</h2>
          <InvestmentPerformanceChart investments={investments} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestments.map(investment => (
          <InvestmentCard
            key={investment.id}
            investment={investment}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Investments;