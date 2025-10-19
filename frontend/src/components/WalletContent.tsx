import React from 'react';
import { CreditCard, PlusCircle } from 'lucide-react';
import type { WalletData, PaymentMethod, Invoice } from '../types';

  const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-6 rounded-2xl shadow-xl transition duration-300 ${className}`}>
      {children}
    </div>
  );

  // Helper for formatting currency
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  // Wallet Balance and Summary Card
  const BalanceSummaryCard: React.FC<{ availableBalance: number, thisMonthSpending: number }> = ({ availableBalance, thisMonthSpending }) => (
    <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-purple-900 to-indigo-900">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Wallet</h2>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-purple-300">Available Balance</p>
          <p className="text-5xl font-extrabold text-white">{formatCurrency(availableBalance)}</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl text-right">
          <p className="text-sm text-purple-300">This Month</p>
          <p className="text-3xl font-bold text-white">{formatCurrency(thisMonthSpending)}</p>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button className="flex-1 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-md transition duration-150">
          Withdraw
        </button>
        <button className="flex-1 py-3 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition duration-150">
          Export
        </button>
      </div>
    </Card>
  );

  // Monthly Invoices Card
  const MonthlyInvoicesCard: React.FC<{ invoices: Invoice[] }> = ({ invoices }) => (
    <Card className="col-span-1 bg-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4">Monthly Invoices</h2>
      <div className="space-y-3">
        {invoices.map((invoice, index) => (
          <div key={index} className="flex justify-between items-center text-gray-300 hover:bg-gray-700 p-2 rounded-lg transition duration-150">
            <div>
              <p className="font-medium">{invoice.month}</p>
              <p className="text-sm text-purple-400">{formatCurrency(invoice.amount)}</p>
            </div>
            <CreditCard className="w-5 h-5 text-purple-500" />
          </div>
        ))}
      </div>
    </Card>
  );

  // Add Credits Section
  const AddCreditsSection: React.FC = () => (
    <div className="col-span-full md:col-span-2 space-y-4">
      <h2 className="text-2xl font-bold text-white pt-4">Add Credits</h2>

      {/* Amount Selection */}
      <Card className="bg-gray-800">
        <p className="text-lg font-medium text-gray-300 mb-4">Select Amount</p>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {['$10', '$25', '$50', '$100', '$200'].map((amount) => (
            <button key={amount} className="py-2.5 text-lg font-semibold rounded-lg transition duration-150 bg-purple-700 text-white hover:bg-purple-600">
              {amount}
            </button>
          ))}
        </div>

        <p className="text-lg font-medium text-gray-300 mb-2">Or Enter Custom Amount</p>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
          <input
            type="number"
            placeholder="Enter Custom Amount"
            className="w-full bg-indigo-900/50 text-white p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>
      </Card>

      {/* Bonus Credits */}
      <Card className="bg-gray-800">
        <div className="flex items-center mb-4">
            <PlusCircle className="w-6 h-6 mr-3 text-yellow-400" />
            <p className="text-xl font-medium text-yellow-300">Bonus Credits!</p>
        </div>
        <p className="text-sm text-gray-400 mb-4">Add $100+ and get 10% bonus - Add $200+ and get 15% bonus</p>

        <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="flex flex-col">
            <span className="font-semibold">Amount</span>
            <span className="text-white font-bold">$0.00</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Bonus</span>
            <span className="text-yellow-400 font-bold">$0.00</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Total Credits</span>
            <span className="text-green-400 font-bold text-lg">$0.00</span>
          </div>
        </div>
      </Card>
    </div>
  );

  // Payment Methods Card
  const PaymentMethodsCard: React.FC<{ paymentMethods: PaymentMethod[] }> = ({ paymentMethods }) => (
    <div className="col-span-full md:col-span-1 space-y-4">
      <div className="flex justify-between items-center pt-4">
        <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
        <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center">
            <PlusCircle className="w-4 h-4 mr-1" /> Add New
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="bg-indigo-900/50 p-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 mr-3 text-white" />
                <div>
                  <p className="text-lg font-semibold text-white">{method.type}</p>
                  <p className="text-sm text-gray-300">****{method.lastFour}</p>
                  <p className="text-xs text-gray-400">Expires {method.expiry}</p>
                </div>
              </div>
              {method.isDefault && (
                <span className="text-xs font-semibold px-3 py-1 bg-purple-700 rounded-full text-white">
                  Default
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

    interface WalletContentProps {
        data: WalletData;
    }

export const WalletContent: React.FC<WalletContentProps> = ({ data }) => {
    const { availableBalance, thisMonthSpending, invoices, paymentMethods } = data;

    return (
        <div className="p-8 space-y-8 min-h-screen bg-gray-900 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8">
            <BalanceSummaryCard availableBalance={availableBalance} thisMonthSpending={thisMonthSpending}/>
            <MonthlyInvoicesCard invoices={invoices}/>
            </div>

            <AddCreditsSection />
            <PaymentMethodsCard paymentMethods={paymentMethods} />
        </div>
        </div>
    );
};