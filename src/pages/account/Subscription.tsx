import React from 'react';
import { Button } from '../../components/common';

const Subscription: React.FC = () => {
  // Giả lập dữ liệu gói và usage
  const plan = 'Freemium';
  const cvUsage = 3;
  const codeUsage = 2;
  const cvLimit = 5;
  const codeLimit = 5;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Subscription</h2>
      <div className="mb-4">
        <div className="font-semibold">
          Current Plan: <span className="text-blue-700">{plan}</span>
        </div>
      </div>
      <div className="mb-4">
        <div>
          CV Usage:{' '}
          <span className="font-semibold">
            {cvUsage}/{cvLimit}
          </span>
        </div>
        <div>
          Code Usage:{' '}
          <span className="font-semibold">
            {codeUsage}/{codeLimit}
          </span>
        </div>
      </div>
      <Button variant="primary" className="w-full">
        Upgrade Plan
      </Button>
    </div>
  );
};

export default Subscription;
