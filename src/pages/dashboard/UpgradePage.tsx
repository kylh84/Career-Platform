import React, { useState } from 'react';

const UpgradePage: React.FC = () => {
  const [method, setMethod] = useState('credit');
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing with a slight delay
    setTimeout(() => {
      setSuccess(true);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Upgrade to Premium</h2>
      <form onSubmit={handleUpgrade} className="bg-white rounded-xl shadow p-8 max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-1">Payment Method</label>
          <select className="w-full border rounded px-3 py-2" value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="credit">Credit Card</option>
            <option value="paypal">Paypal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium relative" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="opacity-0">Upgrade</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : (
            'Upgrade'
          )}
        </button>
      </form>

      <div className={`transition-all duration-500 ease-in-out ${success ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 max-w-md mx-auto text-center transform transition-transform duration-500 ease-in-out">
          Upgrade successful! Enjoy your Premium plan.
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
