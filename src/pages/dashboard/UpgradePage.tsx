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
    <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-[95%] sm:max-w-[440px] md:max-w-[480px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">Upgrade to Premium</h2>

        <form onSubmit={handleUpgrade} className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <div className="space-y-4 sm:space-y-5 mb-6">
            <div>
              <label className="block font-medium mb-1.5 text-sm sm:text-base text-gray-700">Payment Method</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm sm:text-base
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                          transition-colors duration-200"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="credit">Credit Card</option>
                <option value="paypal">Paypal</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <p className="flex items-center">
                <span className="mr-2">✓</span>
                Access to all premium features
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span>
                Priority support
              </p>
              <p className="flex items-center">
                <span className="mr-2">✓</span>
                Advanced analytics
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 px-4 rounded-lg text-sm sm:text-base
                     text-white bg-blue-600 hover:bg-blue-700 
                     transition-colors duration-200 font-medium relative
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isProcessing}
          >
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
              'Upgrade Now'
            )}
          </button>
        </form>

        <div className={`transition-all duration-500 ease-in-out ${success ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div
            className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-center
                        text-sm sm:text-base transform transition-transform duration-500 ease-in-out"
          >
            <p className="font-medium">🎉 Upgrade successful!</p>
            <p className="mt-1 text-green-600">Enjoy your Premium features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
