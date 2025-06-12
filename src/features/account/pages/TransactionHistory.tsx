import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common';
import { FaChevronRight } from 'react-icons/fa6';
import mockTransactions from '../data/mockTransactions';

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const isActive = mockTransactions[0].status === 'Paid'; // Giả lập đang active

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 px-2 sm:px-4 mt-8">
      <div className="w-full max-w-[32rem] bg-white rounded-xl shadow p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Transaction History</h2>
        <div className="flex justify-end mb-4 sm:hidden">
          <Button variant="secondary" onClick={() => {}} className="border border-gray-300 text-sm font-semibold text-black bg-white px-3 py-1.5">
            Billing Info
          </Button>
        </div>
        {/* Table for sm and up */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-black font-medium border-b">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Payment Method</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/dashboard/account/subscription/transactions/${idx}`)}>
                  <td className="py-2 pr-4 ">{tx.date}</td>
                  <td className="py-2 pr-4">{tx.amount}</td>
                  <td className="py-2 pr-4">
                    {tx.status === 'Paid' ? (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded text-xs">Paid</span>
                    ) : (
                      <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs">Canceled</span>
                    )}
                  </td>
                  <td className="py-2 pr-4">{tx.method}</td>
                  <td className="py-2">
                    <FaChevronRight className="text-gray-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Card list for mobile */}
        <div className="block sm:hidden">
          <div className="flex flex-col gap-3">
            {mockTransactions.map((tx, idx) => (
              <div
                key={idx}
                className="bg-gray-100 rounded-lg p-4 flex items-center justify-between shadow-sm cursor-pointer"
                onClick={() => navigate(`/dashboard/account/subscription/transactions/${idx}`)}
              >
                <div>
                  <div className="font-semibold text-base mb-1">{tx.date}</div>
                  <div className="text-sm text-gray-700 mb-1">{tx.method}</div>
                  <div className="text-xs mb-1">
                    {tx.status === 'Paid' ? (
                      <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">Paid</span>
                    ) : (
                      <span className="bg-gray-300 text-gray-700 px-2 py-0.5 rounded text-xs">Canceled</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-lg">{tx.amount}</div>
                  <FaChevronRight className="text-gray-400 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-8">
          <Button variant="link" onClick={() => navigate('/dashboard/account')}>
            Back to Account
          </Button>
          <Button variant="primary" className="w-full" onClick={() => isActive && navigate('/dashboard/account/subscription/manage/cancel-confirm')} disabled={!isActive}>
            Cancel subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
