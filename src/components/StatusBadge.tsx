import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'healthy':
      case 'running':
      case 'online':
      case 'secure':
        return {
          color: 'bg-green-500',
          text: 'text-green-100',
          label: status.charAt(0).toUpperCase() + status.slice(1)
        };
      case 'degraded':
      case 'warning':
      case 'unstable':
        return {
          color: 'bg-yellow-500',
          text: 'text-yellow-100',
          label: 'Degraded'
        };
      case 'down':
      case 'offline':
      case 'error':
      case 'insecure':
        return {
          color: 'bg-red-500',
          text: 'text-red-100',
          label: 'Down'
        };
      case 'loading':
        return {
          color: 'bg-blue-500',
          text: 'text-blue-100',
          label: 'Loading...'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'text-gray-100',
          label: 'Unknown'
        };
    }
  };

  const { color, text, label } = getStatusConfig();

  return (
    <div className={`${color} ${text} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}>
      {status === 'loading' ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          <div className={`h-2 w-2 rounded-full bg-white mr-1`}></div>
          {label}
        </>
      )}
    </div>
  );
};

export default StatusBadge;