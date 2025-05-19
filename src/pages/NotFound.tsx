import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <div className="mb-8 text-6xl font-bold text-gray-700">404</div>
        <h1 className="mb-4 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mb-8 text-gray-400">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Link>
          <Link
            to="/secrecy-rates"
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Secrecy Rates
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;