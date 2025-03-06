import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaxCalculator = () => {
  const [formData, setFormData] = useState({
    salary: '',
    investmentUnder80C: '',
    hraExemption: '',
    standardDeduction: 50000,
    otherIncome: '',
    nps: '',
    medicalInsurance: '',
    homeLoanInterest: '',
    educationLoanInterest: ''
  });

  const [result, setResult] = useState(null);

  const calculateTax = () => {
    // Convert string inputs to numbers
    const income = {
      salary: Number(formData.salary) || 0,
      otherIncome: Number(formData.otherIncome) || 0
    };

    const deductions = {
      section80C: Math.min(Number(formData.investmentUnder80C) || 0, 150000),
      standardDeduction: 50000,
      hra: Number(formData.hraExemption) || 0,
      nps: Math.min(Number(formData.nps) || 0, 50000),
      medicalInsurance: Math.min(Number(formData.medicalInsurance) || 0, 25000),
      homeLoanInterest: Math.min(Number(formData.homeLoanInterest) || 0, 200000),
      educationLoanInterest: Number(formData.educationLoanInterest) || 0
    };

    // Calculate total income
    const totalIncome = income.salary + income.otherIncome;

    // Calculate total deductions
    const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);

    // Calculate taxable income
    const taxableIncome = Math.max(totalIncome - totalDeductions, 0);

    // Calculate tax based on new tax regime
    let tax = 0;
    if (taxableIncome <= 300000) {
      tax = 0;
    } else if (taxableIncome <= 600000) {
      tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
      tax = 15000 + (taxableIncome - 600000) * 0.10;
    } else if (taxableIncome <= 1200000) {
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
      tax = 90000 + (taxableIncome - 1200000) * 0.20;
    } else {
      tax = 150000 + (taxableIncome - 1500000) * 0.30;
    }

    // Calculate cess
    const cess = tax * 0.04;

    // Calculate total tax
    const totalTax = tax + cess;

    setResult({
      totalIncome,
      totalDeductions,
      taxableIncome,
      tax,
      cess,
      totalTax
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-white">Tax Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Income Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Annual Salary
              </label>
              <input
                type="number"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter annual salary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Other Income
              </label>
              <input
                type="number"
                value={formData.otherIncome}
                onChange={(e) => setFormData({ ...formData, otherIncome: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter other income"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Investment under 80C (Max 1.5L)
              </label>
              <input
                type="number"
                value={formData.investmentUnder80C}
                onChange={(e) => setFormData({ ...formData, investmentUnder80C: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter 80C investments"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                HRA Exemption
              </label>
              <input
                type="number"
                value={formData.hraExemption}
                onChange={(e) => setFormData({ ...formData, hraExemption: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter HRA exemption"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                NPS Contribution (Max 50K)
              </label>
              <input
                type="number"
                value={formData.nps}
                onChange={(e) => setFormData({ ...formData, nps: e.target.value })}
                className="w-full rounded-lg border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2"
                placeholder="Enter NPS contribution"
              />
            </div>

            <button
              onClick={calculateTax}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-teal-600"
            >
              Calculate Tax
            </button>
          </div>
        </motion.div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-darkCard p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Tax Calculation Result</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Total Income</span>
                <span className="font-semibold dark:text-white">
                  ₹{result.totalIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Total Deductions</span>
                <span className="font-semibold dark:text-white">
                  ₹{result.totalDeductions.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Taxable Income</span>
                <span className="font-semibold dark:text-white">
                  ₹{result.taxableIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Income Tax</span>
                <span className="font-semibold dark:text-white">
                  ₹{result.tax.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Health & Education Cess (4%)</span>
                <span className="font-semibold dark:text-white">
                  ₹{result.cess.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 text-lg">
                <span className="text-gray-600 dark:text-gray-300">Total Tax Liability</span>
                <span className="font-bold text-primary">
                  ₹{result.totalTax.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;