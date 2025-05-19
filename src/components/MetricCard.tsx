import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  suffix?: string;
  trendInverse?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  suffix = '', 
  trendInverse = false 
}) => {
  const isPositive = trendInverse ? trend < 0 : trend > 0;
  const isLoading = value === "Loading...";
  
  return (
    <div className="bg-gray-800 rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <div className="flex items-end mt-2">
            <p className="text-2xl font-semibold text-white mr-1">
              {value}
            </p>
            {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
          </div>
        </div>
        <div className="bg-gray-700 p-2 rounded">
          {icon}
        </div>
      </div>
      
      {!isLoading && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <>
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-sm text-green-400">
                {Math.abs(trend).toFixed(1)}%
              </span>
            </>
          ) : (
            <>
              <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              <span className="text-sm text-red-400">
                {Math.abs(trend).toFixed(1)}%
              </span>
            </>
          )}
          <span className="text-xs text-gray-400 ml-2">from last period</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;