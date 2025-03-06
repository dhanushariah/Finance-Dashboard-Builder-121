import React, { useState } from 'react';
import DashboardWidget from '../components/DashboardWidget';
import ReactECharts from 'echarts-for-react';

const Dashboard = () => {
  const [balances, setBalances] = useState({
    total: 2579957,
    income: 4579957,
    expense: 1579957,
    savings: 7579957
  });

  const moneyFlowOptions = {
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
      data: ['Income', 'Expenses']
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
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Income',
        type: 'line',
        data: [4000, 4500, 5100, 4800, 4700, 4900],
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: 'Expenses',
        type: 'line',
        data: [3000, 3200, 3500, 3300, 3400, 3100],
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  };

  const handleEdit = (type) => {
    const newAmount = prompt(`Enter new ${type} amount:`);
    if (newAmount && !isNaN(newAmount)) {
      setBalances(prev => ({
        ...prev,
        [type]: parseInt(newAmount)
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardWidget 
          title="Total Balance" 
          amount={balances.total}
          onEdit={() => handleEdit('total')}
        />
        <DashboardWidget 
          title="Income" 
          amount={balances.income}
          onEdit={() => handleEdit('income')}
          className="bg-green-50 dark:bg-green-900/20"
        />
        <DashboardWidget 
          title="Expense" 
          amount={balances.expense}
          onEdit={() => handleEdit('expense')}
          className="bg-red-50 dark:bg-red-900/20"
        />
        <DashboardWidget 
          title="Total Savings" 
          amount={balances.savings}
          onEdit={() => handleEdit('savings')}
          className="bg-blue-50 dark:bg-blue-900/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Money Flow</h2>
          <ReactECharts option={moneyFlowOptions} style={{ height: '400px' }} />
        </div>

        <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Budget</h2>
          {/* Budget visualization will be added here */}
        </div>
      </div>

      <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Transactions</h2>
        {/* Recent transactions list will be added here */}
      </div>

      <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Saving Goals</h2>
        {/* Saving goals progress will be added here */}
      </div>
    </div>
  );
};

export default Dashboard;