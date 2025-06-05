import React, { useState } from 'react';
const Subscription: React.FC = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const subscriptionData = {
    plan: 'Freemium',
    billingCycle: 'Monthly',
    expirationDate: 'February 10, 2024',
    paymentMethod: 'Visa •••• 1234',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-[32px] text-center font-bold mb-8">Manage Subscription</h1>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
          {/* Current Plan */}
          <div>
            <label className="block text-[20px] font-medium mb-2">Current Plan</label>
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">{subscriptionData.plan}</div>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-[20px] font-medium mb-2">Billing Cycle</label>
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">{subscriptionData.billingCycle}</div>
          </div>

          {/* Expiration Date */}
          <div>
            <label className="block text-[20px] font-medium mb-2">Expiration Date</label>
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">{subscriptionData.expirationDate}</div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-[20px] font-medium mb-2">Payment Method</label>
            <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">{subscriptionData.paymentMethod}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-[16px] hover:bg-gray-50">Change Plan</button>
          <button onClick={() => setShowCancelModal(true)} className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg text-[16px] hover:bg-blue-700">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-[24px] font-bold mb-6 text-center">Cancel Subscription</h2>
            <div className="text-start">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-2xl mt-[-5px]">⚠️</span>
                <span className="text-lg font-semibold leading-snug">Are you sure you want to cancel your subscription?</span>
              </div>
              <p className="text-gray-600 mb-8">You will lose access to premium features from {subscriptionData.expirationDate}.</p>
              <div className="space-y-3">
                <button onClick={() => setShowCancelModal(false)} className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg text-[16px] hover:bg-blue-700">
                  Cancel Subscription
                </button>
                <button onClick={() => setShowCancelModal(false)} className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-[16px] hover:bg-gray-50">
                  Stay Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
