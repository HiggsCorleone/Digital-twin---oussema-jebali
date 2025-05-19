import React from 'react';
import { useQuery } from 'react-query';
import { 
  BarChart2, Cpu, Database, HardDrive, 
  Server, ShieldAlert, Activity, Wifi 
} from 'lucide-react';
import { fetchSystemStatus, fetchServiceHealth } from '../api/dataService';
import StatusBadge from '../components/StatusBadge';
import ServiceCard from '../components/ServiceCard';
import LogViewer from '../components/LogViewer';

const SystemStatus: React.FC = () => {
  const { data: systemStatus, isLoading: statusLoading } = useQuery(
    'systemStatus', 
    fetchSystemStatus
  );
  
  const { data: serviceHealth, isLoading: healthLoading } = useQuery(
    'serviceHealth', 
    fetchServiceHealth
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">System Status & Health</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Refresh Status
          </button>
          <button className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors">
            Export Logs
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-medium text-white mb-4">System Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400">Docker Status</h3>
              <Server className="h-5 w-5 text-blue-400" />
            </div>
            <div className="mt-2">
              <StatusBadge 
                status={statusLoading ? "loading" : systemStatus?.dockerStatus || "unknown"}
              />
            </div>
            <div className="mt-3 text-sm text-gray-400">
              {statusLoading ? "Loading..." : statusLoading ? "Loading..." : `${systemStatus?.containerCount || 0} containers running`}
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400">FIWARE Status</h3>
              <Database className="h-5 w-5 text-green-400" />
            </div>
            <div className="mt-2">
              <StatusBadge 
                status={statusLoading ? "loading" : systemStatus?.fiwareStatus || "unknown"}
              />
            </div>
            <div className="mt-3 text-sm text-gray-400">
              {statusLoading ? "Loading..." : `Orion CB: ${systemStatus?.orionStatus || "Unknown"}`}
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400">NiFi Status</h3>
              <Activity className="h-5 w-5 text-purple-400" />
            </div>
            <div className="mt-2">
              <StatusBadge 
                status={statusLoading ? "loading" : systemStatus?.nifiStatus || "unknown"}
              />
            </div>
            <div className="mt-3 text-sm text-gray-400">
              {statusLoading ? "Loading..." : `Active flows: ${systemStatus?.activeFlows || 0}`}
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-400">Security Status</h3>
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <div className="mt-2">
              <StatusBadge 
                status={statusLoading ? "loading" : systemStatus?.securityStatus?.toLowerCase() || "unknown"}
              />
            </div>
            <div className="mt-3 text-sm text-gray-400">
              {statusLoading ? "Loading..." : `Threats detected: ${systemStatus?.threatsDetected || 0}`}
            </div>
          </div>
        </div>
        
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300">CPU Usage</h3>
              <Cpu className="h-5 w-5 text-blue-400" />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    {statusLoading ? "Loading..." : `${systemStatus?.cpuUsage || 0}%`}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-600">
                <div 
                  style={{ width: `${statusLoading ? 0 : systemStatus?.cpuUsage || 0}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300">Memory Usage</h3>
              <HardDrive className="h-5 w-5 text-green-400" />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    {statusLoading ? "Loading..." : `${systemStatus?.memoryUsage || 0}%`}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-600">
                <div 
                  style={{ width: `${statusLoading ? 0 : systemStatus?.memoryUsage || 0}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300">Network Traffic</h3>
              <Wifi className="h-5 w-5 text-purple-400" />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                    {statusLoading ? "Loading..." : `${systemStatus?.networkTraffic || 0} Mbps`}
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-600">
                <div 
                  style={{ width: `${statusLoading ? 0 : (systemStatus?.networkTraffic || 0) / 100 * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-medium text-white mb-4">Service Health</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthLoading ? (
            <div className="col-span-3 flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            (serviceHealth || []).map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))
          )}
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-medium text-white mb-4">System Logs</h2>
        <LogViewer />
      </div>
    </div>
  );
};

export default SystemStatus;