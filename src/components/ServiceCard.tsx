import React from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface ServiceProps {
  service: {
    name: string;
    status: string;
    uptime: string;
    version: string;
    endpoint: string;
    responseTime: number;
    lastRestartTime: string;
  };
}

const ServiceCard: React.FC<ServiceProps> = ({ service }) => {
  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getResponseTimeColor = () => {
    if (service.responseTime < 100) return 'text-green-400';
    if (service.responseTime < 200) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-white">{service.name}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
            {service.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Version:</span>
            <span className="text-gray-200">{service.version}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Uptime:</span>
            <span className="text-gray-200">{service.uptime}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Response Time:</span>
            <span className={getResponseTimeColor()}>{service.responseTime} ms</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Last Restart:</span>
            <span className="text-gray-200">{new Date(service.lastRestartTime).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href={service.endpoint} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 text-center px-3 py-2 text-xs rounded bg-gray-600 text-white hover:bg-gray-500 transition-colors flex items-center justify-center"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Open Endpoint
          </a>
          <button className="flex-1 px-3 py-2 text-xs rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center justify-center">
            <RefreshCw className="h-3 w-3 mr-1" />
            Restart Service
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800 px-4 py-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Endpoint:</span>
          <span className="text-gray-300 truncate max-w-48">{service.endpoint}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;