import React from 'react';
import { Cpu, HardDrive, Clock, Server } from 'lucide-react';

interface SystemOverviewProps {
  data: {
    processorCount: number;
    totalMemory: string;
    diskSpace: string;
    osType: string;
    uptime: string;
    networkInterfaces: number;
    systemLoad: number;
  };
}

const SystemOverview: React.FC<SystemOverviewProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Cpu className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-gray-300">CPU</span>
          </div>
          <div className="text-white">{data.processorCount} Cores</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HardDrive className="h-5 w-5 text-green-400 mr-3" />
            <span className="text-gray-300">Memory</span>
          </div>
          <div className="text-white">{data.totalMemory}</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <HardDrive className="h-5 w-5 text-purple-400 mr-3" />
            <span className="text-gray-300">Disk</span>
          </div>
          <div className="text-white">{data.diskSpace}</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Server className="h-5 w-5 text-yellow-400 mr-3" />
            <span className="text-gray-300">OS</span>
          </div>
          <div className="text-white">{data.osType}</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-red-400 mr-3" />
            <span className="text-gray-300">Uptime</span>
          </div>
          <div className="text-white">{data.uptime}</div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Server className="h-5 w-5 text-blue-400 mr-3" />
            <span className="text-gray-300">System Load</span>
          </div>
          <div className="text-white">{data.systemLoad.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-4">System Load History</h3>
        <div className="h-24 flex items-end space-x-1">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = Math.random() * 100;
            return (
              <div 
                key={i} 
                className="bg-blue-500 rounded-t w-full" 
                style={{ height: `${height}%` }}
              ></div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>24h ago</span>
          <span>12h ago</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;