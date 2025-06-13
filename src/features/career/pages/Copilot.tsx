import React from 'react';
import Assistant from '../../../components/Assistant/Assistant';

const Copilot: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-2 py-2">
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden p-1 sm:p-2 md:p-4" style={{ minHeight: '70vh' }}>
          <Assistant isFullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default Copilot;
