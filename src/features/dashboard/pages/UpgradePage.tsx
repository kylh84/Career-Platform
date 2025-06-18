import React, { useState } from 'react';
import { FaCreditCard, FaUniversity } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';

const UpgradePage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPayment, setSelectedPayment] = useState<'momo' | 'vnpay' | 'card' | 'bank'>('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    amount: number;
    orderId: string;
    qrCode: string;
    expiryTime: number;
  } | null>(null);
  const navigate = useNavigate();

  const upgradeData = {
    plan: 'Freemium',
    billingCycle: 'Monthly',
    expirationDate: 'February 10, 2024',
    paymentMethod: 'Visa •••• 1234',
  };

  const planPricing = {
    monthly: {
      price: 19.99,
      period: 'month',
      save: '',
    },
    yearly: {
      price: 199.99,
      period: 'year',
      save: '',
    },
  };

  const currentPlan = planPricing[billingCycle];

  const handleUpgrade = async () => {
    try {
      setIsProcessing(true);
      // In a real application, this would be an API call to create an order
      const orderData = {
        amount: currentPlan.price,
        paymentMethod: selectedPayment,
        billingCycle: billingCycle,
      };
      // Simulate API call with orderData
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock response based on orderData
      const response = {
        orderId: 'ORDER123',
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payment.momo.vn/${orderData.amount}`,
        expiryTime: 300, // 5 minutes
      };
      setCheckoutData({
        amount: orderData.amount,
        orderId: response.orderId,
        qrCode: response.qrCode,
        expiryTime: response.expiryTime,
      });
      navigate('checkout');
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (show error message to user)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-[32px] text-center font-bold mb-8">Upgrade to Premium</h1>
        {/* Current Plan & Billing Cycle */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] font-medium">Current Plan</span>
            <div className="flex bg-gray-100 rounded-lg border border-gray-300">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1 rounded-l-md font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1 rounded-r-md font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'}`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">{upgradeData.plan}</div>
        </div>
        {/* Premium Plan */}
        <div className="text-black rounded-xl overflow-hidden mb-6 border-2 border-blue-700">
          <div className="bg-blue-600 px-4 py-3">
            <div className="text-xl text-white font-medium">Premium</div>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold">${currentPlan.price}</span>
              <span className="text-sm">per {currentPlan.period}</span>
              {currentPlan.save && <span className="ml-2 text-sm text-green-600 font-medium">{currentPlan.save}</span>}
            </div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Full access
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Faster AI processing
              </li>
            </ul>
          </div>
        </div>
        {/* Payment Method */}
        <div>
          <label className="block text-[16px] font-medium mb-3">Payment Method</label>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <label className="flex items-center p-3 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-3" checked={selectedPayment === 'momo'} onChange={() => setSelectedPayment('momo')} />
              <div className="flex items-center gap-2">
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" alt="MoMo" className="w-6 h-6 object-contain" />
                MoMo
              </div>
            </label>
            <label className="flex items-center p-3 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-3" checked={selectedPayment === 'vnpay'} onChange={() => setSelectedPayment('vnpay')} />
              <div className="flex items-center gap-2">
                <img src="https://play-lh.googleusercontent.com/o-_z132f10zwrco4NXk4sFqmGylqXBjfcwR8-wK0lO1Wk4gzRXi4IZJdhwVlEAtpyQ" alt="VNPAY" className="w-6 h-6 object-contain" />
                VNPAY
              </div>
            </label>
            <label className="flex items-center p-3 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-3" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} />
              <div className="flex items-center gap-2">
                <FaCreditCard className="w-5 h-5 text-blue-600" />
                Visa o MasterCard
              </div>
            </label>
            <label className="flex items-center p-3 cursor-pointer hover:bg-gray-50">
              <input type="radio" name="payment" className="mr-3" checked={selectedPayment === 'bank'} onChange={() => setSelectedPayment('bank')} />
              <div className="flex items-center gap-2">
                <FaUniversity className="w-5 h-5 text-gray-400" />
                Bank
              </div>
            </label>
          </div>
        </div>
        {/* Upgrade Button */}
        <button
          onClick={handleUpgrade}
          disabled={isProcessing}
          className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-[16px] font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Upgrade'}
        </button>
      </div>
      {/* Checkout Modal qua Outlet */}
      <Outlet
        context={{
          checkoutData: checkoutData
            ? {
                amount: checkoutData.amount,
                qrCode: checkoutData.qrCode,
                expiryTime: checkoutData.expiryTime,
              }
            : undefined,
          onClose: () => navigate(-1),
        }}
      />
    </div>
  );
};

export default UpgradePage;
