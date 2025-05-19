import React from 'react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'success' | 'warning' | 'danger' | 'info' | 'loading';
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'danger':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'info':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'loading':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-700 text-gray-300 border-gray-600';
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      case 'loading':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm opacity-70">{title}</p>
          <div className="flex items-center mt-2">
            <div className={`h-2 w-2 rounded-full ${getStatusIndicator()} mr-2`}></div>
            
            {status === 'loading' ? (
              <div className="flex items-center">
                <div className="animate-pulse mr-2">Loading...</div>
                <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-blue-500 rounded-full"></div>
              </div>
            ) : (
              <p className="text-2xl font-semibold">{value}</p>
            )}
          </div>
        </div>
        <div className="p-3 rounded-full bg-gray-800/30">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;