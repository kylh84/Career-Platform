import { useNavigate } from 'react-router-dom';

const CancelSubscriptionModal = ({ subscriptionData }: { subscriptionData: { expirationDate: string } }) => {
  const navigate = useNavigate();
  return (
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
            <button onClick={() => navigate(-1)} className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-lg text-[16px] hover:bg-blue-700">
              Cancel Subscription
            </button>
            <button onClick={() => navigate(-1)} className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-[16px] hover:bg-gray-50">
              Stay Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;
