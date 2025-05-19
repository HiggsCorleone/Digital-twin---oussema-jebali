import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Maximize2, ZoomIn, Download } from 'lucide-react';

interface DataPoint {
  timestamp: string;
  secrecyRate: number;
  theoreticalMax: number;
  eavesdroppingImpact: number;
  snr: number;
}

interface SecrecyRateChartProps {
  data: DataPoint[];
}

const SecrecyRateChart: React.FC<SecrecyRateChartProps> = ({ data }) => {
  // Find min/max for y-axis
  const maxRate = Math.max(
    ...data.map(d => Math.max(d.secrecyRate, d.theoreticalMax))
  );
  
  const minRate = Math.min(
    ...data.map(d => Math.min(d.secrecyRate, d.eavesdroppingImpact))
  );
  
  const securityThreshold = maxRate * 0.6; // Example threshold
  
  return (
    <div className="w-full h-full">
      <div className="flex justify-end mb-2">
        <div className="flex space-x-2">
          <button className="p-1 text-gray-400 hover:text-white">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white">
            <Maximize2 className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#CBD5E0" 
            tick={{ fill: '#CBD5E0' }}
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis 
            stroke="#CBD5E0" 
            tick={{ fill: '#CBD5E0' }}
            domain={[Math.floor(minRate * 0.8), Math.ceil(maxRate * 1.2)]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '4px' }}
            labelStyle={{ color: '#CBD5E0' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <ReferenceLine 
            y={securityThreshold} 
            label={{ value: 'Security Threshold', position: 'insideBottomRight', fill: '#F56565' }} 
            stroke="#F56565" 
            strokeDasharray="3 3" 
          />
          <Line 
            type="monotone" 
            dataKey="secrecyRate" 
            name="Secrecy Rate" 
            stroke="#3182CE" 
            strokeWidth={2} 
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="theoreticalMax" 
            name="Theoretical Max" 
            stroke="#68D391" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="eavesdroppingImpact" 
            name="Eavesdrop Impact" 
            stroke="#F56565" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <div>
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
          Current Rate: {data.length > 0 ? data[data.length - 1].secrecyRate.toFixed(2) : 'N/A'}
        </div>
        <div>
          <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-2"></span>
          Max Rate: {maxRate.toFixed(2)}
        </div>
        <div>
          <span className="inline-block h-3 w-3 rounded-full bg-red-500 mr-2"></span>
          Min Rate: {minRate.toFixed(2)}
        </div>
        <div>
          <span className="inline-block h-3 w-3 rounded border border-red-500 mr-2"></span>
          Threshold: {securityThreshold.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default SecrecyRateChart;