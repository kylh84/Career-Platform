import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/common';
import { FaCheckCircle } from 'react-icons/fa';
import mockTransactions from '../data/mockTransactions';

const TransactionDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const tx = mockTransactions[transactionId ? Number(transactionId) : 0];

  if (!tx) return <div className="p-8 text-center">Transaction not found.</div>;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 px-2 sm:px-4 mt-8">
      <div className="w-full max-w-[26rem] bg-white rounded-xl shadow p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Billing Details</h2>
        <div className="border-t border-b divide-y">
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Transaction ID</span>
            <span>{tx.transactionId}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Invoice No.</span>
            <span>{tx.invoiceNo}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Date Paid</span>
            <span>{tx.date}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Amount</span>
            <span className="flex items-center gap-1 font-semibold ">
              <FaCheckCircle className="text-green-500 text-base" />
              {tx.amount}
            </span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Payment Method</span>
            <span>{tx.method}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Plan</span>
            <span>{tx.plan}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Billing Cycle</span>
            <span>{tx.billingCycle}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">Expiration Date</span>
            <span>{tx.expiration}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="font-medium">User</span>
            <span>{tx.user}</span>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="primary" className="flex-1">
            Download Invoice
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => navigate('/dashboard/account/subscription/transactions')}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
