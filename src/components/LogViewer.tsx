import React, { useState } from 'react';
import { Search, Download, RefreshCw, Filter } from 'lucide-react';

// Mock log data
const mockLogs = [
  { timestamp: '2025-03-14T10:30:45.123Z', level: 'INFO', service: 'ORION', message: 'Context broker initialized successfully' },
  { timestamp: '2025-03-14T10:31:12.456Z', level: 'INFO', service: 'MONGO', message: 'Database connection established' },
  { timestamp: '2025-03-14T10:32:05.789Z', level: 'INFO', service: 'IOT_AGENT', message: 'IoT Agent started with configuration from environment' },
  { timestamp: '2025-03-14T10:35:22.321Z', level: 'WARN', service: 'NIFI', message: 'Flow processing delayed due to high system load' },
  { timestamp: '2025-03-14T10:36:11.654Z', level: 'INFO', service: 'FRONTEND', message: 'Frontend service started on port 3000' },
  { timestamp: '2025-03-14T10:40:33.987Z', level: 'ERROR', service: 'MISO_SIM', message: 'Failed to establish secure channel with device id: MIS0123' },
  { timestamp: '2025-03-14T10:41:45.321Z', level: 'WARN', service: 'SECURITY', message: 'Potential eavesdropping detected on channel 2' },
  { timestamp: '2025-03-14T10:42:18.654Z', level: 'INFO', service: 'SECURITY', message: 'Adapting secrecy rate parameters for channel 2' },
  { timestamp: '2025-03-14T10:45:27.987Z', level: 'INFO', service: 'ORION', message: 'Entity MisoDevice_12 created successfully' },
  { timestamp: '2025-03-14T10:47:36.321Z', level: 'INFO', service: 'NIFI', message: 'Flow execution completed successfully' },
  { timestamp: '2025-03-14T10:50:45.654Z', level: 'ERROR', service: 'IOT_AGENT', message: 'Device authentication failed: Invalid credentials' },
  { timestamp: '2025-03-14T10:51:54.987Z', level: 'INFO', service: 'MONGO', message: 'Completed scheduled database backup' },
  { timestamp: '2025-03-14T10:55:03.321Z', level: 'WARN', service: 'SECURITY', message: 'Low secrecy rate detected for channel 5, adjusting parameters' },
  { timestamp: '2025-03-14T10:56:12.654Z', level: 'INFO', service: 'MISO_SIM', message: 'Channel simulation updated with new parameters' },
  { timestamp: '2025-03-14T10:58:21.987Z', level: 'INFO', service: 'FRONTEND', message: 'User admin logged in from 192.168.1.100' },
];

const LogViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logLevel, setLogLevel] = useState('ALL');
  const [service, setService] = useState('ALL');
  
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = logLevel === 'ALL' || log.level === logLevel;
    const matchesService = service === 'ALL' || log.service === service;
    
    return matchesSearch && matchesLevel && matchesService;
  });
  
  const logLevels = ['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'];
  const services = ['ALL', ...Array.from(new Set(mockLogs.map(log => log.service)))];
  
  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'text-blue-400';
      case 'WARN':
        return 'text-yellow-400';
      case 'ERROR':
        return 'text-red-400';
      case 'DEBUG':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {logLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {services.map(svc => (
              <option key={svc} value={svc}>{svc}</option>
            ))}
          </select>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 p-2 rounded-md">
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 p-2 rounded-md">
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredLogs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span className={`${getLogLevelColor(log.level)} font-medium`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                    {log.service}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-300">
                    {log.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="py-8 text-center text-gray-400">
            No logs matching the current filters
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;