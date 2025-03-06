import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  // Sample data - in a real app, this would come from your data store
  const incomeData = [4500, 5200, 4800, 5100, 4900, 5300, 5000, 5400, 5200, 5500, 5300, 5600];
  const expenseData = [3800, 4100, 3900, 4000, 3950, 4200, 4100, 4300, 4150, 4400, 4250, 4500];
  const savingsData = incomeData.map((income, idx) => income - expenseData[idx]);

  const categoryExpenses = {
    'Food & Dining': 25,
    'Transportation': 15,
    'Shopping': 20,
    'Bills & Utilities': 30,
    'Entertainment': 10
  };

  const getIncomeVsExpenseOption = () => ({
    title: {
      text: 'Income vs Expense',
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Income', 'Expense', 'Savings'],
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
      type: 'category',
      boundaryGap: false,
      data: months,
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    series: [
      {
        name: 'Income',
        type: 'line',
        data: incomeData,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Expense',
        type: 'line',
        data: expenseData,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Savings',
        type: 'line',
        data: savingsData,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  });

  const getExpenseByCategoryOption = () => ({
    title: {
      text: 'Expense by Category',
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    series: [
      {
        name: 'Expense Categories',
        type: 'pie',
        radius: '70%',
        data: Object.entries(categoryExpenses).map(([name, value]) => ({
          name,
          value
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  const getSavingsTrendOption = () => ({
    title: {
      text: 'Savings Trend',
      textStyle: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: isDarkMode ? '#ffffff' : '#333333'
      }
    },
    series: [
      {
        data: savingsData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {selectedPeriod === 'monthly' && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <ReactECharts option={getIncomeVsExpenseOption()} style={{ height: '400px' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <ReactECharts option={getExpenseByCategoryOption()} style={{ height: '400px' }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
      >
        <ReactECharts option={getSavingsTrendOption()} style={{ height: '400px' }} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Average Monthly Income</h3>
          <p className="text-2xl font-bold text-green-500">
            ₹{(incomeData.reduce((a, b) => a + b) / 12).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Average Monthly Expense</h3>
          <p className="text-2xl font-bold text-red-500">
            ₹{(expenseData.reduce((a, b) => a + b) / 12).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Average Monthly Savings</h3>
          <p className="text-2xl font-bold text-blue-500">
            ₹{(savingsData.reduce((a, b) => a + b) / 12).toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Savings Rate</h3>
          <p className="text-2xl font-bold text-primary">
            {Math.round((savingsData.reduce((a, b) => a + b) / incomeData.reduce((a, b) => a + b)) * 100)}%
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;