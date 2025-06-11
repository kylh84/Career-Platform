import React, { useState, useEffect } from 'react';
import { FaRegCopy } from 'react-icons/fa6';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  qrCode: string;
  expiryTime: number; // in seconds
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, amount, qrCode, expiryTime }) => {
  const [timeLeft, setTimeLeft] = useState(expiryTime);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const getPaymentLink = (qrUrl: string) => {
    const url = new URL(qrUrl);
    return url.searchParams.get('data') || '';
  };
  const handleCopyLink = () => {
    // In a real application, this would be the actual payment link
    navigator.clipboard.writeText(getPaymentLink(qrCode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-[20px] w-80 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-lg border border-gray-200">
        {/* Header */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-center mb-4">Checkout</h3>

          {/* Amount and Status */}
          <div className="flex items-center justify-between mb-6">
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png" alt="MoMo" className="w-12 h-12 rounded-lg" />
            <div className="text-right">
              <div className="text-2xl font-bold leading-snug">${amount}</div>
              <div className="text-sm text-gray-500 leading-none">Pending...</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white mb-2">
            <img src={qrCode} alt="QR Code" className="w-40 sm:w-52 md:w-56 mx-auto aspect-square object-contain mb-4" />
          </div>

          <p className="text-center text-sm font-medium mb-2">Scan this QR code with the MoMo app</p>

          {/* Timer */}
          <p className="text-center text-lg text-gray-600 mb-6">Expires in {formatTime(timeLeft)}</p>

          {/* Copy Payment Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm mb-4"
          >
            <FaRegCopy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy payment link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
