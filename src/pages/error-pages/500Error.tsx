import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/error-pages/style.css';

const Error500: React.FC = () => {
  return (
    <div className="error-page min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8">
      <div className="error-content text-center max-w-lg mx-auto">
        {/* Error Code Animation */}
        <div className="error-animation mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-blue-600 animate-bounce">500</h1>
        </div>

        {/* Error Message */}
        <div className="error-message space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">Oops! Server Error</h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-md mx-auto">We're experiencing some technical difficulties. Our team is working to get things back to normal.</p>

          {/* Action Buttons */}
          <div className="action-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Try Again
            </button>

            <Link
              to="/home"
              className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center"
            >
              Go to Home
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-sm sm:text-base text-gray-500">
            <p>
              Need assistance?{' '}
              <a href="/contact" className="text-blue-600 hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error500;
