import React, { useState } from 'react';

const UpgradePage: React.FC = () => {
  const [method, setMethod] = useState('credit');
  const [success, setSuccess] = useState(false);

  const handleUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
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
        <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium">
          Upgrade
        </button>
      </form>
      {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 max-w-md mx-auto text-center">Upgrade successful! Enjoy your Premium plan.</div>}
    </div>
  );
};

export default UpgradePage;
