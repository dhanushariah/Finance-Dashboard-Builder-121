// Previous code remains, add these new tools:

const EMICalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    const principal = Number(amount);
    const ratePerMonth = (Number(rate) / 12) / 100;
    const months = Number(tenure) * 12;
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, months) / (Math.pow(1 + ratePerMonth, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    });
  };

  return (
    <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">EMI Calculator</h2>
      <form onSubmit={calculateEMI} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Interest Rate (% p.a)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter interest rate"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loan Tenure (Years)
          </label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter loan tenure"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          Calculate EMI
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">Monthly EMI:</p>
            <p className="text-2xl font-bold text-primary">₹{result.emi.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">Total Interest:</p>
              <p className="text-xl font-bold text-red-500">₹{result.totalInterest.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">Total Amount:</p>
              <p className="text-xl font-bold text-green-500">₹{result.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PPFCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculatePPF = (e) => {
    e.preventDefault();
    const rate = 7.1; // Current PPF interest rate
    const yearlyInvestment = Number(monthlyInvestment) * 12;
    let totalInvestment = 0;
    let maturityAmount = 0;

    for (let i = 0; i < Number(years); i++) {
      totalInvestment += yearlyInvestment;
      maturityAmount = (maturityAmount + yearlyInvestment) * (1 + rate / 100);
    }

    setResult({
      totalInvestment: Math.round(totalInvestment),
      maturityAmount: Math.round(maturityAmount),
      totalInterest: Math.round(maturityAmount - totalInvestment)
    });
  };

  return (
    <div className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">PPF Calculator</h2>
      <form onSubmit={calculatePPF} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Monthly Investment
          </label>
          <input
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter monthly investment"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Period (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
            placeholder="Enter time period"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
        >
          Calculate Returns
        </button>
      </form>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">Maturity Amount:</p>
            <p className="text-2xl font-bold text-primary">₹{result.maturityAmount.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">Total Investment:</p>
              <p className="text-xl font-bold text-blue-500">₹{result.totalInvestment.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">Total Interest:</p>
              <p className="text-xl font-bold text-green-500">₹{result.totalInterest.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// In the Tools component, add the new calculators:
const Tools = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-white">Financial Tools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FinancialCalculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <EMICalculator />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PPFCalculator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CurrencyConverter />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <BankStatementAnalyzer />
      </motion.div>
    </div>
  );
};